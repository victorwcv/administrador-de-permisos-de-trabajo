import { Navigate } from "react-router-dom";
import AppPage from "../pages/app-page/AppPage";
// import { useUser } from "../context/UserContext";

function PrivateRoute() {
  // const { user } = useUser();
  return true ? <AppPage /> : <Navigate to="/" />;
}

export default PrivateRoute;
