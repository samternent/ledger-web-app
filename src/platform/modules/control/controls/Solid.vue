<template>
  <div class="flex">  
    <div v-if="!hasSolidSession" class="" >
      <select v-model="oidcIssuer" class="w-full select select-bordered">
        <option v-for="provider in providers" :key="provider" :value="provider">{{ provider }}</option>
      </select>
      <button @click="login" class="btn btn-success my-2">
        Connect to Solid Pod
      </button>
    </div>
    <div v-else class="py-2">
      <div v-if="!ledgerList.length" class="flex flex-1 text-sec-text">
        No Saved Ledgers
      </div>
      <div v-else class="flex-1">
        <div v-for="id of ledgerList" :key="id" class="font-medium cursor-pointer my-1 rounded hover:text-a group">
          <div class="flex text-sm items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 text-yellow-500 group-hover:text-b h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="block truncate" @click="fetchLedger(id)">{{ id }}</span>
          </div>
        </div>
      </div>
      <button @click="logout" class="btn btn-ghost btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue';
import useSolid from '@/platform/composables/useSolid';

export default {
  setup(props, { emit }) {
    const { profile, logout, providers, getDataSet, login, hasSolidSession, handleSessionLogin, fetch, workspace, oidcIssuer } = useSolid();
    const ledgerList = ref([]);
    async function fetchLedgers() {
      const list = await getDataSet("ledger");
      ledgerList.value = Object.keys(list.graphs.default)
        .filter((key) => /[^\\]*\.(\w+)$/.test(key))
        .map((str) =>
          str.split("\\").pop().split("/").pop().split(".").shift()
        );
    }
    async function fetchLedger(_id, b) {
      const { chain, difficulty, id } = await fetch("ledger", _id);
      emit('load', { pending_records: [], chain, difficulty, id });
    }
    watch([hasSolidSession, workspace], ([_hasSolidSession, _workspace]) => {
      if (_hasSolidSession && _workspace) {
        fetchLedgers();
      }
    }, { immediate: true });
    handleSessionLogin();
    return {
      login,
      hasSolidSession,
      fetchLedger,
      ledgerList,
      oidcIssuer,
      providers,
      logout,
      profile,
    };
  },
}
</script>