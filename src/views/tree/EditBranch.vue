<template>
  <div class="flex-1 bg-base-100 flex flex-col overflow-auto">
    <Editor
      v-model="editorContent"
      @save="updateContent"
      @close="closeContentEditor"
      :title="activeBranch.name"
      :can-save="editorContent !== content?.content"
    />
  </div>
</template>
<script>
import { shallowRef, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useTree } from "@/platform/composables/useTree";
import Editor from "@/platform/modules/editor/Editor.vue";

export default {
  components: {
    Editor,
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
