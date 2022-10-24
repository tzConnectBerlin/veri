import { Route, Routes, Navigate } from 'react-router-dom';
// import useAuth from '../contexts/useAuth';
import { DashboardLayout } from '../layouts/Admin';
import {
  Landing,
  NotFound,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  VerisOverview,
  User,
  Settings,
} from '../Pages';
// As the router is wrapped with the provider,
// we can use our hook to check for a logged in user.

const PrivateRoutes = () => {
  const user = {};
  if (!user) return <Navigate to="/login" />;
  return <DashboardLayout />;
};

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/admin" element={<VerisOverview />} />
        <Route path="/profile" element={<User />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};
