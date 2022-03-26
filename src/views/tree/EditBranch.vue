<template>
  <Teleport to="#TopFixedPanel">
    <div class="text-sm breadcrumbs p-2 flex overflow-visible flex-row flex-1">
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
          <router-link :alt="activeBranch.parent" :to="`/l/${id}/${activeBranch.parent}`">{{
            activeParent.name
          }}</router-link>
        </li>
        <li>
          <router-link
            :alt="activeBranch.name"
            :to="`/l/${id}/${activeBranch.id}`"
            class="block truncate"
            >{{ activeBranch.name }}</router-link
          >
        </li>
      </ul>
    </div>
  </Teleport>
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
