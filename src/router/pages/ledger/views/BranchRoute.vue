<template>
  <div class="flex-1 bg-base-100 flex flex-col">
    <TreeView v-if="loaded" :branch="$route.params.branch" />
    <div class="flex flex-1 justify-center items-center" v-else>
        <div class="relative">
            <!-- Outer Ring-->
            <div class="w-12 h-12 rounded-full absolute border-2 border-dashed border-base-100"></div>

            <!-- Inner Ring -->
            <div class="w-12 h-12 rounded-full animate-spin absolute border-2 border-dashed border-accent border-t-transparent"></div>
        </div>
    </div>
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
