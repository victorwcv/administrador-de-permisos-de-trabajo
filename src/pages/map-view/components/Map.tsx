import { useRef, useState } from "react";
import { icons } from "../../../assets/icons/IconProvider";
import { handleWheel } from "../../../utils/wheelScroll";
import { useAppContext } from "../../../context/AppContext";
import { usePlotContext } from "../../../context/PlotContext";

function Map() {
  const { sharedData } = useAppContext();
  const { setWorkPermit } = usePlotContext();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [size, setSize] = useState({ width: 1920, height: 1080 });
  const scrollRef = useRef<HTMLDivElement>(null);

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
                workPermit?.openHour && !workPermit?.closeHour && (
                  <div
                    key={workPermit.id}
                    className="absolute h-auto rounded-full flex flex-col items-center justify-center cursor-pointer"
                    style={{
                      top: `${workPermit.coordinates?.y}%`,
                      left: `${workPermit.coordinates?.x}%`,
                      transform: "translate(-50%, -75%)",
                    }}
                    onClick={() => {
                      console.log(workPermit);
                      setWorkPermit(workPermit);
                    }}
                    title={workPermit.codePDT + " " + "Click para ver detalles"}
                  >
                    <p
                      className={`text-3xl ${
                        workPermit.typeWork === "Caliente"
                          ? "text-red-500"
                          : "text-cyan-400"
                      }`}
                    >
                      <icons.locationDot />
                    </p>

                    <small className="text-sm text-green-500 inline-flex items-center gap-1 text-s">
                      <strong>{workPermit.people}</strong> <icons.helmet />
                    </small>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
