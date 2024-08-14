import { lazy } from "react";
import { RouteObject } from "react-router";

const MainLayout = lazy(() => import("components/templates/main-layout"));
const NewsFeed = lazy(() => import("pages/news-feed"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <NewsFeed /> }],
  },
];

export default routes;
