import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import {
  ForgotPassword,
  Landing,
  Login,
  Register,
  NotFound,
  ResetPassword,
  User,
  VerisOverview,
  Settings,
} from "../Pages";

import { DashboardLayout } from "../layouts/Admin";

const PrivateRoutes = () => {
  const auth = { token: true };
  return auth.token ? <DashboardLayout /> : <Navigate to="/login" />;
};

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: "/admin",
    element: <PrivateRoutes />,
    children: [
      {
        index: true,
        element: <VerisOverview />,
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
