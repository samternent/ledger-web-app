<template>
  <div class="w-full flex-1 overflow-auto h-full flex">
    <table class="table table-zebra w-full h-full">
      <!-- head -->
      <thead>
        <tr>
          <!-- LOOP DATA in TH -->
          <th class="sticky top-0 z-20">
            <div class="flex items-center block">
              ID
            </div>
          </th>
          <th class="sticky top-0" v-for="header in headers" :key="header.name">
            <div class="flex items-center block">
              {{ header.name }}
              <!-- <button class="btn btn-circle btn-sm btn-ghost btn-secondary ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button> -->
            </div>
          </th>


          <th class="sticky top-0 text-right">
            <button class="btn btn-sm btn-ghost" @click="isRightPanelExpanded = true">
            +</button>
          </th>
        </tr>
      </thead>
      <tbody class="">
        <!-- row 1 -->
        <tr class="hover h-16 group" v-for="row in rows" :key="row.id">
          <!-- LOOP DATA in TD -->
          <th>
            {{ row.id }}
          </th>
          <td v-for="header in headers" :key="header.name">
            <input v-if="updatedRow.id === row.id" v-model="updatedRow[header.id]" class="input" :type="header.type" :value="row[header.id]">
            <span v-else>{{ row[header.id] }}</span>
          </td>
          <th class="text-right">
            <button v-if="updatedRow.id === row.id" class="btn btn-sm btn-success" @click="updateRow">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <!-- Save -->
            </button>
            <button v-else class="btn btn-ghost btn-sm btn-circle" @click="editRow(row)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-40 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </th>
        </tr>
        <tr></tr>
      </tbody>
      <!-- foot -->
      <tfoot>
        <tr>
          <!-- LOOP DATA in TH -->
          <th class="sticky bottom-0">
            Add
          </th>
          <th class="sticky bottom-0" v-for="header in headers" :key="header.name">
            <input class="input input-sm input-bordered" :type="header.type" :placeholder="header.name" v-model="newDataRow[header.id]" />
          </th>
          <th class="sticky bottom-0">
            <div class="flex justify-end">
              <button class="btn btn-sm btn-success" @click="saveDataRow">Save</button>
            </div>
          </th>
        </tr>
      </tfoot>
      
    </table>
  </div>
</template>
<script>
import { ref } from "vue";
import { useAppShell } from '@/platform/composables/useAppShell';

export default {
  props: {
    headers: {
      type: Array,
      default: () => ([]),
    },
    rows: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props, { emit }) {
    const { isRightPanelExpanded } = useAppShell();
    const newDataRow = ref({});
    const updatedRow = ref({});

    function saveDataRow() {
      emit('addRow', newDataRow.value);
      newDataRow.value = {};
    };

    function updateRow() {
      emit('addRow', updatedRow.value);
      updatedRow.value = {};
    };

    function editRow(rowData) {
      updatedRow.value = rowData;
    };


    return {
      isRightPanelExpanded,
      newDataRow,
      saveDataRow,
      updatedRow,
      updateRow,
      editRow,
    };
  },
};
</script>