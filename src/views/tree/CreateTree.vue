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
        <div class="flex flex-1 flex-col justify-center">
          <h1 class="text-5xl font-black pb-3 px-2">
            Ledger Web App<span class="text-primary">.</span>
          </h1>
          <div class="flex-1 flex flex-col lg:flex-row px-2">
            <div class="w-full lg:w-1/2">
              <p class="pt-4 font-light text-lg">
                <strong class="font-medium underline">Concords Ledger</strong>
                is an <em>open-source & serverless</em> web app. Utilising
                browser based cryptography for data integrity and indentity, in
                a blockchain core-data structure.
              </p>
              <p class="pt-6 pb-3 font-light text-lg">
                <em
                  >A Ledger can be used for creating structured content and
                  dynamic tabular data, with anonymity.</em
                >
              </p>
              <p class="pb-6 font-light text-md">
                It <em>never</em> leaves the browser and the app is executed
                completely in the browser.
              </p>
              <a
                href="https://github.com/concords/ledger-web-app"
                alt="Github: concords/ledger-web-app"
                class="flex link-primary mt-8 mb-2 font-light"
                target="_blank"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  class="w-6 h-6 inline-block text-base-content mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                    transform="scale(64)"
                    class="fill-current"
                  />
                </svg>
                concords/ledger-web-app
              </a>
              <a
                href="https://www.teamconcords.com"
                alt="Team Concords Limited"
                class="flex link-primary mt-2 mb-2 font-light"
                target="_blank"
              >
                <svg class="w-6 h-6 text-base-content mr-2" viewBox="0 0 48 48">
                  <g>
                    <path
                      d="M5.899999237060548,-7.629394538355427e-7 c-5.6,0 -5.9,5.3 -5.9,5.6 v38.9 c19.9,0 35.2,0 38.6,0 c5.6,0 5.9,-5.3 5.9,-5.6 V-7.629394538355427e-7 H5.899999237060548 zM7.099999237060544,13.599999237060544 c0,0 1.9,2.1 6.4,2.1 s6.3,-2.1 6.3,-2.1 c0,2.8 -2.8,5.1 -6.3,5.1 C9.99999923706055,18.699999237060545 7.099999237060544,16.39999923706055 7.099999237060544,13.599999237060544 zM32.49999923706055,30.599999237060544 c-1.5,0.9 -3.2,1.5 -5.1,2 c-1.6,0.4 -3.2,0.6000000000000001 -4.9,0.6000000000000001 c-2,0 -3.9,-0.30000000000000004 -5.8,-0.8 c-1.7000000000000002,-0.5 -3.3,-1.2 -4.7,-2 c-0.9,-0.6000000000000001 -1.1,-1.7000000000000002 -0.6000000000000001,-2.6 c0.6000000000000001,-0.9 1.7000000000000002,-1.1 2.6,-0.6000000000000001 c1.1,0.7000000000000001 2.3,1.2 3.7,1.6 c2.8,0.8 6,0.8 8.9,0.2 c1.5,-0.4 2.9,-0.9 4,-1.6 c0.9,-0.5 2,-0.2 2.6,0.6000000000000001 C33.699999237060545,28.89999923706055 33.39999923706055,30.099999237060544 32.49999923706055,30.599999237060544 zM31.89999923706055,18.699999237060545 c-3.5,0 -6.3,-2.3 -6.3,-5.1 c0,0 1.9,2.1 6.4,2.1 s6.3,-2.1 6.3,-2.1 C38.199999237060545,16.39999923706055 35.29999923706055,18.699999237060545 31.89999923706055,18.699999237060545 z"
                      id="svg_1"
                      class="fill-current"
                      fill="inherit"
                      fill-opacity="1"
                    />
                  </g>
                </svg>
                Team Concords Limited.
              </a>
            </div>
            <div class="w-full lg:w-1/2 p-4">
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
                <li>Tamper-proof and verifyable with cryptography.</li>
                <li>Git-esq "commit & push" workflow to storage.</li>
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
