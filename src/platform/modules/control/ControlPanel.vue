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
        <div class="indicator">
          <span
            @click="activeViewRight = 'solid'"
            class="tab tab-lifted"
            :class="{ 'tab-active': activeViewRight === 'solid'}">
              <span class="indicator-item badge-xs badge badge-accent text-xs">new</span> 
              <div class="place-items-center">Solid</div>
          </span> 
        </div>
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

      <div class="flex-1 flex flex w-full overflow-y-auto bg-base-100 font-mono p-2" v-if="activeViewRight === 'solid'">
        <Solid />
      </div>
      
    
      <div class="flex w-full justify-end px-4 py-2">
        <div v-if="encrypting">
          <button class="btn btn-disabled btn-sm" disabled>
            Encrypting...
          </button>
        </div>
        <div v-else-if="encryptedData" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
          <span class="text-xs mr-4">Password Encrypted</span>
          <DownloadButton :file-name="`${ledger.id}.ledger.pwd`" :data="encryptedData">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span class="ml-2">Download</span>
          </DownloadButton>
          <button v-if="!isSolidConnected" class="btn btn-success btn-sm ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span class="ml-2">Save</span>
          </button>
        </div>
        <div v-else-if="openPGPEncryptedData" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span class="text-xs mr-4">OpenPGP Encrypted</span>
          <DownloadButton :file-name="`${ledger.id}.ledger.pgp`" :data="openPGPEncryptedData">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span class="ml-2">Download</span>
          </DownloadButton>
          <button v-if="!isSolidConnected" class="ml-1 btn btn-success btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span class="ml-2">Save</span>
          </button>
        </div>
        <div v-else class="flex items-center">
          <span class="text-xs mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            Unencrypted
          </span>
          <DownloadButton :file-name="`${ledger.id}.ledger.json`" :data="JSON.stringify(ledger)">
            <span >Download</span>
          </DownloadButton>
          <button v-if="!isSolidConnected" class="ml-1 btn btn-success btn-sm">
            <span>Save</span>
          </button>
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
import Solid from './controls/Solid.vue';

export default {
  components: {
    FullLog,
    DownloadButton,
    Solid,
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
            encryptedData.value = await encryptDataWithPassword(JSON.stringify(_ledger), _password);
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
