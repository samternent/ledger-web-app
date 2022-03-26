<template>
  <div class="flex flex-col content-center justify-between h-screen z-50">
    <div>
      <router-link
        alt="Home"
        to="/"
        class="px-2 py-4 flex justify-center items-center"
      >
        <svg class="w-10 h-10 text-[#FE6D73] fill-current" viewBox="0 0 48 48">
          <g>
            <path
              d="M5.899999237060548,-7.629394538355427e-7 c-5.6,0 -5.9,5.3 -5.9,5.6 v38.9 c19.9,0 35.2,0 38.6,0 c5.6,0 5.9,-5.3 5.9,-5.6 V-7.629394538355427e-7 H5.899999237060548 zM7.099999237060544,13.599999237060544 c0,0 1.9,2.1 6.4,2.1 s6.3,-2.1 6.3,-2.1 c0,2.8 -2.8,5.1 -6.3,5.1 C9.99999923706055,18.699999237060545 7.099999237060544,16.39999923706055 7.099999237060544,13.599999237060544 zM32.49999923706055,30.599999237060544 c-1.5,0.9 -3.2,1.5 -5.1,2 c-1.6,0.4 -3.2,0.6000000000000001 -4.9,0.6000000000000001 c-2,0 -3.9,-0.30000000000000004 -5.8,-0.8 c-1.7000000000000002,-0.5 -3.3,-1.2 -4.7,-2 c-0.9,-0.6000000000000001 -1.1,-1.7000000000000002 -0.6000000000000001,-2.6 c0.6000000000000001,-0.9 1.7000000000000002,-1.1 2.6,-0.6000000000000001 c1.1,0.7000000000000001 2.3,1.2 3.7,1.6 c2.8,0.8 6,0.8 8.9,0.2 c1.5,-0.4 2.9,-0.9 4,-1.6 c0.9,-0.5 2,-0.2 2.6,0.6000000000000001 C33.699999237060545,28.89999923706055 33.39999923706055,30.099999237060544 32.49999923706055,30.599999237060544 zM31.89999923706055,18.699999237060545 c-3.5,0 -6.3,-2.3 -6.3,-5.1 c0,0 1.9,2.1 6.4,2.1 s6.3,-2.1 6.3,-2.1 C38.199999237060545,16.39999923706055 35.29999923706055,18.699999237060545 31.89999923706055,18.699999237060545 z"
              id="svg_1"
              class=""
              fill="inherit"
              fill-opacity="1"
            />
          </g>
        </svg>
        <span class="hidden font-medium">CONCORDS</span>
        <span class="hidden font-black text-accent ml-1 text-xl">.</span>
      </router-link>
      <!-- <div class="divider my-4"></div>  -->
      <ul class="menu my-6 flex items-center" v-if="false">
        <li>
          <router-link
            alt="Home"
            to="/home"
            class="flex items-center"
            active-class="bg-base-100"
          >
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span class="hidden">Home</span>
          </router-link>
        </li>
        <li>
          <router-link
            alt="Home"
            to="/"
            class="flex items-center"
            active-class="bg-base-100"
          >
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span class="hidden">Trees</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <div class="px-2">
        <router-link
          alt="Import"
          to="/l/import"
          class="btn btn-secondary btn-outline btn-sm mx-auto my-2 block flex w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span class="hidden ml-2">Import</span>
        </router-link>

        <router-link
          alt="Create"
          to="/l/create"
          class="btn btn-primary btn-sm mx-auto mt-2 mb-8 block flex w-full"
        >
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
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span class="hidden ml-2">Create</span>
        </router-link>
      </div>
      <div>
        <router-link
          alt="Manage OpenPGP"
          to="/openPGP"
          class="flex items-center justify-center hover:bg-base-100 p-3"
        >
          <div class="avatar placeholder">
            <div
              class="bg-neutral-focus text-neutral-content rounded-full w-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
// import { useCurrentUser } from "@/platform/composables/useCurrentUser";

export default {
  setup() {
    // const currentUser = useCurrentUser();

    // const avatarInitials = computed(() => {
    //   if (!currentUser.value.email) return null;

    //   return currentUser.value.email
    //     .split("@")[0]
    //     .split(".")
    //     .map((word) => word[0])
    //     .join([""]);
    // });

    // return {
    //   currentUser,
    //   avatarInitials,
    // };
  },
};
</script>
