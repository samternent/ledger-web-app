<template>
  <div v-if="ledger" class="flex h-full flex-1  bg-base-200">
    <div class="w-1/2 shadow flex flex-col pt-1 bg-base-200">
      <div class="tabs">
        <span
          @click="activeView = 'log'"
          class="tab tab-lifted"
          :class="{ 'tab-active': activeView === 'log'}">
          Log
        </span> 
        <span
          @click="activeView = 'history'"
          class="tab tab-lifted"
          :class="{ 'tab-active': activeView === 'history'}">
          History
        </span> 
      </div>
      <ul class="flex-1 overflow-y-auto bg-base-100 font-mono p-2" ref="output" v-if="activeView === 'log'">
        <li
          v-for="record in ledger.pending_records"
          :key="record.id"
          class="flex flex-col my-2"
        >
          <span class="truncate opacity-50 text-xs">ID: {{ record.id }}</span>
          <div class="text-sm">
            <span class="text-primary font-bold mr-1">$</span
            ><span>{{ record.collection }}</span
            >: {{ record.data.name || record.data.content || record.data.data?.name }}
          </div>
        </li>
      </ul>
      <div class="flex-1 overflow-y-auto bg-base-100 font-mono p-2" ref="output" v-if="activeView === 'history'">
        <FullLog />
      </div>
    </div>
    <div class="divider divider-horizontal" />
    <div class="w-1/2 bg-base-200 flex flex-col pt-1">
     <div class="tabs">
        <span
          @click="activeViewRight = 'commit'"
          class="tab tab-lifted"
          :class="{ 'tab-active': activeViewRight === 'commit'}">
          Commit
        </span> 
        <span
          @click="activeViewRight = 'encrypt'"
          class="tab tab-lifted"
          :class="{ 'tab-active': activeViewRight === 'encrypt'}">
          Encrypt
        </span> 
      </div>
      <div class="flex-1 flex flex-col overflow-y-auto bg-base-100 p-2" v-if="activeViewRight === 'commit'">
        <textarea
          v-model="commitMessage"
          class="textarea resize-none textarea-bordered bg-base-100 rounded flex-1"
          placeholder="Commit message..."
        />
        <div class="flex justify-end mt-4">
          <button
            class="btn btn-sm mx-1"
            @click="squashRecords"
            :disabled="!ledger.pending_records.length"
          >
            Squash
          </button>
          <button
            class="btn btn-outline btn-sm mx-1"
            @click="squashCommit"
            :disabled="!ledger.pending_records.length"
          >
            Squash & Commit
          </button>
        </div>
      </div>
      
      <div class="flex-1 flex flex w-full overflow-y-auto bg-base-100 font-mono p-2" v-if="activeViewRight === 'encrypt'">
        <div class="flex flex-1 justify-between px-2 items-center">
          <textarea
            class="textarea textarea-bordered textarea-xs my-2 bg-base-100 rounded flex-1"
            :class="{ 'textarea-error': openPGPKeyError }"
            placeholder="Encrypt for OpenPGP Key"
            v-model="openPGPPublicKey"
          />
        </div>
        <div class="divider divider-horizontal">OR</div>
        <div class="flex flex-col justify-between px-2 items-center">
          <input
            type="password"
            class="input input-bordered input-sm my-2 bg-base-100 rounded flex-1"
            placeholder="Password Protect"
            v-model="password"
          />
          <input
            type="password"
            class="input input-bordered input-sm my-2 bg-base-100 rounded flex-1"
            placeholder="Confirm Password"
            v-model="confirmPassword"
          />
        </div>
      </div>
    
      <div class="flex w-full justify-end px-4 py-2">
        <div v-if="encrypting">
          <span class="text-xs mr-4">Password Encrypted</span>
          <button class="btn btn-disabled btn-sm" disabled>
            Encrypting...
          </button>
        </div>
        <div v-else-if="encryptedData">
          <span class="text-xs mr-4">Password Encrypted</span>
          <DownloadButton :file-name="`${ledger.id}.ledger.pwd`" :data="encryptedData">
            <span class="mr-1">Save Encrypted</span>
          </DownloadButton>
        </div>
        <div v-else-if="openPGPEncryptedData">
          OpenPGP Encrypted
          <DownloadButton :file-name="`${ledger.id}.ledger.pgp`" :data="openPGPEncryptedData">
            <span class="mr-1">Save Encrypted</span>
          </DownloadButton>
        </div>
        <div v-else>
          <span class="text-xs mr-4">Unencrypted</span>
          <DownloadButton :file-name="`${ledger.id}.ledger.json`" :data="JSON.stringify(ledger)">
            <span class="mr-1">Save</span>
          </DownloadButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch, onUpdated, computed } from "vue";
