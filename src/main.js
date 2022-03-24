import { createApp } from "vue";
import "./tailwind.css";
import App from "./Root.vue";
import router from "./router.js";

import "./tailwind.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

const app = createApp(App);

app.use(router);
app.mount("#app");
