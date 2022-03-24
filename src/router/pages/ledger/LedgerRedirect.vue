<template>
  <div class="flex-1 bg-base-100 flex flex-col">
  </div>
</template>
<script>
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { provideTreeLoader } from '@/platform/composables/useTreeLoader';

export default {
  setup(props) {
    const { tree, loadTree } = provideTreeLoader();
    const router = useRouter();

    const rawLedger = JSON.parse(localStorage.getItem("ledger"));
    if (rawLedger) {
      loadTree(JSON.parse(localStorage.getItem("ledger")));
    } else {
      router.replace(`/l/create`);
    }

    watchEffect(() => {
      if (tree.value) {
        router.replace(`/l/${tree.value.id.slice(0, 6)}`);
      }
    });
  },
}
</script>
