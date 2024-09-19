import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import AppPage from "../pages/app-page/AppPage";

function PrivateRoute() {
  const { user, setUser } = useUser();
 
  const location = useLocation();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("usuario");
    if (storedUser) {
      setUser({ email: storedUser });
    }
  }, [setUser]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("lastPath", location.pathname);
    }
  }, [location.pathname]);
  
 

  return user ? <AppPage /> : <Navigate to="/" />;
}

export default PrivateRoute;
