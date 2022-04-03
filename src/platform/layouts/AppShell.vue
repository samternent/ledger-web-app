<template>
  <div id="AppShell" class="flex h-sceen w-screen bg-base-100">
    <!-- Fixed responsive sidenav -->
    <section id="SideNav" class="flex">
      <nav class="w-16 bg-base-300 h-full z-50 shadow-lg">
        <slot name="side-nav" />
      </nav>
    </section>

    <section id="MainContent" class="flex flex-col h-screen flex-1">
      <!-- Top fixed panel -->
      <section
        id="TopFixedPanel"
        v-if="$route.meta.hasTopPanel"
        class="bg-base-300 h-14 items-center flex w-full shadow z-40"
      ></section>

      <!-- Main Content area -->
      <main class="flex-1 overflow-auto flex">
        <!-- Left Fixed Panel -->
        <div
          class="bg-base-200 relative flex border-r border-base-300 transition-all"
          :class="isLeftPanelExpanded ? 'w-64' : 'w-10'"
          v-if="$route.meta.hasLeftPanel"
        >
          <button
            aria-label="Toggle Left Panel"
            :aria-pressed="isLeftPanelExpanded"
            @click="isLeftPanelExpanded = !isLeftPanelExpanded"
            class="z-20 btn btn-circle btn-ghost btn-sm absolute right-1 top-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform duration-300 transform-gpu"
              :class="isLeftPanelExpanded ? 'rotate-180' : 'rotate-0'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            id="LeftPanelContent"
            class="p-2 flex flex-1 flex-col overflow-x-hidden"
            v-show="isLeftPanelExpanded"
            :class="{ 'opacity-0': !isLeftPanelExpanded }"
          />
        </div>

        <slot />

        <div
          class="bg-base-200 transition-all relative flex flex-col border-l border-base-300"
          :class="isRightPanelExpanded ? 'w-64' : 'w-10'"
          v-if="$route.meta.hasRightPanel"
        >
          <button
            aria-label="Toggle Right Panel"
            :aria-pressed="isRightPanelExpanded"
            @click="isRightPanelExpanded = !isRightPanelExpanded"
            class="btn btn-circle btn-ghost btn-sm absolute left-1 top-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform duration-300 transform-gpu"
              :class="isRightPanelExpanded ? 'rotate-0' : 'rotate-180'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div
            id="RightPanelContent"
            class="mt-8 flex h-full flex-col overflow-x-hidden px-2"
            v-show="isRightPanelExpanded"
            :class="{ 'opacity-0': !isRightPanelExpanded }"
          />
        </div>
      </main>

      <!-- Bottom expandable panel -->
      <section
        id="BottomPanel"
        class="bg-base-300 flex flex-col transition-all shadow z-40"
        :class="isBottomPanelExpanded ? 'h-64' : 'h-10'"
        v-if="$route.meta.hasBottomPanel"
      >
        <!-- Panel Control + Indicator -->
        <div class="flex justify-between py-1 px-2 shadow">
          <div class="flex-1" id="BottomPanelBanner" />

          <div class="flex">
            <router-link
              to="/info"
              class="btn btn-circle btn-ghost btn-sm"
              alt="Info"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </router-link>
            <button
              aria-label="Toggle Bottom Panel"
              :aria-pressed="isBottomPanelExpanded"
              @click="isBottomPanelExpanded = !isBottomPanelExpanded"
              class="btn btn-circle btn-ghost btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transition-transform duration-300 transform-gpu"
                :class="isBottomPanelExpanded ? 'rotate-0' : 'rotate-180'"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div id="BottomPanelContent" class="flex-1 flex overflow-auto" />
      </section>
    </section>
  </div>
</template>

<script>
import { provideAppShell } from '@/platform/composables/useAppShell';

export default {
  setup() {
    const { isBottomPanelExpanded,
      isLeftPanelExpanded,
      isRightPanelExpanded } = provideAppShell();

    return {
      isBottomPanelExpanded,
      isLeftPanelExpanded,
      isRightPanelExpanded,
    };
  },
};
</script>
