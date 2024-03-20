import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./ui/AppLayout";
import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { CourseDetails } from "./pages/CourseDetails";
import { AboutUs } from "./pages/AboutUs";
import { Settings } from "./components/user/Settings";
import { MyCourses } from "./components/courses/MyCourses";
import ErrorPage from "./ui/ErrorPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/myCourses",
        element: <MyCourses />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
