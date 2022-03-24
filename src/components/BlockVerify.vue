<template>
  <div class="">
    <svg v-if="isVerified" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>  
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
    </svg>
  </div>
</template>

<script>
import { ref, onMounted, toRaw } from 'vue';
import { isValidProof } from '@/lib/ledger/core';

export default {
  props: {
    block: {
      type: Object,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const isVerified = ref(false);

    onMounted(async () => {
      const blockVerify = {
        records: toRaw(props.block.records),
        timestamp: toRaw(props.block.timestamp),
        last_hash: toRaw(props.block.last_hash),
        message: toRaw(props.block.message),
        nonce: toRaw(props.block.nonce),
      }

      isVerified.value = await isValidProof(blockVerify, toRaw(props.block.hash), props.difficulty);
    });

    return {
      isVerified,
    }
  },
}
</script>