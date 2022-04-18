<template>
  <div class="p-2 flex-col flex-1">
    <h1 class="text-2xl font-medium">Identity Keys</h1>
    <div class="flex flex-col text-xs mt-4">
      <textarea
        class="textarea textarea-bordered w-full my-1 h-32 w-full md:w-1/2 my-2"
        :value="verifyKeyPem"
      />
      <textarea
        class="textarea textarea-bordered w-full h-40 w-full md:w-1/2 my-2"
        type="password"
        :value="signKeyPem"
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
    const { verifyKeyPem, signKeyPem } = useIdentity();

    let theme = window.localStorage.getItem("theme");

    if (!theme) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        theme = "dark";
      } else {
        theme = "light";
      }
    }

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
      verifyKeyPem,
      signKeyPem,
      toggleDarkMode,
    };
  },
};
</script>
