<template>
  <div class="flex-1 bg-base-100 flex flex-col overflow-auto">
    <CreateBanch v-if="loaded" />
  </div>
</template>
<script>
import { useLedger } from "@/platform/composables/useLedger";
import CreateBanch from "@/views/tree/CreateBranch.vue";

export default {
  components: {
    CreateBanch,
  },
  setup() {
    const { loaded } = useLedger();
    return {
      loaded,
    };
  },
};
</script>
