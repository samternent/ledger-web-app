<template>
  <div>
    <h2 class="my-2 text-2xl">My Trees</h2>
    <ul class="menu">
      <li v-for="treeId in treesList" :key="treeId">
        <router-link :to="`/l/${treeId.slice(0, 8)}`">{{ trees[treeId].name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { provideTreesLoader } from './composables/useTreesLoader';

export default {
  setup() {
    const { treesList, trees } = provideTreesLoader();

    return { treesList, trees };
  },
}
</script>