<template>
  <ul class="menu w-full flex-1 overflow-y-auto">
    <li
      v-for="branch in branches"
      :key="branch.id"
      class="my-1 border-l-4"
      :style="`border-color: ${branch.color};`">
      <router-link :to="`${branch.id}`" class="flex">
        {{ branch.name }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    branches: {
      type: Array,
      default: () => ([]),
    }
  },
};
</script>
