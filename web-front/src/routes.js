import * as pages from "./pages";

export const routes = [
  {
    path: "/login",
    component: pages.Login,
    isShowSideMenu: false
  },
  {
    path: "/*",
    component: pages.MainLayout,
    routes: [
      { path: "/main", component: pages.Homepage, isShowSideMenu: false },
      { path: "/rank", component: pages.Rank, isShowSideMenu: true },
      {
        path: "/bookdetail",
        component: pages.BookContent,
        isShowSideMenu: false
      },
      { path: "", component: pages.Homepage }
    ]
  }
];
