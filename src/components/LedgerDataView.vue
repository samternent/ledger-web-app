<template>
  <div v-if="!!list.length" class="absolute left-0 right-0 overflow-x-auto md:shadow">
    <table class="leading-normal w-full md:shadow md:rounded-xl">
      <thead class="border rounded bg-primary-text text-primary-background">
        <tr class="z-0 rounded-tl rounded-tr rounded">
          <th
            scope="col"
            class="w-10"
          >
          </th>
          <th
            v-for="header in headers"
            :key="header.key"
            scope="col"
            @click="$emit('sort', header.key)"
            class="justify-between truncate p-2 cursor-default select-none whitespace-nowrap text-left text-xs font-semibold uppercase tracking-wider"
          >
            {{header.title}}
            <span v-if="sortBy === header.key" class="ml-2">
              <svg v-if="sortAsc" xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="text-primary-text bg-primary-background">
        <tr v-for="item in list" :key="item.$loki"
        class="border-b border-sec-background">
        <td class="p-2 py-4 text-sm whitespace-nowrap truncate cursor-pointer" @click="$emit('edit', item.data)">
          <svg xmlns="http://www.w3.org/2000/svg" class="opacity-50 hover:opacity-80 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </td>
        <td
          v-for="header in headers"
          :key="`key${header.key + item.$loki}`"
          class="p-2 py-4 text-sm whitespace-nowrap truncate">
          {{ item.data[header.key] }}
        </td>
      </tr>
      </tbody>
    </table>
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
import { inject, computed } from 'vue';
import DataTable from './DataTable.vue';

export default {
  components: {
    DataTable,
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    sortBy: {
      type: String,
      required: true,
    },
    sortAsc: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const { loading, loaded, blueprints, app } = inject('ledgerInstance');

    const headers = computed(() =>
      [{ key: 'id', title: 'ID' }, ...blueprints.value]
    );
    
    return { loading, loaded, app, headers };
  }
}
</script>