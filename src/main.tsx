import { RouterProvider } from "react-router-dom";
import { router } from "./Router.tsx";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </AppProvider>
);
