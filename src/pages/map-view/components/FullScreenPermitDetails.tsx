import { usePlotContext } from "../../../context/PlotContext";
import PermitDetails from "./PermitDetails";
import { icons } from "../../../assets/icons/IconProvider";

function FullScreenPermitDetails() {
  const { workPermit, setWorkPermit } = usePlotContext();
  
  
  return (
    <div className="absolute bottom-16 left-8 bg-black/50 text-white rounded-xl z-10">
      {workPermit ? (
        <>
          {/* close button */}
          <button
            className="absolute p-1 top-4 right-4 font-bold bg-red-500 text-white rounded-sm z-20"
            onClick={() => setWorkPermit(null)}
            title="Cerrar detalles"
          >
            <icons.times />
          </button>

          {/* permit details */}
          <PermitDetails workPermit={workPermit} />
        </>
      ) : (
        <div className="h-full flex flex-col justify-center items-center p-6">
          <icons.locationDot className="w-10 h-10 fill-red-500" />
          <p className="text-xl text-center max-w-60">
            Ver Detalles
          </p>
        </div>
      )}
    </div>
  );
}

export default FullScreenPermitDetails;
