<template>
  <div v-if="Object.keys(chain).length || pending.length">
    <div v-if="pending.length" class="my-2">
      <h2 class="font-medium font-lg py-2">Pending</h2>
      <template v-for="record in pending" :key="record.id">
        <div v-if="record.data.id === $route.params.branch">
          <div class="text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg> 
            <div class="text-sm">{{ formatDate(record.timestamp) }}</div>
          </div>
        </div>
      </template>
    </div>
    <h2 class="font-medium font-lg py-2">Page History</h2>
    <div v-if="Object.keys(chain).length">
      <div class="" v-for="hash in Object.keys(chain)" :key="hash">
        <template v-for="record in chain[hash].records" :key="record.id">
          <div v-if="record.data.id === $route.params.branch">
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
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
import { formatRelative } from 'date-fns';
import { useLedger } from '@/platform/composables/useLedger';
import { useTree } from '@/platform/composables/useTree';
import BlockVerify from '@/components/BlockVerify.vue';

export default {
  components: {
    BlockVerify,
  },
  setup() {
    const { ledger } = useLedger();
    const { activeBranch } = useTree();

    const chain = computed(() => {
      return ledger.value.chain.slice(1).reduce((acc, curr) => ({
        ...acc,
        [curr.hash]: curr,
      }), {});
    });

    const pending = computed(() => ledger.value.pending_records.filter(
      (record) => record.data.id === activeBranch.value.id || record.data.parent === activeBranch.value.id)
    );
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