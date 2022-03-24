<template>
  <router-view />
</template>
<script>
import { provideTreeLoader } from '@/platform/composables/useTreeLoader';

export default {
  props: {
    treeId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    provideTreeLoader(props.treeId);
  },
}
</script>