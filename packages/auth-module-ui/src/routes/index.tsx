import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginUI from "../modules/login";
import MagicLinkPage from "../modules/login/magic-link";
import PrivateRoutes from "./private-routes";
import Dashboard from "../modules/dashboard";

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<LoginUI />} />
      <Route path="/magic_link" element={<MagicLinkPage />} />
      <Route path="*" element={<LoginUI />} />
    </Routes>
  );
}

export default AppRoutes;
