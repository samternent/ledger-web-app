export default [
  {
    path: "/l/:ledgerId",
    props: true,
    component: () => import("./LedgerRoute.vue"),
    meta: {
      hasTopPanel: true,
      hasBottomPanel: true,
      hasLeftPanel: true,
    },
    children: [
      {
        path: "/l/:ledgerId/:branch",
        props: true,
        meta: {
          hasLeftPanel: true,
          hasRightPanel: true,
        },
        component: () => import("./views/BranchRoute.vue"),
      },
      {
        path: "/l/:ledgerId/:branch/create",
        props: true,
        meta: {
          hasLeftPanel: true,
          hasRightPanel: true,
          // hasTopPanel: false,
        },
        component: () => import("./views/CreateBranchRoute.vue"),
      },
      {
        path: "/l/:ledgerId/:branch/edit",
        props: true,
        meta: {
          hasLeftPanel: false,
          // hasTopPanel: false,
        },
        component: () => import("./views/EditBranchRoute.vue"),
      },
      {
        path: "/l/:ledgerId/:branch/data",
        props: true,
        meta: {
          hasLeftPanel: false,
          hasRightPanel: true,
        },
        component: () => import("./views/DataBranchRoute.vue"),
      },
      {
        path: "/l/:ledgerId/:branch/board",
        props: true,
        meta: {
          hasLeftPanel: true,
          // hasTopPanel: false,
        },
        component: () => import("./views/BoardBranchRoute.vue"),
      },
      {
        path: "",
        component: () => import("./views/TrunkRoute.vue"),
      },
    ],
  },
  {
    path: "/l/create",
    component: () => import("./views/CreateRoute.vue"),
  },
  {
    path: "/l/import",
    component: () => import("./views/ImportRoute.vue"),
  },
  {
    path: "/",
    component: () => import("./LedgerRedirect.vue"),
  },
];
