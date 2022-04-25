<template>
  <div v-if="editorContent" class="flex-1 flex my-4">
    <div v-html="editorContent" class="prose text-base-content" />
  </div>
  <Teleport to="#RightPanelContent">
    <div class="flex-1 flex flex-col">
      <BranchLog />
    </div>
  </Teleport>
</template>
<script>
import { watchEffect, shallowRef } from "vue";
import { useTree } from "@/platform/composables/useTree";
import BranchLog from "../components/BranchLog.vue";

export default {
  components: {
    BranchLog,
  },
  setup() {
    const editorContent = shallowRef("");
    const { content } = useTree();

    watchEffect(() => {
      editorContent.value = content.value ? content.value.content : "";
    });

    return { editorContent };
  },
};
</script>
