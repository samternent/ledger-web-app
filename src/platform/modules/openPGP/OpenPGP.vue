<template>
  <div class="flex flex-1">
    <slot v-if="privateKey" />
    <div v-else class="flex flex-1 items-center justify-center">
      <div class="relative">
        <!-- Outer Ring-->
        <div class="w-12 h-12 rounded-full absolute border-2 border-dashed border-base-100"></div>
        <!-- Inner Ring -->
        <div class="w-12 h-12 rounded-full animate-spin absolute border-2 border-dashed border-accent border-t-transparent"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { provideIdentity } from "@/platform/composables/useIdentity";

export default {
  name: "OpenPGP",
  setup() {
    const { privateKey } = provideIdentity();

    return {
      privateKey,
    }
  }
}
</script>