import { useAppContext } from "../../../context/AppContext";
import { icons } from "../../../assets/icons/IconProvider";

function FullScreenMapInfo() {
  const { sharedData } = useAppContext();

  return (
    <div className="absolute top-16 left-8 bg-black/50 rounded-xl z-10">
      <div className="flex flex-col p-6 gap-10 text-5xl text-white">
        <div className="flex gap-2">
          <icons.permitProgramed />
          <span className="font-bold">{sharedData?.length}</span>
        </div>
        <div className="flex gap-2">
          <icons.permitExecution />
          <span className="font-bold">
            {
              sharedData?.filter((entry) => entry.openHour && !entry.closeHour)
                .length
            }
          </span>
        </div>
        <div className="flex gap-2">
          <icons.permitClosed />
          <span className="font-bold">
            {
              sharedData?.filter((entry) => entry.openHour && entry.closeHour)
                .length
            }
          </span>
        </div>
        <div className="flex gap-2">
          <icons.helmet />
          <span className="font-bold">
            {sharedData
              ?.filter((entry) => entry.openHour && !entry.closeHour)
              .reduce((prev, curr) => prev + curr?.people, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FullScreenMapInfo;
