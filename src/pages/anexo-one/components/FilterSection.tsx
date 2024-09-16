import { AnimatePresence, motion } from "framer-motion";
import { icons } from "../../../assets/icons/IconProvider";
import { useRef, useState } from "react";
import CustomButton from "../../../components/CustomButton";
import { WorkPermit } from "../../../types";
import { useAppContext } from "../../../context/AppContext";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/CustomInput";
import { getAllReportsOfDayFromDB } from "../../../firestore";
import { formatDate } from "../../../utils/dates";

interface ValuesSubmit {
  date: string;
}

function FilterSection() {
  const { sharedData, setSharedData } = useAppContext();
  const [isFilterTabOpen, setIsFilterTabOpen] = useState<boolean>(false);
  // Ref para evitar el re-render de los datos
  const dataRef = useRef<WorkPermit[]>(sharedData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: formatDate(),
    },
  });

  const onSubmit = async (values: ValuesSubmit) => {
    // Si no hay fecha, no hace nada
    if (!values.date) {
      return;
    }

    // Si la fecha es la actual, restaura los datos desde la referencia
    if (formatDate() === values.date) {
      setSharedData(dataRef.current);
      return;
    }

    // Obtener los datos para la fecha específica
    const result = await getAllReportsOfDayFromDB(values.date);
    if (result) {
      dataRef.current = sharedData;
      setSharedData(result as WorkPermit[]);
    }
  };

  return (
    <div>
      <div className="bg-white m-4 shadow rounded">
        <div className="w-full flex items-center gap-4 px-6 py-3 border-b">
          <icons.filter />
          <p
            className="text-lg font-bold cursor-pointer"
            onClick={() => setIsFilterTabOpen(!isFilterTabOpen)}
          >
            Filtro por fecha de creación
          </p>
          <motion.button
            className="ml-auto p-1 outline-none"
            onClick={() => setIsFilterTabOpen(!isFilterTabOpen)}
            animate={{ rotate: isFilterTabOpen ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <icons.chevronDown />
          </motion.button>
        </div>
        <AnimatePresence>
          {isFilterTabOpen && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "fit-content", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="py-2 px-4">
                <p className="font-bold">Fecha de creacion</p>
                <form
                  className="flex flex-wrap md:justify-start justify-center items-center gap-x-4 mt-2 mb-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <CustomInput
                    type="date"
                    name="date"
                    register={register("date", {
                      required: "Ingrese una fecha",
                    })}
                    errors={errors}
                    label=""
                    inputStyle=""
                  />

                  <CustomButton
                    type="submit"
                    label="Aplicar"
                    icon={<icons.filter />}
                    btnStyles="mb-4"
                  />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FilterSection;
