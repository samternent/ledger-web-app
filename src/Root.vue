<template>
  <AppShell>
    <template #side-nav>
      <VerticalNav />
    </template>

    <Identity>
      <Ledger>
        <router-view />
      </Ledger>
    </Identity>
  </AppShell>
</template>

<script>
import AppLayout from "@/platform/layouts/AppLayout.vue";
import AppShell from "@/platform/layouts/AppShell.vue";
import VerticalNav from "@/platform/modules/nav/VerticalNav.vue";
import Identity from "@/platform/modules/identity/Identity.vue";
import Ledger from "@/platform/modules/ledger/Ledger.vue";
import { provideSolid } from "@/platform/composables/useSolid";

export default {
  components: {
    AppLayout,
    AppShell,
    VerticalNav,
    Identity,
    Ledger,
  },
  setup() {
    provideSolid();
  },
};
</script>

<style>
* {
  transition: background-color 0.4s;
}
</style>