import { watchThrottled } from '@vueuse/core'
import { useLedger } from "@/platform/composables/useLedger";
import useEncryption from "@/platform/composables/useEncryption";
import FullLog from "@/platform/modules/log/FullLog.vue";
import DownloadButton from "@/platform/components/DownloadButton.vue";

export default {
  components: {
    FullLog,
    DownloadButton,
  },
  setup() {
    const activeView = ref(localStorage.getItem('consoleActiveView') || 'log');
    const activeViewRight = ref(localStorage.getItem('consoleActiveViewRight') || 'commit');
    const { ledger, api } = useLedger();
    const { encryptDataWithPGP, encryptDataWithPassword } = useEncryption();

    const output = ref(null);
    const commitMessage = ref(null);
    const password = ref('');
    const confirmPassword = ref('');
    const openPGPPublicKey = ref('');
    const openPGPKeyError = ref(false);

    async function squashCommit() {
      await api.value.squashRecords();
      await api.value.commit(commitMessage.value);
      commitMessage.value = null;
    }

    onUpdated(() => {
      output.value.scrollTop = output.value.scrollHeight;
    });


    watch(activeView, () => {
      localStorage.setItem('consoleActiveView', activeView.value)
    })
    watch(activeViewRight, () => {
      localStorage.setItem('consoleActiveViewRight', activeViewRight.value)
    })

    const encryptedData = ref(null);
    const openPGPEncryptedData = ref(null);
    const encrypting = ref(false);
    
    watchThrottled(
      [
        password,
        confirmPassword,
        ledger,
      ],
      async ([
        _password,
        _confirmPassword,
        _ledger,
      ]) => {
        if (_password && _confirmPassword && _password === _confirmPassword) {
          try {
            encrypting.value = true;
            encryptedData.value = `-----BEGIN PASSWORD ENCRYPTED MESSAGE-----
            ${await encryptDataWithPassword(JSON.stringify(_ledger), _password)}\n\n-----END PASSWORD ENCRYPTED MESSAGE-----`;
            encrypting.value = false;
          } catch (err) {
            encryptedData.value = null;
            encrypting.value = false;
          }
        } else {
          encryptedData.value = null;
          encrypting.value = false;
        }
      },
      { throttle: 500 }
    );
    
    watchThrottled([openPGPPublicKey, ledger], async ([_openPGPPublicKey, _ledger]) => {
        openPGPKeyError.value = false;
        if (_openPGPPublicKey && _ledger) {
          try {
            encrypting.value = true;
            openPGPEncryptedData.value = await encryptDataWithPGP(JSON.stringify(_ledger), _openPGPPublicKey);
            encrypting.value = false;
          } catch(e) {
            openPGPEncryptedData.value = null;
            openPGPKeyError.value = true;
            encrypting.value = false;
          }
        } else {
          openPGPEncryptedData.value = null;
          encrypting.value = false;
        }
      },
      { throttle: 500 }
    );

    return {
      ledger,
      squashCommit,
      squashRecords() {
        api.value.squashRecords();
      },
      output,
      activeView,
      activeViewRight,
      commitMessage,
      password,
      encryptedData,
      openPGPEncryptedData,
      confirmPassword,
      openPGPPublicKey,
      openPGPKeyError,
      encrypting,
    };
  },
};
</script>
