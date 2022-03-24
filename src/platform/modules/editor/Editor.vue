<template>
  <div class="flex-1 flex-col flex group relative p-4">
    <h1 class="font-thin text-5xl my-2">{{ title }}</h1>
    <div class="sticky top-0 z-20 bg-base-100">
      <div
        v-if="editor"
        class="sticky top-10 transition group-hover:opacity-100 flex no-scrollbar justify-between bg-base-100 z-20 overflow-x-auto pt-1"
      >
        <div class="flex justify-start">
          <EditorControls :editor="editor" />
        </div>
        <div class="flex">
          <button class="btn btn-ghost btn-sm" @click="$emit('close')">
            Close <span v-if="canSave" class="ml-1"> without Saving</span>
          </button>
          <button
            class="btn btn-success btn-sm ml-2"
            :disabled="!canSave"
            @click="$emit('save')"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    <editor-content
      :editor="editor"
      class="flex-1 flex overflow-y-auto rounded px-4 border border-neutral my-4"
    />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, watch, ref } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { OnClickOutside } from "@vueuse/components";
import EditorControls from "./EditorControls.vue";

export default {
  components: {
    EditorContent,
    OnClickOutside,
    EditorControls,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
    canSave: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
  },

  emits: ["save", "update:modelValue"],

  setup(props, { emit }) {
    const editor = ref(null);
    const showTools = ref(false);
    let autoSaveTimeout = null;

    onMounted(() => {
      editor.value = new Editor({
        extensions: [StarterKit],
        content: props.modelValue.value,
        autofocus: false,
        editorProps: {
          attributes: {
            class:
              "prose-dark sm:prose-dark lg:prose-lg my-4 mt-5 focus:outline-none flex-1",
          },
        },
        onUpdate: () => {
          // HTML
          emit("update:modelValue", editor.value.getHTML());

          // JSON
          // this.$emit('update:modelValue', this.editor.getJSON())
        },
      });
    });

    onBeforeUnmount(() => {
      editor.value.destroy();
    });

    watch([() => props.modelValue, editor], ([value]) => {
      if (!editor.value) return;
      // HTML
      const isSame = editor.value.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      editor.value.commands.setContent(value, false);
    });

    return { editor, showTools };
  },
};
</script>
<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
