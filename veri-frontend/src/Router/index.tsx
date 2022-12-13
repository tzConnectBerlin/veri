import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../contexts/useAuth';
import { GeneralLayout } from '../layouts/General';
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

const PrivateRoutes = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <DashboardLayout />;
};

const AuthRoutes = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/admin" />;
  return <GeneralLayout />;
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
        <Route path="/admin" element={<PrivateRoutes />}>
          <Route index element={<VerisOverviewPage />} />
          <Route path="veri" element={<VeriForm />} />
          <Route path="veri/:id" element={<VeriForm />} />
          <Route path="recipients" element={<RecipientsPage />} />
          <Route path="send" element={<SendVeris />} />
          <Route path="send/:veri_id" element={<SendVeris />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/booth" element={<Booth />} />
        <Route element={<EventRoutes />}>
          <Route path="/event/:eventName" element={<VeriScanner />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
