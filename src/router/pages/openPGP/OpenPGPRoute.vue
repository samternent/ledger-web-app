<template>
  <div class="p-2">
    <h1 class="text-2xl font-medium">OpenPGP Keys</h1>
    <div class="flex font-mono text-xs mt-4">
      <pre class="mr-4">{{ publicKey }}</pre>
      <div class="font-mono flex flex-col">
        <pre class="">{{ privateKey }}</pre>
        <span>Password: password1</span>
        <pre>UserIDs: [{ name: "Guest", email: "guest@concords.app" }]</pre>
      </div>
    </div>
  </div>
</template>
<script>
import { useIdentity } from "@/platform/composables/useIdentity";

export default {
  setup() {
    const { publicKey, privateKey } = useIdentity();

    return {
      publicKey,
      privateKey,
    }
  },
}
</script>
