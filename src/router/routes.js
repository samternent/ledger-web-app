import ledgerRoutes from "./pages/ledger/routes";
import openPGPRoutes from "./pages/openPGP/routes";
import settingsRoutes from "./pages/settings/routes";

export default [
  ...ledgerRoutes,
  ...openPGPRoutes,
  ...settingsRoutes,
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./pages/FourOhFour.vue"),
  },
];
