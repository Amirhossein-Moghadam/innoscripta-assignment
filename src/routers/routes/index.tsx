import { lazy } from "react";
import { RouteObject } from "react-router";

const Layout = lazy(() => import("components/Layout"));
const Landing = lazy(() => import("pages/landing"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Landing /> }],
  },
];

export default routes;
