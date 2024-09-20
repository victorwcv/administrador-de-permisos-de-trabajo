import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import AppPage from "../pages/app-page/AppPage";

function PrivateRoute() {
  const { user } = useUser();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location.pathname]);

  return user ? <AppPage /> : <Navigate to="/" />;
}

export default PrivateRoute;
