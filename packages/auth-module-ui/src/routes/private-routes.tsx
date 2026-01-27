import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "shared/modules/auth-module";
import { LoadingComponent } from "../components/loader";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuthInstance } from "shared/modules/auth-module/firebase-auth";

const PrivateRoutes = () => {
  const { isLoggedIn, setIsLoggedIn, logoutUser } = useAuth();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const handleLogout = () => {
    logoutUser();
    setIsAuthLoading(false);
  };

  const loginUser = () => {
    setIsLoggedIn(true);
    setIsAuthLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuthInstance, (user) => {
      if (user) {
        loginUser();
      } else {
        handleLogout();
      }
    });
    return () => unsubscribe();
  }, []);

  if (isAuthLoading) return <LoadingComponent />;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
