<template>
  <div v-if="ledger" class="flex h-full flex-1">
    <div class="w-1/2 shadow flex flex-col flex-1 pt-1 bg-base-200">
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
            >: {{ record.data.name || record.data.content }}
          </div>
        </li>
      </ul>
      <div class="flex-1 overflow-y-auto bg-base-100 font-mono p-2" ref="output" v-if="activeView === 'history'">
        <FullLog />
      </div>
    </div>
    <div class="w-1/2 bg-base-200 flex flex-col">
      <div class="flex-1 flex p-2 justify-end flex-col">
        <textarea
          v-model="commitMessage"
          class="textarea resize-none bg-base-100 rounded h-18"
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
      <div class="flex justify-between px-2 items-center">
        <input
          type="password"
          class="input input-border input-sm my-2 mr-4 bg-base-100 rounded flex-1"
          placeholder="Password Protect"
          v-model="password"
        />
        <input
          type="password"
          class="input input-border input-sm my-2 mr-4 bg-base-100 rounded flex-1"
          placeholder="Confirm Password"
          v-model="confirmPassword"
        />
        <div>
          <DownloadButton :file-name="ledger.id" :data="encryptedData">
            <span v-if="password && confirmPassword && password === confirmPassword" class="mr-1">Encrypt &</span>Save
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
    const { ledger, api } = useLedger();
    const { encryptData, decryptData } = useEncryption();

    const output = ref(null);
    const commitMessage = ref(null);
    const password = ref('');
    const confirmPassword = ref('');

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

    const encryptedData = ref(ledger.value);
    
    watchThrottled([password, confirmPassword, ledger], async ([_password, _confirmPassword, _ledger]) => {
        if (_password && _confirmPassword && _password === _confirmPassword) {
          encryptedData.value = await encryptData(JSON.stringify(_ledger), _password);
        } else {
          encryptedData.value = JSON.stringify(_ledger);
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
      commitMessage,
      password,
      encryptedData,
      confirmPassword,
    };
  },
};
</script>
