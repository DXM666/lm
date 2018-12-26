import * as pages from "./pages";

export const routes = [
  { path: "/login", exact: true, component: pages.Login },
  { path: "/main", component: pages.MainLayout }
];
