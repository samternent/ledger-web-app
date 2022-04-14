<template>
  <div class="flex flex-1">  
    <div v-if="!hasSolidSession" class="" >
      <select v-model="oidcIssuer" class="w-full select select-bordered">
        <option v-for="provider in providers" :key="provider" :value="provider">{{ provider }}</option>
      </select>
      <button @click="login" class="btn btn-success my-2">
        Connect to Solid Pod
      </button>
    </div>
    <div v-else class="py-2 flex flex-col flex-1">
      <div v-if="isPasswordEncrypted" class="mx-auto my-2">
        <p>This Ledger is password ecrypted.</p>
        <input class="input input-bordered" type="password" v-model="password" placeholder="Ledger password" />
        <button class="btn btn-primary" @click="passwordDecrypt">Open</button>
      </div>
      <div v-if="!ledgerList.length" class="flex flex-1 text-sec-text">
        No Saved Ledgers
      </div>
      <div v-else class="flex-1 w-full flex flex-col">
        <div v-for="id of ledgerList" :key="id" class="flex-1 flex font-medium cursor-pointer my-1 rounded hover:text-a group">
          <div class="flex text-sm justify-between flex-1">
            <div class="flex justify-between">
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 text-yellow-500 group-hover:text-b h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span class="truncate" @click="fetchLedger(id)">{{ id }}</span>
            </div>
            <label for="my-modal" class="btn modal-button btn-xs btn-error btn-circle btn-outline" @click="deleteId = id">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </label>
          </div>
        </div>
      </div>

      <!-- Put this part before </body> tag -->
      <input type="checkbox" id="my-modal" class="modal-toggle">
      <div class="modal">
        <div class="modal-box">
          <label for="my-modal" class="btn btn-sm btn-circle btn-ghost btn-outline absolute right-2 top-2">✕</label>
          <h3 class="font-bold text-lg">Warning!</h3>
          <p class="py-4">Are you sure you want to delete: <strong class="block py-4">{{ deleteId }}?</strong> This is a destructive action that cannot be undone.</p>
          <div class="modal-action">
            <label for="my-modal" class="btn btn-error" @click="deleteLedger(id)">Delete</label>
          </div>
        </div>
      </div>
      <!-- <button @click="logout" class="btn btn-ghost btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button> -->
    </div>
  </div>
</template>
<script>
import { ref, watch, shallowRef } from 'vue';
import { useRouter } from "vue-router";
import { useSolid } from '@/platform/composables/useSolid';
import { useLedger } from '@/platform/composables/useLedger';
import useEncryption from '@/platform/composables/useEncryption';

export default {
  setup(props, { emit }) {
    const { profile, logout, providers, getDataSet, login, hasSolidSession, deleteLedger: deleteSolidLedger, fetch, workspace, oidcIssuer } = useSolid();
    const ledgerList = ref([]);

    const {
      methods: { loadLedger },
    } = useLedger();
    const router = useRouter();
    const { decryptDataWithPassword, decryptDataWithPGP } = useEncryption();

    const rawLedger = shallowRef(null);
    const isPasswordEncrypted = shallowRef(false);
    const isPGPEncrypted = shallowRef(false);
    const password = shallowRef(null);
    const deleteId = shallowRef(null);

    async function passwordDecrypt() {
      try {
        const rawDecrypted = await decryptDataWithPassword(rawLedger.value, password.value);
        const l = JSON.parse(rawDecrypted);
        window.localStorage.setItem('ledger', rawDecrypted);
        router.push(`/`);
      } catch(e) {
        console.error(e);
      }
    }
    async function openPGPDecrypt() {
      const rawDecrypted = await decryptDataWithPGP(rawLedger.value);
      const l = JSON.parse(rawDecrypted);
      window.localStorage.setItem('ledger', rawDecrypted);
      router.push(`/`);
    }

    async function handleLoad(raw) {
      rawLedger.value = raw;
      try {
        const l = JSON.parse(raw);
        await loadLedger(l);
        window.localStorage.setItem('ledger', raw);
        router.push(`/l/${l.id.slice(0,6)}`);
      } catch (err) {
        if (raw.includes('-----BEGIN PASSWORD ENCRYPTED MESSAGE-----')) {
          isPasswordEncrypted.value = true;
        } else if (raw.includes('-----BEGIN PGP MESSAGE-----')) {
          openPGPDecrypt();
        }
      }
    }

    async function fetchLedgers() {
      const list = await getDataSet("ledger");
      ledgerList.value = Object.keys(list.graphs.default)
        .filter((key) => /[^\\]*\.(\w+)$/.test(key))
        .map((str) =>
          str.split("\\").pop().split("/").pop()
        );
    }
    async function fetchLedger(_id, b) {
      const ledger = await fetch("ledger", _id);
      handleLoad(ledger);
    }

    async function deleteLedger() {
      if (!deleteId.value) return;
      await deleteSolidLedger(deleteId.value, "ledger");
      fetchLedgers();
    }


    watch([hasSolidSession, workspace], ([_hasSolidSession, _workspace]) => {
      if (_hasSolidSession && _workspace) {
        fetchLedgers();
      }
    }, { immediate: true });
    
    return {
      login,
      hasSolidSession,
      fetchLedger,
      deleteLedger,
      ledgerList,
      oidcIssuer,
      providers,
      logout,
      profile,
      passwordDecrypt,
      isPasswordEncrypted,
      password,
      deleteId
    };
  },
}
</script>