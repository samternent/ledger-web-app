<template>
  <div class="flex-1 bg-base-100 flex flex-col overflow-auto">
    <BoardBranch v-if="loaded" />
  </div>
</template>
<script>
import { useLedger } from "@/platform/composables/useLedger";
import BoardBranch from "@/views/tree/branch/BoardBranch.vue";

export default {
  components: {
    BoardBranch,
  },
  setup() {
    const { loaded } = useLedger();
    return {
      loaded,
    };
  },
};
</script>
