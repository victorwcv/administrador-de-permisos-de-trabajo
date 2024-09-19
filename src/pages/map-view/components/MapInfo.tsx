import { icons } from "../../../assets/icons/IconProvider";
import { useAppContext } from "../../../context/AppContext";
import { usePlotContext } from "../../../context/PlotContext";
import { formatDate, formatDayMonthYear } from "../../../utils/dates";
import PermitDetails from "./PermitDetails";

function MapInfo() {
  const { sharedData } = useAppContext();
  const { workPermit, setWorkPermit } = usePlotContext();

  return (
    <div className="flex lg:flex-col sm:flex-row flex-col min-w-80 md:min-h-fit bg-white rounded-md shadow-md overflow-hidden">
      {/* title and date */}

      <div className="text-center p-4 text-white bg-gradient-to-tr from-accent-500 to-accent-600 ">
        <h2 className="text-center font-bold text-2xl">Detalles</h2>
        <p>{formatDayMonthYear(formatDate())}</p>
      </div>
      <br />
      <div className=" flex-1 flex lg:flex-col sm:flex-row flex-col justify-center items-center gap-8">
        {/* general info */}
        <div className="p-4">
          <ul className="text-center">
            <li className="mb-1 flex justify-between">
              <span className=" text-left font-semibold">
                Permisos registrados:{" "}
              </span>
              <span>{sharedData?.length}</span>
            </li>

            <li className="mb-1 flex justify-between">
              <span className=" text-left font-semibold">
                Permisos abiertos:{" "}
              </span>
              {sharedData?.filter((entry) => entry.openHour).length}
            </li>
            <li className="mb-1 flex justify-between">
              <span className=" text-left font-semibold">
                Permisos por abrir:{" "}
              </span>
              {
                sharedData?.filter(
                  (entry) => !entry.openHour && !entry.closeHour
                ).length
              }
            </li>

            <li className="mb-1 flex justify-between">
              <span className=" text-left font-semibold">
                Permisos cerrados:{" "}
              </span>
              {
                sharedData?.filter((entry) => entry.openHour && entry.closeHour)
                  .length
              }
            </li>

            <li className="mb-1 flex justify-between">
              <span className=" text-left font-semibold">
                Permisos en ejecucion:{" "}
              </span>
              {
                sharedData?.filter(
                  (entry) => entry.openHour && !entry.closeHour
                ).length
              }
            </li>
            <li className="mb-1 flex justify-between">
              <p className="font-semibold">Total personas en ejecucion: </p>
              {sharedData
                ?.filter((entry) => entry.openHour && !entry.closeHour)
                .reduce((prev, curr) => prev + curr?.people, 0)}
            </li>
          </ul>
        </div>

        {/* permit selected details */}
        <div className="relative flex-1 w-full bg-white/80 rounded-md">
          {workPermit ? (
            <>
              {/* close button */}
              <button
                className="absolute py-2 top-4 right-4 font-bold bg-red-500 text-white px-2 rounded-sm z-10"
                onClick={() => setWorkPermit(null)}
                title="Cerrar detalles"
              >
                <icons.times />
              </button>

              {/* permit details */}
              <PermitDetails workPermit={workPermit} />
            </>
          ) : (
            <div className="h-full flex flex-col justify-center items-center py-4">
              <icons.locationDot className="w-16 h-16 fill-red-500" />
              <p className=" font-semibold text-center max-w-60">
                Seleccione un permiso para ver los detalles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MapInfo;
