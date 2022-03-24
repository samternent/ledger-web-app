<template>
  <AppShell>
    <template #side-nav>
      <VerticalNav />
    </template>

    <OpenPGP>
      <Ledger>
        <router-view />
      </Ledger>
    </OpenPGP>
  </AppShell>
</template>

<script>
import AppLayout from "@/platform/layouts/AppLayout.vue";
import AppShell from "@/platform/layouts/AppShell.vue";
import VerticalNav from "@/platform/modules/nav/VerticalNav.vue";
import OpenPGP from "@/platform/modules/openPGP/OpenPGP.vue";
import Ledger from "@/platform/modules/ledger/Ledger.vue";

export default {
  components: {
    AppLayout,
    AppShell,
    VerticalNav,
    OpenPGP,
    Ledger,
  },
};
</script>

<style>
* {
  transition: background-color 0.4s;
}
</style>
