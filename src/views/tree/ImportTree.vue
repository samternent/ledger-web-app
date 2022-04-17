<template>
  <div class="flex-1 flex justify-center items-center">
    <div class="text-center md:w-1/2">
      <div v-if="isPasswordEncrypted">
        This Ledger is password ecrypted.
        <input
          class="input input-bordered"
          v-model="password"
          placeholder="Ledger password"
        />
        <button class="btn btn-primary" @click="passwordDecrypt">Open</button>
      </div>
      <div v-else-if="isPGPEncrypted">
        <h2>This Ledger is PGP ecrypted.</h2>
        <textarea
          class="textarea textarea-bordered textarea-xs w-full my-2 bg-base-100 rounded flex-1"
          placeholder="OpenPGP PRivate Key"
          v-model="openPGPPrivateKey"
        />
        <button class="btn btn-primary" @click="openPGPDecrypt">Open</button>
      </div>
      <div v-else class="flex flex-col">
        <Solid class="mx-auto border border-base-300 rounded my-4 p-4" />
        <LoadFromFile @load="handleLoad">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
            />
          </svg>
          Load from File System
        </LoadFromFile>
        <LoadFromURL @load="handleLoad" class="mt-4">
          <span class="hidden md:block ml-2">Load from URL</span>
        </LoadFromURL>
      </div>
    </div>
  </div>
</template>
<script>
import { shallowRef } from "vue";
import { useRouter } from "vue-router";
import { useLedger } from "@/platform/composables/useLedger";
import useEncryption from "@/platform/composables/useEncryption";
import LoadFromFile from "@/platform/components/LoadFromFile.vue";
import LoadFromURL from "@/platform/components/LoadFromURL.vue";
import Solid from "@/platform/modules/control/controls/Solid.vue";
import { useIdentity } from "@/platform/composables/useIdentity";

export default {
  components: {
    LoadFromFile,
    LoadFromURL,
    Solid,
  },
  setup() {
    const {
      methods: { loadLedger },
    } = useLedger();
    const router = useRouter();
    const { decryptDataWithPassword, decryptDataWithPGP } = useEncryption();

    const rawLedger = shallowRef(null);
    const isPasswordEncrypted = shallowRef(false);
    const isPGPEncrypted = shallowRef(false);
    const password = shallowRef(null);

    async function passwordDecrypt() {
      try {
        const rawDecrypted = await decryptDataWithPassword(
          password.value,
          rawLedger.value
        );
        console.log(rawDecrypted);
        const l = JSON.parse(rawDecrypted);
        window.localStorage.setItem("ledger", rawDecrypted);
        router.push(`/`);
      } catch (e) {
        console.error(e);
      }
    }
    async function openPGPDecrypt() {
      const rawDecrypted = await decryptDataWithPGP(rawLedger.value);
      const l = JSON.parse(rawDecrypted);
      window.localStorage.setItem("ledger", rawDecrypted);
      router.push(`/`);
    }

    async function handleLoad(raw) {
      rawLedger.value = raw;
      try {
        const l = JSON.parse(raw);
        await loadLedger(l);
        window.localStorage.setItem("ledger", raw);
        router.push(`/l/${l.id.slice(0, 6)}`);
      } catch (err) {
        if (raw.includes("-----BEGIN AGE ENCRYPTED FILE-----")) {
          isPasswordEncrypted.value = true;
        } else if (raw.includes("-----BEGIN PGP MESSAGE-----")) {
          openPGPDecrypt();
        }
      }
    }

    return {
      handleLoad,
      rawLedger,
      isPasswordEncrypted,
      isPGPEncrypted,
      passwordDecrypt,
      openPGPDecrypt,
      password,
    };
  },
};
</script>
