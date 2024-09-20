import { WorkPermit } from "../../../types";

interface PermitDetailsProps {
  workPermit: WorkPermit;
}

function PermitDetails({ workPermit }: PermitDetailsProps) {
  return (
    <div className="relative h-full flex min-h-fit max-w-[300px] overflow-auto p-4">
      <div className="h-fit w-full">
        <h3 className="font-bold text-xl mt-4 text-center">
          {workPermit.codePDT}
        </h3>
        <div className="px-4 py-2">
          <h5 className="font-semibold mt-1">Tarea</h5>
          <p> {workPermit.description}</p>
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
    </div>
  );
}

export default PermitDetails;
