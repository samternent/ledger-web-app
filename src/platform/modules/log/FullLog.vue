<template>
  <div v-if="Object.keys(chain).length">
    <div v-for="hash in Object.keys(chain)" :key="hash">
      <hr class="opacity-20 my-2" />
      <div class="text-xs opacity-50">{{ hash }}</div>
      <span class="text-sm text-primary">Message</span>
      <div v-if="chain[hash].message" class="text-sm">{{ chain[hash].message }}</div>
      <div class="text-sm mt-4 text-primary">Records</div>
      <template v-for="record in chain[hash].records" :key="record.id" class="flex" > 
        <div class="text-sm flex items-center">
          <BlockVerify class="mr-2" :block="chain[hash]" :difficulty="ledger.difficulty" />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="truncate">{{ formatDate(record.timestamp) }}</div>
        </div>
        <div>
          <span class="capitalize text-xs opacity-70">{{ formatActionType(record) }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
import { formatRelative } from 'date-fns';
import { useLedger } from '@/platform/composables/useLedger';
import BlockVerify from '@/components/BlockVerify.vue';

export default {
  components: {
    BlockVerify,
  },
  setup() {
    const { ledger } = useLedger();

    const chain = computed(() => {
      return ledger.value.chain.slice(1).reduce((acc, curr) => ({
        ...acc,
        [curr.hash]: curr,
      }), {});
    });

    const pending = computed(() => ledger.value.pending_records);
    
    function formatDate(date) {
      return formatRelative(new Date(date), new Date());
    }

    function formatActionType(record) {
      if (record.collection === 'content') {
        return `Content ${record.data.action}d`;
      }
      if (record.collection === 'branches') {
        return `Page ${record.data.action}d`;
      }
    }

    return { chain, pending, ledger, formatDate, formatActionType };
  }
};
</script>