import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

function App() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  // Effect to get user from local storage and set it in context and navigate to last path
  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("user");
      const lastpath = localStorage.getItem("lastPath");

      if (storedUser) {
        setUser({ email: storedUser });
        navigate(lastpath || "/app/anexo-one");
      }
    };
    getUser();
  }, []);

  return (
    <div className="text-gray-700">
      <Outlet />
    </div>
  );
}

export default App;
