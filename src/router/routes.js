import ledgerRoutes from "./pages/ledger/routes";
import accountRoutes from "./pages/account/routes";
import settingsRoutes from "./pages/settings/routes";
import infoRoutes from "./pages/info/routes";

export default [
  ...ledgerRoutes,
  ...accountRoutes,
  ...settingsRoutes,
  ...infoRoutes,
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./pages/FourOhFour.vue"),
  },
];
