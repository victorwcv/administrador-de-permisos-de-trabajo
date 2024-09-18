import { useState } from "react";
import { WorkPermit } from "../../../types";
import { icons } from "../../../assets/icons/IconProvider";
import CustomButton from "../../../components/CustomButton";
import { deleteReportfromDB } from "../../../firestore";
import { useAppContext } from "../../../context/AppContext";

interface TableProps {
  sharedData: WorkPermit[];
  onEditTime: ([]: WorkPermit) => void;
}

const Table = ({ sharedData, onEditTime }: TableProps) => {
  const { setSharedData } = useAppContext();
  const [isActive, setIsActive] = useState<string | null>(null);

  const handleClick = (data: WorkPermit) => {
    onEditTime(data);
    handleRowClick(data.id);
  };

  const handleRowClick = (id: string) => {
    if (isActive === id) {
      setIsActive(null);
    } else {
      setIsActive(id);
    }
  };

  const handleDelete = (id: string) => {
    deleteReportfromDB(id);
    const filteredData = sharedData.filter((item) => item.id !== id);
    setSharedData(filteredData);
  };

  return (
    <table className="table-auto w-full border-collapse mx-auto">
      <thead className="bg-gray-100 text-nowrap text-center sticky top-0 z-20">
        <tr className="text-sm">
          <th>Item</th>
          <th>Categoria</th>
          <th>Código PDT</th>
          <th>
            Tipo de <br /> trabajo
          </th>
          <th>
            Hora Prog.
            <br /> de Inicio
          </th>
          <th>Area/Sitio</th>
          <th>Equipo a Intervenir</th>
          <th>Descripción de la tarea</th>
          <th>Personas</th>
          <th>
            Nombre Autoridad <br />
            Ejecutante
          </th>
          <th>
            Empresa Contratista <br />
            Ejecutante
          </th>
          <th>
            Nombre del <br /> Ejecutante
          </th>
          <th>
            Requerimientos / Facilidades <br /> para realizar las tareas
          </th>
          <th>
            Fecha Estimada <br /> de Inicio
          </th>
          <th>
            Fecha Estimada <br /> de Cierre
          </th>
          <th className="bg-blue-200">Aprobado</th>
          <th className="bg-blue-200">Comentarios</th>
          <th className="bg-amber-200">
            Hora de <br /> Apertura
          </th>
          <th className="bg-amber-200">
            Hora de <br /> Cierre
          </th>
          <th>
            Fecha de <br /> creación
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className="text-center text-sm z-10">
        {sharedData.length > 0 ? (
          sharedData
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )

            .map((item, index) => (
              <tr
                className={`cursor-pointer hover:bg-accent-300 ${
                  isActive === item.id ? "bg-accent-200" : "even:bg-gray-50"
                }`}
                key={index}
                onClick={() => handleClick(item)}
                title={item.codePDT}
              >
                <td>{index + 1}</td>
                <td>{item.category}</td>
                <td>{item.codePDT}</td>
                <td>{item.typeWork}</td>
                <td>{item.startProgHour}</td>
                <td>{item.area}</td>
                <td>{item.equipment}</td>
                <td>{item.description}</td>
                <td>{item.people}</td>
                <td>{item.authority}</td>
                <td>{item.contractor}</td>
                <td>{item.executorName}</td>
                <td>{item.requirements}</td>
                <td>{item.estimatedStartDate}</td>
                <td>{item.estimatedEndDate}</td>
                <td>{item.approved}</td>
                <td>{item.comments}</td>
                <td>{item.openHour || "N/A"}</td>
                <td>{item.closeHour || "N/A"}</td>
                <td>{item.date}</td>
                <td>
                  <div className="flex gap-2">
                    <CustomButton
                      icon={<icons.edit />}
                      btnStyles="bg-blue-500 hover:bg-blue-600 mx-auto"
                      title="Click para editar"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                    <CustomButton
                      icon={<icons.trash />}
                      btnStyles="bg-red-500 hover:bg-red-600 mx-auto "
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      title="Click para eliminar"
                    />
                  </div>
                </td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan={21} className="cell p-2 text-left">
              No se encontraron datos que mostrar...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
