<template>
  <div class="flex-1 bg-base-100 flex flex-col overflow-auto">
    <div
      class="font-light flex justify-between flex-col flex-1 overflow-auto relative"
    >
      <div
        class="flex-1 flex overflow-auto absolute right-0 left-0 top-0 bottom-0"
      >
        <div class="flex flex-1" v-if="headers.length">
          <DataTable :headers="headers" @add-row="addRow" :rows="branchData" />
        </div>
        <div v-else class="flex flex-col mx-auto items-center">
          <h2 class="text-2xl my-8">Add a data type to get started</h2>
          <div class="flex flex-col w-full md:w-72 p-2">
            <input
              class="input input-bordered mb-2"
              type="text"
              v-model="newDataFieldName"
              placeholder="Name"
            />
            <select
              class="select mb-2 select-bordered w-full max-w-xs"
              v-model="newDataFieldType"
            >
              <option v-for="type in staticDataTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <button class="btn" @click="handleAddDataType">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="#RightPanelContent">
    <div class="flex flex-col py-2">
      <input
        class="input input-bordered mb-2"
        type="text"
        v-model="newDataFieldName"
        placeholder="Name"
      />
      <select
        class="select mb-2 select-bordered w-full max-w-xs"
        v-model="newDataFieldType"
      >
        <option
          v-for="type in staticDataTypes"
          :key="`side_${type}`"
          :value="type"
        >
          {{ type }}
        </option>
      </select>
      <button class="btn" @click="handleAddDataType">Add</button>
    </div>
    <BranchLog />
  </Teleport>
</template>
<script>
import { shallowRef, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTree } from "@/platform/composables/useTree";
import DataTable from "@/platform/modules/data/DataTable.vue";
import BranchLog from "../components/BranchLog.vue";

const staticDataTypes = [
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "month",
  "number",
  "password",
  "range",
  "tel",
  "text",
  "time",
  "url",
  "week",
];

export default {
  components: {
    DataTable,
    BranchLog,
  },
  setup() {
    const {
      content,
      activeBranch,
      setActiveBranchById,
      activeParent,
      id,
      addDataType,
      dataTypes,
      addBranchData,
      branchData,
    } = useTree();
    const router = useRouter();
    const route = useRoute();
    const newDataFieldName = shallowRef("");
    const newDataFieldType = shallowRef("text");

    const headers = computed(() => {
      return dataTypes.value;
    });

    async function handleAddDataType() {
      await addDataType({
        name: newDataFieldName.value,
        type: newDataFieldType.value,
      });
      newDataFieldName.value = "";
    }

    async function addRow(data) {
      await addBranchData(data);
    }

    watch(
      () => route.params.branch,
      (_branch) => {
        setActiveBranchById(_branch);
      },
      { immediate: true }
    );

    return {
      activeBranch,
      content,
      activeParent,
      handleAddDataType,
      newDataFieldName,
      newDataFieldType,
      headers,
      id,
      addRow,
      branchData,
      async closeDataEditor() {
        router.push(`/l/${id.value}/${activeBranch.value.id}`);
      },
      staticDataTypes,
    };
  },
};
</script>
