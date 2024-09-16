import { Navigate } from "react-router-dom";
import LoginPage from "../pages/login-page/LoginPage";
// import { useUser } from "../context/UserContext";

function PublicRoute() {
  // const { user } = useUser();

  return true ? <Navigate to="/app/anexo-one" /> : <LoginPage />;
}

export default PublicRoute;
