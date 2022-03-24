import { provide, inject, shallowRef, computed, watchEffect } from "vue";

export const useTreesLoaderSymbol = Symbol("useTreesLoader");

export function provideTreesLoader() {
  const trees = shallowRef({});
  const treesList = computed(() => Object.keys(trees.value));

  const treesLoaderInterface = {
    trees,
    treesList,
  };

  provide(useTreesLoaderSymbol, treesLoaderInterface);
  return treesLoaderInterface;
}

export function useTreesLoader() {
  return inject(useTreesLoaderSymbol);
}
