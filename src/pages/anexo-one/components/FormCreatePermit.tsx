import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import { icons } from "../../../assets/icons/IconProvider";
import { formatDate } from "../../../utils/dates";
import { saveNewReportToDB } from "../../../firestore";
import { useState } from "react";
import { WorkPermit } from "../../../types";
import { useAppContext } from "../../../context/AppContext";

interface FormCreatePermitProps {
  onClose: () => void;
}

interface StatusProps {
  loading: boolean;
  status: boolean;
  message?: string;
}

function FormCreatePermit({ onClose }: FormCreatePermitProps) {
  const { setSharedData } = useAppContext();
  const [status, setStatus] = useState<StatusProps>({
    loading: false,
    status: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: "",
      category: "",
      codePDT: "",
      typeWork: "",
      startProgHour: "",
      area: "",
      equipment: "",
      description: "",
      people: 0,
      authority: "",
      contractor: "",
      executorName: "",
      requirements: "",
      estimatedStartDate: "",
      estimatedEndDate: "",
      approved: "",
      comments: "",
      openHour: "",
      closeHour: "",
      date: formatDate(),
      coordinates: { x: null, y: null },
    },
  });

  // Submites the form with the values from the form to create a new permit
  const onSubmit = async (values: Partial<WorkPermit>) => {
    setStatus({ loading: true, status: false });

    const result = await saveNewReportToDB(values);

    if (result) {
      setStatus({
        loading: false,
        status: true,
        message: "Guardado exitosamente!",
      });

      // Actualizar el estado del contexto global si se guardaron los datos correctamente
      setSharedData((prevData) => [...prevData, result] as WorkPermit[]);

      reset();
    } else {
      setStatus({
        loading: false,
        status: false,
        message: "Error al guardar, intente de nuevo",
      });
    }
  };

  const area = [
    "SS.AA. 1",
    "SS.AA. 2",
    "Procesos 1",
    "Procesos 2",
    "Procesos 3",
    "Produccion",
  ];
  const autority = [
    "D. Fernández",
    "L. Ramírez",
    "C. Benítez",
    "J. Soto",
    "E. Vargas",
    "A. Quiroz",
    "T. Ortiz",
    "R. Maldonado",
    "F. Delgado",
    "B. Rojas",
  ];

  const contractor = [
    "TECHSERV",
    "INDUSTRAC",
    "MEGATEC",
    "ECOLOGICA",
    "GEOTEC",
    "CONSTRUCTEC",
    "INGECOM",
    "TERMOPOWER",
  ];

  return (
    <motion.div
      className="h-screen w-screen fixed inset-0 bg-black/20 backdrop-blur-md z-20 select-none flex overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClose}
    >
      <div className="m-auto">
        <div
          className="relative bg-white w-fit h-fit m-2 rounded-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative sm:text-left  text-center mb-8 bg-gradient-to-bl text-white from-accent-500 to-accent-600 p-4">
            <h2 className="text-3xl font-bold text-primary-500">
              Ingresar Nuevo PDT
            </h2>
            <p className="mt-2 text-sm">
              * Completar todos los campos requeridos
            </p>
            <CustomButton
              icon={<icons.times />}
              btnStyles="bg-transparent absolute top-5 py-4 right-5"
              onClick={onClose}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="display flex flex-wrap max-w-5xl justify-center gap-x-4 p-4">
              <CustomInput
                as="select"
                options={["Tipo_2", "Tipo_3", "Tipo_4"]}
                label="Categoria*"
                name="category"
                register={register("category", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                label="Codigo de PDT*"
                name="codePDT"
                register={register("codePDT", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                as="select"
                options={["Caliente", "Frio"]}
                label="Tipo de Trabajo*"
                name="typeWork"
                register={register("typeWork", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                type="time"
                label="Hora Prog. Inicio*"
                name="startProgHour"
                register={register("startProgHour", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                as="select"
                options={area}
                label="Area/Sitio*"
                name="area"
                register={register("area", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                label="Equipo a Intervenir*"
                name="equipment"
                register={register("equipment", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                label="Descrip. de la Tarea*"
                name="description"
                register={register("description", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                type="number"
                label="Num. Trabajadores en ATS*"
                name="people"
                register={register("people", {
                  valueAsNumber: true,
                  required: "Requerido",
                  validate: {
                    min: (value) => (value > 0 ? true : "Número mínimo 1"),
                    max: (value) => (value <= 50 ? true : "Número máximo 50"),
                  },
                })}
                errors={errors}
              />

              <CustomInput
                as="select"
                options={autority}
                label="Autoridad Ejec.*"
                name="authority"
                register={register("authority", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                as="datalist"
                options={contractor}
                label="Emp. Contratista Ejec.*"
                name="contractor"
                register={register("contractor", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                label="Nombre de Ejec.*"
                name="executorName"
                register={register("executorName", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                label="Requerimientos"
                name="requirements"
                register={register("requirements", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                type="date"
                label="Fecha Est. Inicio*"
                name="estimatedStartDate"
                register={register("estimatedStartDate", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                type="date"
                label="Fecha Est. Fin*"
                name="estimatedEndDate"
                register={register("estimatedEndDate", {
                  required: "Requerido",
                })}
                errors={errors}
              />

              <CustomInput
                as="select"
                options={["Aprobado", "Rechazado"]}
                label="Aprobado*"
                name="approved"
                register={register("approved")}
                errors={errors}
              />

              <CustomInput
                label="Comentarios*"
                name="comments"
                register={register("comments")}
                errors={errors}
              />
            </div>

            <div className="flex m-4 justify-end">
              <CustomButton
                label={status.loading ? "Guardando..." : "Guardar"}
                type="submit"
                btnStyles="w-40"
              />
            </div>
          </form>
          {status.status && (
            <p className="absolute left-4 bottom-4 text-sm text-green-500">
              {status.message}
            </p>
          )}
          {!status.status && (
            <p className="absolute left-4 bottom-4 text-sm text-red-500">
              {status.message}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default FormCreatePermit;
