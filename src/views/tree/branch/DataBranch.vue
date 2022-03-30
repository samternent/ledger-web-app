<template>
  <Teleport to="#TopFixedPanel">
    <div class="text-sm breadcrumbs p-2 flex overflow-visible flex-row flex-1">
      <ul class="flex-1">
        <li>
          <router-link :to="`/l/${id}`">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </router-link>
        </li>
        <li v-if="activeParent">
          <router-link :to="`/l/${id}/${activeBranch.parent}`">{{
            activeParent.name
          }}</router-link>
        </li>
        <li>
          <router-link
            :to="`/l/${id}/${activeBranch.id}`"
            class="block truncate"
            >{{ activeBranch.name }}</router-link
          >
        </li>
      </ul>
    </div>
  </Teleport>
  <div class="flex-1 bg-base-100 flex flex-col overflow-auto">
    <div class="font-light flex justify-between flex-col flex-1 overflow-auto">
      <div class="flex justify-between items-center">
        <div class="text-2xl py-2 lg:text-3xl line-clamp-1">
          {{ activeBranch.name }}
        </div>
        <div>
          <button class="btn btn-ghost btn-sm" @click="closeDataEditor">
            Close
          </button>
        </div>
      </div>
      <div class="flex-1 flex overflow-auto">
        <DataTable />
      </div>
    </div>
  </div>
  <Teleport to="#RightPanelContent">
    <div class="flex flex-col">
      <input class="input input-sm" type="text" v-model="newDataFieldName" placeholder="Name" />
      <select class="select w-full max-w-xs" v-model="newDataFieldType">
          <option>text</option>
      </select>
      <button lass="btn" @click="addDataType">
        Add
      </button>
    </div>
  </Teleport>
</template>
<script>
import { shallowRef, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useTree } from "@/platform/composables/useTree";
import DataTable from "@/platform/modules/data/DataTable.vue";

export default {
  components: {
    DataTable,
  },
  setup() {
    const { content, activeBranch, activeParent, id } =
      useTree();
    const router = useRouter();

    return {
      activeBranch,
      content,
      activeParent,
      id,
      async closeDataEditor() {
        router.push(`/l/${id.value}/${activeBranch.value.id}`);
      },
    };
  },
};
</script>
