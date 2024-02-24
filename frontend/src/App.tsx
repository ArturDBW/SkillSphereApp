import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./ui/AppLayout";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
