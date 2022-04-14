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
  const dataTypes = shallowRef([]);
  const branchData = shallowRef([]);
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
  function searchDataTypes(searchTerm) {
    return [
      ...getCollection("dataTypes").find({
        "data.types.name": { $regex: new RegExp(searchTerm, "i") },
      }),
    ];
  }
  function searchData(searchTerm) {
    return [
      ...getCollection("branchData").find({
        "data.content": { $regex: new RegExp(searchTerm, "i") },
      }),
    ];
  }

  function getContent(id) {
    return getCollection("content").findOne({
      "data.id": id,
    });
  }

  function getDataTypes(id) {
    return getCollection("dataTypes").find({
      "data.parent": id,
    });
  }
  function getBranchData(id) {
    return getCollection("branchData").find({
      "data.parent": id,
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
      dataTypes.value = getDataTypes(activeBranchId.value)?.map(({ data }) => ({
        id: data.id,
        ...data.types,
      }));
      branchData.value = getBranchData(activeBranchId.value)?.map(
        ({ data }) => data
      );
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

  async function addBranchData(data) {
    return addRecord(
      {
        action: "create",
        parent: activeBranchId.value,
        ...data,
      },
      "branchData"
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

  async function addDataType(dataType) {
    return addRecord(
      {
        action: "create",
        types: dataType,
        parent: activeBranchId.value,
      },
      "dataTypes"
    );
  }

  const useTreeObservables = {
    setActiveBranchById,
    createBranch,
    deleteBranch,
    updateContent,
    searchBranches,
    searchContent,
    searchData,
    searchDataTypes,
    getBranch,
    getContent,
    getChildren,
    addDataType,
    addBranchData,
    activeBranch,
    activeParent,
    children,
    trunk,
    content,
    id,
    dataTypes,
    branchData,
  };

  window.useTreeObservables = useTreeObservables;
  provide(useTreeSymbol, useTreeObservables);
  return useTreeObservables;
}
