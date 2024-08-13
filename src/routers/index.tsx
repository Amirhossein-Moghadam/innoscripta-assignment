import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

const Routers = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Routers;
