import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom';
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
  VeriForm,
  Settings,
  VeriScanner,
  Booth,
  SendVeris,
} from '../Pages';

const RecipientsPage = React.lazy(
  () => import('../Pages/Admin/Recipients/RecipientsPage'),
);
const VerisOverviewPage = React.lazy(
  () => import('../Pages/Admin/VerisOverview/VerisOverviewPage'),
);

import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { GeneralLayout } from '../layouts/General';

const PrivateRoutes = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <DashboardLayout />;
};

const AuthRoutes = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/veris" />;
  return <GeneralLayout />;
};

const EventRoutes = () => {
  const prevRoute = useLocation();
  const params = useParams();
  const url = params.eventName || '';
  const token = sessionStorage.getItem(url);
  if (!token)
    return <Navigate to="/booth" state={{ prevRoute, params }} replace />;
  return <EventLayout />;
};

export const Router = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Route>
        <Route path="/veris" element={<PrivateRoutes />}>
          <Route index element={<VerisOverviewPage />} />
          <Route path="create-new-veri" element={<VeriForm />} />
          <Route path=":id" element={<VeriForm />} />
        </Route>
        <Route path="/recipients" element={<PrivateRoutes />}>
          <Route index element={<RecipientsPage />} />
          <Route path="send-veris" element={<SendVeris />} />
          <Route path="send-veris/:veri_id" element={<SendVeris />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route element={<EventRoutes />}>
          <Route path="/event/:eventName" element={<VeriScanner />} />
        </Route>
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/booth" element={<Booth />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
