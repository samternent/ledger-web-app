import ledgerRoutes from "./pages/ledger/routes";
import openPGPRoutes from "./pages/openPGP/routes";
import settingsRoutes from "./pages/settings/routes";
import infoRoutes from "./pages/info/routes";

export default [
  ...ledgerRoutes,
  ...openPGPRoutes,
  ...settingsRoutes,
  ...infoRoutes,
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./pages/FourOhFour.vue"),
  },
];
