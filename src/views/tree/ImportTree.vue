<template>
  <div class="hero flex-1">
    <div class="text-center hero-content">
      <div class="max-w-md flex flex-col">
        <LoadFromFile @load="handleLoad">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
          </svg>
          Load from FileSystem
        </LoadFromFile>
        <LoadFromURL @load="handleLoad" class="mt-4">
          <span class="hidden md:block ml-2">Load from URL</span>
        </LoadFromURL>
      </div>
    </div>
  </div>
</template>
<script>
import { nextTick } from "vue";
import { useRouter } from "vue-router";
import { useLedger } from "@/platform/composables/useLedger";
import useEncryption from "@/platform/composables/useEncryption";
import LoadFromFile from '@/platform/components/LoadFromFile.vue';
import LoadFromURL from '@/platform/components/LoadFromURL.vue';

export default {
  components: {
    LoadFromFile,
    LoadFromURL,
  },
  setup() {
    const {
      ledger,
      methods: { loadLedger },
    } = useLedger();
    const router = useRouter();
    const { decryptData } = useEncryption();

    async function handleLoad(raw) {
      try {
        const l = JSON.parse(raw);
        console.log('l', l);
        await loadLedger(l);
      } catch (err) {
        const password = prompt('Probably password protected, what is it?');
        const l = JSON.parse(await decryptData(raw, password));
        await loadLedger(l);
      } finally {
        await nextTick();
        const ledgerId = ledger.value.id.slice(0,6)
        router.push(`/l/${ledgerId}`);
      }
    }

    return {
      handleLoad,
    };
  },
};
</script>
