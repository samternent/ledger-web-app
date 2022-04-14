<template>
  <div class="flex flex-1">
    <slot />
  </div>
</template>
<script>
import { useIdentity } from "@/platform/composables/useIdentity";
import { provideLedger } from "@/platform/composables/useLedger";
import { provideSolid } from "@/platform/composables/useSolid";

export default {
  name: "Ledger",
  setup() {
    const { privateKey, publicKey } = useIdentity();
    provideLedger({ privateKey, publicKey });
    provideSolid();
  }
}
</script>