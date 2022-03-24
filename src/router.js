import { createRouter, createWebHistory } from "vue-router";
import routes from "./router/routes";

const devMode = window.location.host === "localhost:3000";

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});
