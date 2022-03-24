<template>
  <div class="hero flex-1">
    <div class="text-center hero-content">
      <div class="max-w-md">
        <h1 class="mb-4 text-5xl font-medium">
          Create a Ledger
        </h1>
        <h1 class="mb-6 text-2xl font-thin text-gray-400">
          Storage Agnostic, Tamper-Proof & Encrypted Ledger.
        </h1>
        <div class="form-control mb-5">
          <input
            v-model="tree"
            type="text"
            placeholder="Top Secret Documents..."
            class="input input-lg input-bordered"
          />
        </div>
        <div class="flex flex-col w-72 mx-auto">
          <button @click="createTree" class="btn btn-primary my-1">
            Create
          </button>
          <div class="divider">OR</div>
          <router-link to="/l/import" class="btn btn-secondary btn-outline my-1">
            Import
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { nextTick, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { useLedger } from "@/platform/composables/useLedger";

export default {
  setup() {
    const {
      ledger,
      methods: { loadLedger },
    } = useLedger();
    const router = useRouter();

    const tree = shallowRef(null);

    async function createTree() {
      await loadLedger(null, {
        data: {
          parent: null,
          name: tree.value,
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          children: [],
        },
        collection: "branches"
      });
        
      await nextTick();
      const ledgerId = ledger.value.id.slice(0,6)
      router.push(`/l/${ledgerId}`);
    }

    return {
      createTree,
      tree,
    };
  },
};
</script>
