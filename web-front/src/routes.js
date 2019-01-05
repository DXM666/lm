import * as pages from "./pages";

export const routes = [
  {
    path: "/login",
    exact: true,
    component: pages.Login,
    isShowSideMenu: false
  },
  {
    path: "/main",
    component: pages.MainLayout,
    isShowSideMenu: false,
    routes: [{ path: "", component: pages.Homepage }]
  },
  {
    path: "/rank",
    component: pages.MainLayout,
    isShowSideMenu: true,
    routes: [{ path: "", component: pages.Homepage }]
  }
];
