<template>
  <div class="flex-1 bg-base-100 flex flex-col overflow-auto">
    <EditBanch v-if="loaded" />
  </div>
</template>
<script>
import { useLedger } from "@/platform/composables/useLedger";
import EditBanch from "@/views/tree/EditBranch.vue";

export default {
  components: {
    EditBanch,
  },
  setup() {
    const { loaded } = useLedger();
    return {
      loaded,
    };
  },
};
</script>
