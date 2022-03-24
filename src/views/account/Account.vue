<template>
  <div>
    <h1>Account</h1>
    <div class="flex flex-col p-4">
      <Glyph class="w-20 h-20" v-bind="{ glyph }" :grid-len="16" />
    </div>
  </div>
</template>
<script>
import { shallowRef } from "vue";
import { useIdentity } from "@/platform/composables/useIdentity";
import useGlyph from "@/platform/composables/useGlyph";
import Glyph from "@/components/Glyph.vue";
import ThemeSwitch from "@/components/ThemeSwitch.vue";

export default {
  components: {
    Glyph,
    ThemeSwitch,
  },
  setup() {
    const { publicKey } = useIdentity();
    const glyph = useGlyph({
      identity: publicKey,
    });

    return {
      glyph,
    };
  },
};
</script>
