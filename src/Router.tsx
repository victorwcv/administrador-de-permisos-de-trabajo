import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./pages/login-page/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import AnexoOne from "./pages/anexo-one/AnexoOne";
import MapView from "./pages/map-view/MapView";
import AppPage from "./pages/app-page/AppPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "app/",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <AppPage />,
          },
          {
            path: "anexo-one/",
            element: <AnexoOne />,
          },
          {
            path: "map-view/",
            element: <MapView />,
          },
        ],
      },
    ],
  },
]);
