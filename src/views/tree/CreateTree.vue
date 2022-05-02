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
        <div class="font-thin flex justify-between items-center mb-4">
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
        <div class="flex flex-1 justify-center text-center">
          <div class="lg:w-1/2 px-2">
            <h1 class="text-5xl font-black">
              Ledger Web App<span class="text-primary">.</span>
            </h1>
            <p class="pt-4 font-light text-lg">
              <strong class="font-medium underline">Concords Ledger</strong> is
              an offline-first, browser based web app. Utilising cryptography
              for data integrity through a blockchain ledger data-structure.
            </p>
            <p class="py-2 pb-6 font-light text-lg">
              It can be used for creating structured content and dynamic tabular
              data, with anonymity. A Ledger <em>never</em> leaves the browser
              and the app is completely serverless and does not run a backend.
            </p>
            <ul
              class="list-disc pl-12 p-6 text-xl font-thin text-left bg-base-300 rounded-lg shadow-lg"
            >
              <li>Offline-First: No Backend; No Servers; No Remote DB.</li>
              <li>
                In-memory database using
                <a
                  class="link-primary"
                  target="_blank"
                  href="https://github.com/techfort/LokiJS"
                  >lokijs</a
                >.
              </li>
              <li>Tree structured content hierarchy.</li>
              <li>Merkle-Tree/Blockchain data structure.</li>
              <li>Tamper-proof using browser based cryptography.</li>
              <li>
                Client-side encryption using WebAssembly and
                <a
                  class="link-primary"
                  target="_blank"
                  href="https://github.com/str4d/rage"
                  >Age</a
                >.
              </li>
              <li>Downloadable - All document content in a single file.</li>
              <li>
                App integration with
                <a
                  class="link-primary"
                  target="_blank"
                  href="https://solidproject.org/"
                  >Solid</a
                >
                for remote storage.
              </li>
            </ul>
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
