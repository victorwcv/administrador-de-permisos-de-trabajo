import { WorkPermit } from "../../../types";

interface PermitDetailsProps {
  workPermit: WorkPermit;
}

function PermitDetails({ workPermit }: PermitDetailsProps) {
  return (
    <div className="absolute inset-0 p-4 ">
      <div className="h-full flex flex-col justify-center items-center">
        <h3 className="font-bold text-xl mt-1"> {workPermit.codePDT}</h3>
        <h5 className="font-semibold mt-1">Area</h5>
        <p> {workPermit.area}</p>
        <h5 className="font-semibold mt-1">Ejecutante</h5>
        <p> {workPermit.executorName}</p>
        <h5 className="font-semibold mt-1">Personas</h5>
        <p> {workPermit.people}</p>
        <h5 className="font-semibold mt-1">Hora de apertura</h5>
        <p> {workPermit.openHour}</p>
      </div>
    </div>
  );
}

export default PermitDetails;
