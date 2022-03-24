<template>
  <div class="flex-1 bg-base-100 flex flex-col overflow-auto">
    <DataBranch v-if="loaded" />
  </div>
</template>
<script>
import { useLedger } from "@/platform/composables/useLedger";
import DataBranch from "@/views/tree/branch/DataBranch.vue";

export default {
  components: {
    DataBranch,
  },
  setup() {
    const { loaded } = useLedger();
    return {
      loaded,
    };
  },
};
</script>
