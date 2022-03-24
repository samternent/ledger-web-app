<template>
  <div class="relative flex overflow-auto">
    <Teleport to="#LeftPanelContent">
      <div class="overflow-x-hidden pr-6">
        <Tree v-if="trunk.id" :branch-id="trunk.id" />
      </div>
    </Teleport>
    <Branch v-if="activeBranch" />
  </div>
</template>
<script>
import { watch, shallowRef } from 'vue';
import { useRoute } from 'vue-router'
import Branch from './Branch.vue'
import Tree from "@/views/tree/components/Tree.vue";
import { useTree } from "@/platform/composables/useTree";

export default {
  components: {
    Tree,
    Branch,
  },
  setup() {
    const { setActiveBranchById, activeBranch, trunk } = useTree();
    const route = useRoute();
    const showDrawer = shallowRef(false);

    watch(
      () => route.params.branch,
      (_branch) => {
        setActiveBranchById(_branch);
      },
      { immediate: true }
    )

    return { activeBranch, trunk, showDrawer }
  },
}
</script>
