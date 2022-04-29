<template>
  <Teleport to="#LeftPanelContent">
    <div class="overflow-x-hidden pr-6" v-if="trunk">
      <Tree
        :branch-id="trunk.id"
        v-if="trunk.id && $route.path !== `/l/${id}/${activeBranch.id}/create`"
      />
    </div>
  </Teleport>
  <div class="relative flex overflow-auto flex-1 flex-col" v-if="activeBranch">
    <div class="tabs py-3">
      <router-link
        class="tab tab-bordered"
        exact-active-class="tab-active"
        :to="`/l/${id}/${activeBranch.id}`"
        >Document</router-link
      >
      <router-link
        class="tab tab-bordered"
        exact-active-class="tab-active"
        :to="`/l/${id}/${activeBranch.id}/data`"
        >Data</router-link
      >
      <!-- <router-link
        class="tab tab-bordered"
        exact-active-class="tab-active"
        :to="`/l/${id}/${activeBranch.id}/charts`"
        >Charts</router-link
      > -->
    </div>
    <Branch />
  </div>
</template>
<script>
import { watch, shallowRef } from "vue";
import { useRoute } from "vue-router";
import Branch from "./Branch.vue";
import Tree from "@/views/tree/components/Tree.vue";
import { useTree } from "@/platform/composables/useTree";

export default {
  components: {
    Tree,
    Branch,
  },
  setup() {
    const { setActiveBranchById, activeBranch, trunk, id } = useTree();
    const route = useRoute();

    watch(
      () => route.params.branch,
      (_branch) => {
        setActiveBranchById(_branch);
      },
      { immediate: true }
    );

    return { activeBranch, trunk, id };
  },
};
</script>
