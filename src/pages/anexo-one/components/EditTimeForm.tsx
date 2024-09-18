import { motion } from "framer-motion";
import { icons } from "../../../assets/icons/IconProvider";
import CustomInput from "../../../components/CustomInput";
import { WorkPermit, type Coordinates } from "../../../types";
import { useForm } from "react-hook-form";
import CustomButton from "../../../components/CustomButton";
import { updateReportInDB } from "../../../firestore";
import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";

interface EditTimeFormProps {
  permitData: WorkPermit;
  onClose: () => void;
}

interface StatusProps {
  loading: boolean;
  success: boolean;
  message?: string;
}

function EditTimeForm({ onClose, permitData }: EditTimeFormProps) {
  const { setSharedData } = useAppContext();
  console.log(permitData);

  const [coordinates, setCoordinates] = useState<Coordinates | undefined>();
  const [showMap, setShowMap] = useState(false);
  const [status, setStatus] = useState<StatusProps>({
    loading: false,
    success: false,
    message: "",
  });

  // useForm confiiguration
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      openHour: permitData.openHour,
      closeHour: permitData.closeHour,
      x: permitData.coordinates?.x,
      y: permitData.coordinates?.y,
    },
  });

  //  Submites the form with the new values and updates the global state with the new values if successful saved in the database
  const onsubmit = async (values: any) => {
    const { openHour, closeHour, x, y } = values;
    const newValues = {
      openHour,
      closeHour,
      coordinates: { x, y },
    };

    setStatus({ loading: true, success: false });
    console.log(permitData.id, newValues);

    const result = await updateReportInDB(permitData.id, newValues);

    if (result) {
      setStatus({
        loading: false,
        success: true,
        message: "Guardado exitosamente!",
      });

      // Actualiza el estado global con los datos actualizados
      setSharedData((prevData: WorkPermit[]) => {
        const updatedData = prevData.map((report) =>
          report.id === permitData.id ? { ...report, ...newValues } : report
        );
        return updatedData;
      });
    } else {
      setStatus({
        loading: false,
        success: false,
        message: "Error al guardar",
      });
    }
  };

  // Toggles the visibility of the map
  const toggleMap = () => {
    setShowMap((prev) => !prev);

    if (permitData.coordinates?.x && permitData.coordinates?.y) {
      setCoordinates({
        x: permitData.coordinates?.x,
        y: permitData.coordinates?.y,
      });
    }
  };

  // Place a marker on the map when clicking on the image
  const onImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    const rect = image.getBoundingClientRect();

    // Calcula las coordenadas como porcentaje del tamaño de la imagen
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

    setCoordinates({ x: xPercent, y: yPercent });
    setValue("x", xPercent);
    setValue("y", yPercent);
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
        className="relative bg-white mx-auto my-auto rounded-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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

          {/* Boton para cerrar */}
          <CustomButton
            icon={<icons.times />}
            btnStyles="bg-transparent top-5 py-4 right-5"
            onClick={onClose}
          />
        </div>

        {/* Information of current permit */}
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

        {/* Form to edit time data and coordinates map */}
        <form onSubmit={handleSubmit(onsubmit)} className="p-4">
          <CustomInput
            type="time"
            label={"Hora de apertura"}
            name={"openHour"}
            register={register("openHour", {
              required: "Ingrese hora de apertura",
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
            {/* Button to toggle the map */}
            <CustomButton
              type="button"
              label="Seleccionar Ubicacion"
              btnStyles="w-full"
              onClick={toggleMap}
            />

            {/* Shows coordinates  */}
            <div className="mt-4">
              <p className="font-semibold">Ubicación Seleccionada:</p>
              <p>
                <span className="font-semibold">X: </span>
                <input
                  type="number"
                  {...register("x")}
                  placeholder="N/A"
                  readOnly
                  className="outline-none"
                />
              </p>
              <p>
                <span className="font-semibold">Y: </span>
                <input
                  type="text"
                  {...register("y")}
                  placeholder="N/A"
                  readOnly
                  className="outline-none"
                />
              </p>
            </div>
          </div>

          {/* Map to set or edit coordinates */}
          {showMap && (
            <div className="fixed top-0 left-0 h-screen w-screen justify-center items-center bg-gradient-to-tr from-accent-500 to-accent-700 overflow-hidden z-10">
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
                      onClick={onImageClick}
                      className="w-[1440px] h-[810px]"
                    />
                    {/* Marker */}
                    {coordinates ? (
                      <button
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
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit button */}
          <div className="flex justify-end pt-6">
            <CustomButton type="submit" label="Guardar" />
          </div>
        </form>
        {/* Status message */}
        {status && (
          <p
            className={`absolute left-4 bottom-4 text-sm ${
              status.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default EditTimeForm;
