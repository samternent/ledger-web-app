<template>
  <div class="flex-1 flex flex-col overflow-auto">
    <Teleport to="#TopFixedPanel">
      <div
        class="text-sm breadcrumbs p-2 flex overflow-visible flex-row flex-1"
      >
        <ul class="flex-1">
          <li>
            <router-link alt="Ledger Home" :to="`/l/${id}`">
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
            <router-link
              :alt="activeParent.name"
              :to="`/l/${activeBranch.parent}`"
              >{{ activeParent.name }}</router-link
            >
          </li>
          <li>
            <span class="w-52 block truncate">{{ activeBranch.name }}</span>
          </li>
        </ul>

        <div class="flex justify-end">
          <Search
            v-model="searchTerm"
            :search-results="searchResults"
            :tree-id="id"
          />
        </div>
      </div>
    </Teleport>

    <div class="flex flex-col lg:flex-row flex-1">
      <div class="flex-1 px-4 flex flex-col">
        <div class="font-thin flex justify-between items-center pb-2">
          <div class="text-2xl md:text-4xl line-clamp-1">
            {{ activeBranch.name }}
          </div>
          <div class="flex">
            <router-link
              v-if="$route.path === `/l/${id}/${activeBranch.id}`"
              alt="Edit"
              :to="`/l/${id}/${activeBranch.id}/edit`"
              class="btn btn-primary btn-outline btn-sm mr-2"
            >
              Edit
            </router-link>
          </div>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script>
import { shallowRef, computed, watchEffect } from "vue";
import { useTree } from "@/platform/composables/useTree";
import { useLedger } from "@/platform/composables/useLedger";
import Editor from "@/platform/modules/editor/Editor.vue";
import Search from "@/platform/modules/search/Search.vue";
import VoidSVG from "@/assets/svg/Void.vue";
import MindMap from "@/assets/svg/MindMap.vue";

export default {
  components: {
    Editor,
    Search,
    VoidSVG,
    MindMap,
  },
  emits: ["explore"],
  setup() {
    const {
      activeBranch,
      createBranch,
      getBranch,
      setActiveBranchById,
      children,
      searchBranches,
      searchContent,
      searchDataTypes,
      searchData,
      trunk,
      content,
      updateContent,
      activeParent,
      id,
    } = useTree();

    const { ledger } = useLedger();

    const newBranchName = shallowRef("");
    const searchTerm = shallowRef("");
    const isEditingContent = shallowRef("");
    const editorContent = shallowRef("");

    async function addBranch() {
      await createBranch({
        name: newBranchName.value,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      });
      newBranchName.value = "";
    }

    const searchResults = computed(() => {
      if (!searchTerm.value) return [];
      return [
        ...searchBranches(searchTerm.value)
          .map(({ data }) => ({
            ...data,
            parent: getBranch(data.parent)?.data,
          }))
          .slice(0, 6),
        ...searchDataTypes(searchTerm.value)
          .map(({ data }) => ({
            ...data.types,
            parent: getBranch(data.parent)?.data,
          }))
          .slice(0, 6),
        ...searchContent(searchTerm.value)
          .map(({ data }) => {
            const branch = getBranch(data.id)?.data;
            return {
              ...data,
              ...branch,
              parent: getBranch(branch.parent)?.data,
            };
          })
          .slice(0, 6),
      ];
    });

    return {
      addBranch,
      activeBranch,
      setActiveBranchById,
      newBranchName,
      children,
      searchTerm,
      searchResults,
      trunk,
      editorContent,
      isEditingContent,
      activeParent,
      id,
      updateContent() {
        updateContent(editorContent.value);
        isEditingContent.value = false;
      },
      content,
      ledger,
    };
  },
};
</script>
