<template>  
  <select v-model="selected">
    <option v-for="theme in themes" :key="theme" :value="theme">
      {{ theme }}
    </option>
  </select>
</template>
<script>
import { shallowRef, watch } from "vue";

export default {
  setup() {
    const selected = shallowRef(localStorage.getItem('theme'));

    watch(selected, (value) => {
      localStorage.setItem('theme', value)
      document.documentElement.dataset.theme = value;
    }, {
      immediate: true,
    })

    return {
      selected,
      themes: ["concordslight","concordsdark", "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
    }
  }
}
</script>