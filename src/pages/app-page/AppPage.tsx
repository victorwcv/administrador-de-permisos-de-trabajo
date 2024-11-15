import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import { useEffect } from "react";
import { getAllReportsOfDayFromDB } from "../../firestore";
import { WorkPermit } from "../../types";
import { formatDate } from "../../utils/dates";
import { useAppContext } from "../../context/AppContext";

function AppPage() {
  const { setSharedData } = useAppContext();

  useEffect(() => {
    getAllReportsOfDayFromDB(formatDate()).then((data) => {
      if (data) {
        setSharedData(data as WorkPermit[]);
      }
    });
  }, []);

  return (
    <section className="relative flex overflow-y-hidden bg-gray-200">
      <SideBar />
      <Outlet />
    </section>
  );
}

export default AppPage;
