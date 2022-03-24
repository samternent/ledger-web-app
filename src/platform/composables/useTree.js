import { shallowRef, watch, provide, inject, computed } from "vue";
import { useLedger } from "@/platform/composables/useLedger";

export const useTreeSymbol = Symbol("useTree");

export function useTree() {
  return inject(useTreeSymbol);
}

export function provideTree() {
  const {
    ledger,
    loaded,
    methods: { getCollection, addRecord, updateRecord },
  } = useLedger();

  const activeBranch = shallowRef({});
  const activeBranchId = shallowRef(null);
  const activeParent = shallowRef(null);
  const children = shallowRef([]);
  const trunk = shallowRef({});
  const content = shallowRef({});
  const id = computed(() => ledger.value?.id.slice(0, 6));

  function getBranch(id) {
    return getCollection("branches").findOne({
      "data.id": id,
    });
  }

  function getChildren(id) {
    return getCollection("branches").find({
      "data.parent": id,
    });
  }

  function getTrunk() {
    return getCollection("branches").findOne({
      "data.parent": null,
    });
  }

  function searchBranches(searchTerm) {
    return [
      ...getCollection("branches").find({
        "data.name": { $regex: new RegExp(searchTerm, "i") },
      }),
    ];
  }
  function searchContent(searchTerm) {
    return [
      ...getCollection("content").find({
        "data.content": { $regex: new RegExp(searchTerm, "i") },
      }),
    ];
  }

  function getContent(id) {
    return getCollection("content").findOne({
      "data.id": id,
    });
  }

  function setActiveBranchById(id) {
    if (getBranch(id)) {
      activeBranchId.value = id;
    } else {
      activeBranchId.value = trunk.value.id;
    }
    localStorage.setItem("activeBranchId", activeBranchId.value);
  }

  watch(
    [loaded, ledger, activeBranchId],
    () => {
      if (!loaded.value) return;
      trunk.value = getTrunk()?.data;

      if (activeBranchId.value) {
        activeBranch.value = getBranch(activeBranchId.value)?.data;
      } else if (trunk.value) {
        activeBranch.value = trunk.value;
        activeBranchId.value = activeBranch.value.id;
      }

      content.value = getContent(activeBranchId.value)?.data;
      if (activeBranch.value?.name) {
        activeParent.value = getBranch(activeBranch.value.parent)?.data;
      }
      children.value = getChildren(activeBranchId.value).map(
        ({ data }) => data
      );
    },
    { immediate: true }
  );

  async function createBranch(data, parent) {
    return addRecord(
      {
        action: "create",
        parent: parent || activeBranchId.value,
        ...data,
      },
      "branches"
    );
  }

  async function deleteBranch(data) {
    return addRecord(
      {
        action: "delete",
        ...data,
      },
      "branches"
    );
  }

  async function updateContent(content) {
    return updateRecord(
      {
        action: "update",
        id: activeBranchId.value,
        content,
      },
      "content"
    );
  }

  const useTreeObservables = {
    setActiveBranchById,
    createBranch,
    deleteBranch,
    updateContent,
    searchBranches,
    searchContent,
    getBranch,
    getContent,
    getChildren,
    activeBranch,
    activeParent,
    children,
    trunk,
    content,
    id,
  };

  window.useTreeObservables = useTreeObservables;
  provide(useTreeSymbol, useTreeObservables);
  return useTreeObservables;
}
