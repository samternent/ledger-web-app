<template>
  <div class="flex-1 flex flex-col overflow-auto">
    <Teleport to="#TopFixedPanel">
      <div class="mx-2 font-medium">
        <span class="text-2xl">Ledger<span class="text-primary">.</span></span>
        <span class="font-thin ml-6"
          >Storage Agnostic, Tamper-Proof & Encrypted Ledger.</span
        >
      </div>
    </Teleport>
    <Teleport to="#LeftPanelContent">
      <div class="text-xl font-light" :class="{ 'opacity-50': !tree }">
        {{ tree || "Untitled" }}
      </div>
    </Teleport>

    <div class="flex flex-col flex-1">
      <div class="flex-1 px-4 flex flex-col">
        <div class="font-thin flex justify-between items-center">
          <div class="flex flex-1 py-4 items-center">
            <input
              ref="titleInput"
              placeholder="Document title..."
              class="input input font-light input-bordered flex-1"
              v-model="tree"
              @keypress.enter="createTree"
            />
            <button @click="createTree" class="btn btn mx-2 btn-ghost">
              Create
            </button>
          </div>
          <div class="w-1/4 flex justify-end">
            <router-link
              alt="import"
              to="/l/import"
              class="btn btn-secondary btn btn-outline"
            >
              Import
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { nextTick, shallowRef, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useLedger } from "@/platform/composables/useLedger";
import { useTree } from "@/platform/composables/useTree";

export default {
  setup() {
    const {
      ledger,
      loaded,
      methods: { loadLedger, clearLedger },
    } = useLedger();
    const router = useRouter();
    const tree = shallowRef(null);
    const titleInput = shallowRef(null);

    async function createTree() {
      clearLedger();
      await loadLedger(null, {
        data: {
          parent: null,
          name: tree.value,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          children: [],
        },
        collection: "branches",
      });

      await nextTick();
      const ledgerId = ledger.value.id.slice(0, 6);
      router.push(`/l/${ledgerId}`);
    }

    onMounted(() => {
      titleInput.value.focus();
    });

    return {
      createTree,
      tree,
      titleInput,
    };
  },
};
</script>
