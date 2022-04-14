<template>
  <div class="flex-1 bg-base-100 flex flex-col">
    <div class="flex flex-1 flex-col overflow-auto">
      <router-view />
    </div>
    <Teleport to="#BottomPanelBanner">
      <ControlPanelMini />
    </Teleport>
    <Teleport to="#BottomPanelContent">
      <ControlPanel />
    </Teleport>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { provideTree } from "@/platform/composables/useTree";
import { provideTreeLoader } from '@/platform/composables/useTreeLoader';
import TreeList from '@/views/tree/TreeList.vue'
import ControlPanel from '@/platform/modules/control/ControlPanel.vue'
import ControlPanelMini from '@/platform/modules/control/ControlPanelMini.vue'

export default {
  components: {
    TreeList,
    ControlPanel,
    ControlPanelMini,
  },
  props: {
    ledgerId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { loadTree } = provideTreeLoader();
    const router = useRouter();

    const rawLedger = JSON.parse(localStorage.getItem("ledger"));
    if (rawLedger) {
      loadTree(rawLedger);
    } else {
      router.replace(`/l/create`);
    }

    provideTree();
  },
}
</script>
