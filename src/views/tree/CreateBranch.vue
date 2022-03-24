<template>
  <Teleport to="#LeftPanelContent">
    <div class="overflow-x-hidden pr-6">
      <Tree v-if="trunk.id" :branch-id="trunk.id" :create="branchName" :create-mode="true" />
    </div>
  </Teleport>
  <Branch v-if="activeBranch" />
</template>
<script>
import { shallowRef, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useTree } from "@/platform/composables/useTree";
import Editor from "@/platform/modules/editor/Editor.vue";
import Tree from "./components/Tree.vue";
import Branch from './Branch.vue'

export default {
  components: {
    Editor,
    Tree,
    Branch,
  },
  setup() {
    const { content, createBranch, activeBranch, activeParent, id, trunk } =
      useTree();
    const branchName = shallowRef('');
    const router = useRouter();

    async function addBranch() {
      const branch = await createBranch({
        name: branchName.value,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      }, activeBranch.value.id);
      branchName.value = "";
      router.push(`/l/${id.value}/${branch.data.id}`)
    }

    return {
      activeBranch,
      content,
      activeParent,
      id,
      trunk,
      branchName,
      addBranch,
    };
  },
};
</script>
