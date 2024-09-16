import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { icons } from "../../assets/icons/IconProvider";
import { handleWheel } from "../../utils/wheelScroll";
import { useAppContext } from "../../context/AppContext";

function MapView() {
  const { sharedData } = useAppContext();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [size, setSize] = useState({ width: 1920, height: 1080 });
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log(sharedData);

  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in") {
      if (size.width >= 2840) return;
      setSize({ width: size.width + 160, height: size.height + 90 });
    } else {
      if (size.width <= 1920) return;
      setSize({ width: size.width - 160, height: size.height - 90 });
    }
  };

  return (
    <div className="flex-1 relative z-10 flex flex-col h-screen w-screen min-w-[320px] min-h-[720px]">
      {/* top bar */}
      <div className="lg:block hide w-full lg:h-16 border-b bg-white"></div>
      {/* title */}
      <div className="shadow p-4 bg-white">
        <div className="border-b pb-4 lg:text-left text-center">
          <h2 className="lg:text-3xl text-xl">Locación de Permisos</h2>
          <p className="lg:text-base text-xs">
            Visualizacion de permisos abiertos en vivo
          </p>
        </div>
        <p className="text-xs pt-1">
          <Link to={"/app/"} className="text-blue-500">
            Inicio{" "}
          </Link>{" "}
          \ <span> Locación de Permisos</span>
        </p>
      </div>

      <div className="flex-1 flex lg:flex-row flex-col m-4 gap-4 ">
        <div
          className={`${
            isFullScreen
              ? "fixed top-0 left-0 h-screen w-screen"
              : "flex-1 relative p-4 overflow-auto bg-white rounded-md shadow-md"
          }`}
        >
          {/* zoom control */}
          <div className="absolute top-12 right-12 z-10 rounded text-white bg-gradient-to-r from-accent-600 to-accent-500 flex flex-col border-2 border-accent-500">
            <button
              onClick={handleZoom.bind(null, "in")}
              className=" text-2xl p-2 border border-accent-500 active:bg-accent-500"
            >
              <icons.zoomIn />
            </button>
            <button
              onClick={handleZoom.bind(null, "out")}
              className=" text-2xl p-2 border border-accent-500 active:bg-accent-500"
            >
              <icons.zoomOut />
            </button>
            <button
              onClick={() => {
                setIsFullScreen(!isFullScreen);
              }}
              className=" text-2xl p-2 border border-accent-500 active:bg-accent-500"
            >
              {isFullScreen ? <icons.fullscreenExit /> : <icons.fullscreen />}
            </button>
          </div>

          {/* map */}
          <div className="absolute inset-0 p-4">
            <div
              ref={scrollRef}
              onWheel={(e) => handleWheel(e, scrollRef)}
              className="overflow-auto w-full h-full"
            >
              <div className="relative w-max h-max">
                <img
                  src="/map-pp-transformed2.webp"
                  alt="Descripción"
                  style={{
                    width: `${size.width.toString()}px`,
                    height: `${size.height.toString()}px`,
                  }}
                />

                {sharedData?.map(
                  (workPermit) =>
                    workPermit.coordinates.x && (
                      <button
                        key={workPermit.id}
                        className="absolute h-auto rounded-full"
                        style={{
                          top: `${workPermit.coordinates.y}%`,
                          left: `${workPermit.coordinates.x}%`,
                          transform: "translate(-50%, -75%)",
                        }}
                        onClick={() => console.log(workPermit)}
                      >
                        <p
                          className={`text-4xl ${
                            workPermit.typeWork === "Caliente"
                              ? "text-red-500"
                              : "text-cyan-400"
                          }`}
                        >
                          <icons.locationDot />
                        </p>
                      </button>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-80 min-h-40 bg-white rounded-md p-4 shadow-md overflow-auto">
          <h2 className="text-xl">Dettalle de Permisos</h2>
        </div>
      </div>
    </div>
  );
}

export default MapView;
