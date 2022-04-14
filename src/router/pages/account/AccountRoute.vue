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
    <div>
      <h2 class="text-2xl">Theme</h2>
      <div class="form-control w-52">
        <label class="label cursor-pointer">
          <span class="label-text">Dark Mode</span> 
          <input type="checkbox" v-model="toggleDarkMode" class="toggle">
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { shallowRef, watchEffect } from "vue";
import { useIdentity } from "@/platform/composables/useIdentity";

export default {
  setup() {
    const { publicKey, privateKey } = useIdentity();

    const toggleDarkMode = shallowRef(window.localStorage.getItem('theme') === 'dark');

    watchEffect(() => {
      if (toggleDarkMode.value) {
        document.documentElement.dataset.theme = 'dark';
        window.localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.dataset.theme = 'light';
        window.localStorage.setItem('theme', 'light');
      }
    })

    return {
      publicKey,
      privateKey,
      toggleDarkMode,
    }
  },
}
</script>
