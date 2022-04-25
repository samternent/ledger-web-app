<template>
  <div class="flex-1 bg-base-100 flex flex-col overflow-auto">
    <MarkdownBranch v-if="loaded" />
  </div>
</template>
<script>
import { useLedger } from "@/platform/composables/useLedger";
import MarkdownBranch from "@/views/tree/branch/MarkdownBranch.vue";

export default {
  components: {
    MarkdownBranch,
  },
  setup() {
    const { loaded } = useLedger();

    return {
      loaded,
    };
  },
};
</script>
