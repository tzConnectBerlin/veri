import { createBrowserRouter } from "react-router-dom";
import {
  ForgotPassword,
  Landing,
  Login,
  Register,
  NotFound,
  ResetPassword,
  User,
  Veris,
  Settings,
} from "../Pages";

import { DashboardLayout } from "../layouts/Admin";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
    children: [
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Veris />,
      },
      {
        path: "profile",
        element: <User />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
