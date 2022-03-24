<template>
  LOADING..
</template>
<script>
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useLedger } from '@/platform/composables/useLedger';

export default {
  setup() {
    const router = useRouter();
    const { ledger, loaded, methods: { loadLedger } } = useLedger();

    const rawLedger = JSON.parse(localStorage.getItem("ledger"));
    if (rawLedger) {
      loadLedger(rawLedger);
    }

    watchEffect(() => {
      if (!rawLedger) {
        router.replace('/l/create');
      } else if (loaded.value && ledger.value) {
        router.replace(`/l/${ledger.value.id.slice(0, 6)}`);
      }
    })
  },
}
</script>