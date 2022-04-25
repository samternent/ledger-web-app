<template>
  <div class="flex-1 bg-base-100 flex flex-col overflow-auto"></div>
</template>
<script>
import { shallowRef, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useTree } from "@/platform/composables/useTree";
import Board from "@/platform/modules/board/Board.vue";

export default {
  components: {
    Board,
  },
  setup() {
    const { content, updateContent, activeBranch, activeParent, id } =
      useTree();
    const editorContent = shallowRef(null);
    const router = useRouter();

    watchEffect(() => {
      editorContent.value = content.value ? content.value.content : "";
    });

    return {
      activeBranch,
      content,
      activeParent,
      id,
      editorContent,
      async updateContent() {
        await updateContent(editorContent.value);
        router.push(`/l/${id.value}/${activeBranch.value.id}`);
      },
      async closeContentEditor() {
        router.push(`/l/${id.value}/${activeBranch.value.id}`);
      },
    };
  },
};
</script>
