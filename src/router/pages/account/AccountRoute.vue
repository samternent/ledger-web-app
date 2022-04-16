<template>
  <div class="p-2 flex-1 flex-col">
    <h1 class="text-2xl font-medium">Encryption Keys</h1>
    <div class="flex flex-col text-xs mt-4">
      <input class="input input-bordered w-full my-1" :value="publicKey" />
      <input
        class="input input-bordered w-full"
        type="passwrd"
        :value="privateKey"
      />
    </div>
    <div>
      <h2 class="text-2xl">Theme</h2>
      <div class="form-control w-52">
        <label class="label cursor-pointer">
          <span class="label-text">Dark Mode</span>
          <input type="checkbox" v-model="toggleDarkMode" class="toggle" />
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

    const theme = window.localStorage.getItem("theme");

    const toggleDarkMode = shallowRef(
      !theme || theme !== "dark" ? false : true
    );

    watchEffect(() => {
      if (toggleDarkMode.value) {
        document.documentElement.dataset.theme = "dark";
        window.localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.dataset.theme = "light";
        window.localStorage.setItem("theme", "light");
      }
    });

    return {
      publicKey,
      privateKey,
      toggleDarkMode,
    };
  },
};
</script>
