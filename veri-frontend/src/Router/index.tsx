import {
  createBrowserRouter,
} from "react-router-dom";
import { Dashboard, ForgotPassword, Landing, Login, Register, NotFound, ResetPassword, User, Veris, Settings } from '../Pages'

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: "admin/",
    element: <Dashboard />,
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
]);