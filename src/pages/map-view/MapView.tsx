import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { listenChangesInReportsOfDayFromDB } from "../../firestore";
import { WorkPermit } from "../../types";
import Map from "./components/Map";
import MapInfo from "./components/MapInfo";
import { PlotProvider } from "../../context/PlotContext";

function MapView() {
  const { setSharedData } = useAppContext();

  useEffect(() => {
    const unsubscribe = listenChangesInReportsOfDayFromDB((data) => {
      setSharedData(data as WorkPermit[]);
    });
    return () => unsubscribe();
  }, [setSharedData]);

  return (
    <div className="flex-1 relative z-10 flex flex-col xl:h-screen h-auto w-screen min-w-[320px] min-h-[850px]">
      {/* top bar */}
      <div className="lg:block hidden w-full h-16 border-b bg-white"></div>
      {/* title */}
      <div className="shadow p-4 bg-white">
        <div className="border-b pb-4 lg:text-left text-center">
          <h2 className="lg:text-3xl text-xl">Ubicación de permisos</h2>
          <p className="lg:text-base text-xs">
            Visualizacion de permisos abiertos en vivo
          </p>
        </div>
        <p className="text-xs pt-1 md:block hidden">
          <Link to={"/app/"} className="text-blue-500">
            Inicio{" "}
          </Link>
          <span>/{" "}Locación de Permisos</span>
        </p>
      </div>

      <div className="flex-1 flex lg:flex-row flex-col m-4 gap-4 ">
        <PlotProvider>
          <Map />
          <MapInfo />
        </PlotProvider>
      </div>
    </div>
  );
}

export default MapView;
