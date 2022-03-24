<template>
  <div class="overflow-hidden bg-base-100 max-w-screen">
    <div class="rounded-lg shadow drawer drawer-mobile h-screen">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="flex flex-col justify-center drawer-content">
        <div class="flex items-center p-2 lg:hidden bg-base-200">
          <label for="my-drawer-2" class="drawer-button cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <section class="ml-4">
            <slot name="logo"> My App Name </slot>
          </section>
        </div>
        <div class="flex-1 flex overflow-hidden">
          <slot />
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <VerticalNav>
          <template #logo>
            <slot name="logo"> My App Name </slot>
          </template>
        </VerticalNav>
      </div>
    </div>
  </div>
</template>
<script>
import VerticalNav from "@/platform/modules/nav/VerticalNav.vue";

export default {
  components: {
    VerticalNav,
  },
};
</script>
