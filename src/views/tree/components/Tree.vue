<template>
  <div class="flex flex-col w-full">
    <div class="flex group" :class="{'ml-6': !children.length && level, 'mb-2 pr-4': !level }" :style="`padding-left: ${16 * level}px`">
      <button aria-label="Collapse Page Tree" class="mr-2" @click="toggleCollapse" v-if="children.length">
        <svg v-if="isCollapsed" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
        </svg>
      </button> 
      <router-link
        :alt="branch.name"
        class="block w-full truncate text-sm font-light"
        :class="{ 'text-xl': !level }"
        active-class="text-secondary"
        :to="`/l/${id}/${branch.id}`">
        {{ branch.name }}
      </router-link>
      <router-link :alt="`Create child of ${branch.name}`" :to="`/l/${id}/${branch.id}/create`" class="opacity-0 group-hover:opacity-50 hover:opacity-80">
        <svg v-if="!addChild" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </router-link>
    </div>
    <div v-if="!isCollapsed">
      <Tree
        v-for="child in children"
        :key="child.id"
        :branch-id="child.id"
        :create="create"
        :create-mode="createMode"
        :level="level + 1" />
    </div>
    <div class="flex text-sm my-2" :class="{'ml-8': level, 'mb-2 pr-4': !level }" :style="`padding-left: ${16 * level + 1}px`" v-if="branch.id === $route.params.branch && createMode">
      <input class="input input-sm truncate" @keydown.enter="addBranch" placeholder="Page Name..." v-model="newBranchName">
      <button class="btn btn-sm btn-ghost ml-2" @click="addBranch">+</button>
    </div>
  </div>
</template>
<script>
import { shallowRef, watch } from "vue";
import { useRouter } from "vue-router";
import { useTree } from "@/platform/composables/useTree";
import { useLedger } from "@/platform/composables/useLedger";

export default {
  name: "Tree",
  props: {
    branchId: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    create: {
      type: String,
      default: null,
    },
    createMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { getBranch, getChildren, id, activeBranch, createBranch } = useTree();
    const { ledger } = useLedger();
    const branch = shallowRef(null);
    const children = shallowRef(null);
    const isCollapsed = shallowRef(Boolean(localStorage.getItem(`treeItem_${props.branchId}`)));
    const addChild = shallowRef(false);
    const newBranchName = shallowRef("");

    watch(ledger, () => {
      branch.value = getBranch(props.branchId)?.data;
      children.value = getChildren(props.branchId).map(
        ({ data }) => data
      );
    }, { immediate: true });

    function toggleCollapse() {
      isCollapsed.value = !isCollapsed.value;
      if (isCollapsed.value) {
        localStorage.setItem(`treeItem_${props.branchId}`, isCollapsed.value)
      } else {
        localStorage.removeItem(`treeItem_${props.branchId}`)
      }
    }
    const router = useRouter();

    async function addBranch() {
      const branch = await createBranch({
        name: newBranchName.value,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      }, activeBranch.value.id);
      newBranchName.value = "";
      router.replace(`/l/${id.value}/${branch.data.id}`)
    }

    return { branch, children, id, isCollapsed, addChild, newBranchName, toggleCollapse, addBranch }
  },
}
</script>
