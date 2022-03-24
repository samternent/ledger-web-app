<template>
  <div v-if="ledger" class="flex h-full flex-1 items-center">
    <div v-if="ledger.pending_records.length" class="badge badge-primary">
      {{ ledger.pending_records.length }}
    </div>
  </div>
</template>
<script>
import { useLedger } from '@/platform/composables/useLedger';

export default {
  setup() {
    const { ledger } = useLedger();

    return {
      ledger,
    }     
  },
}
</script>
