import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../contexts/useAuth';
import { DashboardLayout } from '../layouts/Admin';
import { EventLayout } from '../layouts/Event';
import {
  Landing,
  NotFound,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  VerisOverview,
  VeriForm,
  Recipients,
  Settings,
  VeriScanner,
  Booth,
} from '../Pages';
import { AnimatePresence } from 'framer-motion';

const PrivateRoutes = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <DashboardLayout />;
};

const AuthRoutes = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/admin" />;
  return <Login />;
};

const EventRoutes = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <EventLayout />;
};

export const Router = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/admin">
            <Route index element={<VerisOverview />} />
            <Route path="veri" element={<VeriForm />} />
            <Route path="veri/:id" element={<VeriForm />} />
            <Route path="recipients" element={<Recipients />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="/booth" element={<Booth />} />
        <Route element={<EventRoutes />}>
          <Route path="/event/:eventName" element={<VeriScanner />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
