import React from "react";
import LoginPage from "./login-page";
import { useMediaQuery } from "shared/global-state/hooks/media-query";
import MobileLoginUI from "./mobile-login";

function LoginUI() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return <MobileLoginUI />;
  }

  return <LoginPage />;
}

export default LoginUI;
