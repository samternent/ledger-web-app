<template>
  <div class="flex-1 bg-base-100 flex flex-col">
    <TreeView v-if="loaded" />
  </div>
</template>
<script>
import { useLedger } from "@/platform/composables/useLedger";
import TreeView from "@/views/tree/TreeView.vue";

export default {
  components: {
    TreeView,
  },
  setup() {
    const { loaded } = useLedger();

    return {
      loaded,
    };
  },
};
</script>
