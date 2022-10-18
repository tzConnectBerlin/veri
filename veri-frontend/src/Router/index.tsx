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
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgot",
    element: <ForgotPassword />,
  },
  {
    path: "reset",
    element: <ResetPassword />,
  },
]);
