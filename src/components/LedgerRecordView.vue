<template>
  <div v-if="Object.keys(chain).length || pending.length">
    <h2 class="my-2 font-medium font-lg p-2">Pending Records</h2>
    <Table class="border-sec-background text-sm mb-6" v-if="pending.length" :list="pending" :headers="blueprints" />
    <div v-else class="flex items-center justify-center">
      <div class="w-64 my-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 block mx-auto opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      </div>
    </div>
    <h2 class="my-2 font-medium font-lg p-2">Confirmed Records</h2>
    <div v-if="Object.keys(chain).length">
      <div class="" v-for="hash in Object.keys(chain)" :key="hash">
        <div class="text-sm py-2 flex items-center">
          <BlockVerify class="mr-4" :block="chain[hash]" :difficulty="ledger.difficulty" /> <span class="truncate">{{hash}}</span>
        </div>
        <Table :list="chain[hash].records" :headers="blueprints" />
      </div>
    </div>
    <div v-else class="flex items-center justify-center">
        <div class="w-64 my-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 block mx-auto opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </div>
      </div>
  </div>
  <div v-else class="flex items-center justify-center">
    <div class="w-64 my-16 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 block mx-auto opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
      <p class="block my-6 text-sec-text opacity-50 font-medium">Add some data to get started</p>
    </div>
  </div>
</template>
<script>
import { computed, inject } from 'vue';
import Table from '../../components/Table.vue';
import BlockVerify from './BlockVerify.vue';

export default {
  components: {
    Table,
    BlockVerify,
  },
  setup() {
    const { ledger } = inject('ledger');
    const { blueprints } = inject('ledgerInstance');
    const chain = computed(() => {
      return ledger.value.chain.slice(1).reduce((acc, curr) => ({
        ...acc,
        [curr.hash]: curr,
      }), {});
    });

    const pending = computed(() => ledger.value.pending_records)

    return { chain, blueprints, pending, ledger };
  }
};
</script>