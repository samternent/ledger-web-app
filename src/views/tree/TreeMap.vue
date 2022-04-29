<template>
  <div class="flex w-full flex-col flex-1">
    <div class="flex flex-1 justify-center items-center">
      <div class="relative">
        <!-- Outer Ring-->
        <div
          class="w-12 h-12 rounded-full absolute border-2 border-dashed border-base-100"
        ></div>

        <!-- Inner Ring -->
        <div
          class="w-12 h-12 rounded-full animate-spin absolute border-2 border-dashed border-accent border-t-transparent"
        ></div>
      </div>
    </div>
    <!-- <Teleport to="#TopFixedPanel">
      <div
        class="text-sm breadcrumbs p-2 flex overflow-visible flex-row flex-1"
      >
       {{ trunk.name }}

        <div class="flex justify-end">
        </div>
      </div>
    </Teleport>
    <Teleport to="#LeftPanelContent">
      <div class="overflow-x-hidden pr-6">
        <Tree v-if="trunk.id" :branch-id="trunk.id" />
      </div>
    </Teleport>
    <div class="overflow-auto flex flex-1 p-2">
    <TreeMapItem v-if="trunk.id" :branch-id="trunk.id" />
    </div> -->
  </div>
</template>
<script>
import { watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import TreeMapItem from "@/views/tree/components/TreeMapItem.vue";
import Tree from "@/views/tree/components/Tree.vue";
import { useTree } from "@/platform/composables/useTree";
import { useLedger } from "@/platform/composables/useLedger";

export default {
  components: {
    TreeMapItem,
    Tree,
  },
  setup() {
    const { trunk, id } = useTree();
    const { ledger, loaded } = useLedger();
    const router = useRouter();
    const route = useRoute();

    watchEffect(() => {
      if (loaded.value) {
        router.push(`/l/${id.value}/${trunk.value.id}`);
      }
    });

    return { trunk };
  },
};
</script>
