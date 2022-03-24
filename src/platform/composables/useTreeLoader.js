import { provide, inject } from "vue";
import { useLedger } from "@/platform/composables/useLedger";

export const useTreeLoaderSymbol = Symbol("useTreeLoader");

export function provideTreeLoader() {
  const {
    ledger,
    methods: { loadLedger },
  } = useLedger();

  function loadTree(rawLedger) {
    if (rawLedger) {
      return loadLedger(rawLedger);
    }
  }

  const treeLoaderInterface = { tree: ledger, loadTree };
  provide(useTreeLoaderSymbol, treeLoaderInterface);
  return treeLoaderInterface;
}

export function useTreeLoader() {
  return inject(useTreeLoaderSymbol);
}
