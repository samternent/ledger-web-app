<template>
  <TreeMap />
</template>
<script>
import { useRouter } from "vue-router";
import { useTree } from "@/platform/composables/useTree";
import TreeMap from "@/views/tree/TreeMap.vue";

export default {
  components: {
    TreeMap,
  },
  setup() {
    const { trunk, id } = useTree();

    return { trunk };
  },
}
</script>
