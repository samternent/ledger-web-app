<template>
  <input v-model="url" class="flex-1 px-3 py-2 bg-sec-background rounded-l" placeholder="https://teamconcords.com/ledgers/welcome.json" />
  <button @click="load" class="rounded-r bg-g font-medium px-3 py-2 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>
    <span class="hidden md:block ml-2">Load from URL</span>
  </button>
</template>
<script>
import { ref } from 'vue';
export default {
  setup(props, { emit }) {
    const url = ref('');

    async function load() {
      try {
        const resp = await fetch(url.value);
        const ledger = await resp.json();
        emit('load', { pending_records: [], ...ledger });
      } catch (e) {
      }
    }

    return {
      url,
      load,
    };
  },
}
</script>