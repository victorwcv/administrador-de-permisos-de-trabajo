import { motion } from "framer-motion";
import { icons } from "../../../assets/icons/IconProvider";
import CustomInput from "../../../components/CustomInput";
import { WorkPermit } from "../../../types";
import { useForm } from "react-hook-form";
import CustomButton from "../../../components/CustomButton";
import { updateReportInDB } from "../../../firestore";
import { useState } from "react";

interface EditTimeFormProps {
  permitData: WorkPermit;
  onClose: () => void;
}

interface StatusProps {
  loading: boolean;
  status: boolean;
  message?: string;
}

interface Coordinates {
  x: number;
  y: number;
}

function EditTimeForm({ onClose, permitData }: EditTimeFormProps) {
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [status, setStatus] = useState<StatusProps>({
    loading: false,
    status: false,
    message: "",
  });
  const [showMap, setShowMap] = useState(false);
  console.log(coordinates);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      openHour: permitData.openHour,
      closeHour: permitData.closeHour,
    },
  });

  const onsubmit = async (values: Partial<WorkPermit>) => {
    setStatus({ loading: true, status: false });
    const result = await updateReportInDB(permitData.id, {
      ...values,
      coordinates,
    });
    console.log({ ...values, coordinates });

    if (result) {
      setStatus({
        loading: false,
        status: true,
        message: "Guardado exitosamente!",
      });
      onClose();
      console.log("saved");
    } else {
      setStatus({
        loading: false,
        status: false,
        message: "Error al guardar, intente de nuevo",
      });
    }
  };

  const toggleMap = () => {
    setShowMap((prev) => !prev);
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    const rect = image.getBoundingClientRect();

    // Calcula las coordenadas como porcentaje del tamaño de la imagen
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
    // { x: xPercent, y: yPercent }
    setCoordinates((prev) => ({ ...prev, x: xPercent, y: yPercent }));
  };

  return (
    <motion.div
      className="h-screen w-screen fixed inset-0 bg-black/20 backdrop-blur-sm z-20 flex overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClose}
    >
      <div
        className="bg-white mx-auto my-auto rounded-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex gap-20 bg-gradient-to-tr from-accent-500 to-accent-600">
          <div className="text-white">
            <span className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">Ingresar horas</h2>
              <h2 className="text-2xl font-semibold">
                <icons.timer />
              </h2>
            </span>

            <p>Ingrese los datos necesarios</p>
          </div>
          <CustomButton
            icon={<icons.times />}
            btnStyles="bg-transparent top-5 py-4 right-5"
            onClick={onClose}
          />
        </div>
        <div className="px-4 pt-4">
          <p>
            <span className="font-semibold">Codigo PDT:</span>
            {permitData.codePDT}
          </p>

          <p>
            <span className="font-semibold">Hora de apertura:</span>
            {permitData.openHour || " N/A"}
          </p>
          <p>
            <span className="font-semibold">Hora de cierre:</span>
            {permitData.closeHour || " N/A"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onsubmit)} className="p-4">
          <CustomInput
            type="time"
            label={"Hora de apertura"}
            name={"openHour"}
            register={register("openHour", {
              required: "Ingrese una hora",
            })}
            errors={errors}
          />

          <CustomInput
            type="time"
            label={"Hora de cierre"}
            name={"closeHour"}
            register={register("closeHour")}
            errors={errors}
          />

          <div className="pt-4">
            <CustomButton
              type="button"
              label="Seleccionar Ubicacion"
              btnStyles="w-full"
              onClick={toggleMap}
            />
            <div className="mt-4">
              <p className="font-semibold">Ubicación Seleccionada:</p>

              <p>
                <span className="font-medium">X:</span>{" "}
                {permitData.coordinates.x || coordinates.x}
              </p>

              <p>
                <span className="font-medium">Y:</span>{" "}
                {permitData.coordinates.y || coordinates.y}
              </p>
            </div>
          </div>
          {showMap && (
            <div className="fixed top-0 left-0 h-screen w-screen justify-center items-center bg-gradient-to-tr from-accent-500 to-accent-700 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 md:h-2/3 w-11/12 h-5/6 p-4 rounded-md bg-white">
                <CustomButton
                  icon={<icons.times />}
                  btnStyles="absolute top-8 right-12 py-4 z-20 bg-red-500"
                  onClick={toggleMap}
                />
                <div className="h-full w-full  overflow-auto">
                  <div
                    style={{
                      position: "relative",
                      width: "max-content",
                      height: "max-content",
                    }}
                  >
                    <img
                      src="/map-pp-transformed2.webp"
                      alt="Descripción"
                      onClick={handleClick}
                      className="w-[1440px] h-[810px]"
                    />
                    {permitData.coordinates && (
                      <p
                        className="absolute text-3xl text-red-500"
                        style={{
                          top: `${permitData.coordinates.y}%`,
                          left: `${permitData.coordinates.x}%`,
                          transform: "translate(-50%, -75%)",
                        }}
                      >
                        <icons.locationDot />
                      </p>
                    )}
                    {coordinates && (
                      <button
                        key={`${coordinates.x}-${coordinates.y}`}
                        className="absolute h-auto rounded-full"
                        style={{
                          top: `${coordinates.y}%`,
                          left: `${coordinates.x}%`,
                          transform: "translate(-50%, -75%)",
                        }}
                      >
                        <p
                          className={`text-3xl ${
                            permitData.typeWork === "Caliente"
                              ? "text-red-500"
                              : "text-cyan-400"
                          }`}
                        >
                          <icons.locationDot />
                        </p>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <CustomButton type="submit" label="Guardar" />
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
    </motion.div>
  );
}

export default EditTimeForm;
