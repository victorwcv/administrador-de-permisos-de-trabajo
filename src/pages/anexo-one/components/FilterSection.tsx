import { getAllReportsOfDayFromDB } from "../../../firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { WorkPermit } from "../../../types";
import { icons } from "../../../assets/icons/IconProvider";
import CustomButton from "../../../components/CustomButton";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/CustomInput";
import { formatDate } from "../../../utils/dates";

interface ValuesSubmit {
  date: string;
}

function FilterSection() {
  const { sharedData, setSharedData } = useAppContext();
  const [filterArea, setFilterArea] = useState("");
  const [isFilterTabOpen, setIsFilterTabOpen] = useState<boolean>(false);
  // Ref para evitar el re-render de los datos
  const dataRef = useRef<WorkPermit[] | null>(null);

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

    // setear Ref para no hacer renderizado
    if (!dataRef.current) {
      dataRef.current = sharedData;
    }

    // Si la fecha es la actual, restaura los datos desde la referencia
    if (formatDate() === values.date) {

      setSharedData(dataRef.current);
      dataRef.current = null;
    } else {
      // Si la fecha es distinta, actualiza los datos desde la base de datos
      const result = await getAllReportsOfDayFromDB(values.date);
      if (result) {
        setSharedData(result as WorkPermit[]);
      }
    }
  };

  const HandleFilterByArea = () => {
    if (!dataRef.current) {
      dataRef.current = sharedData;
    }
    if (filterArea === "") {
      setSharedData(dataRef.current);
      dataRef.current = null;
      return;
    }

    const filteredData = dataRef.current.filter(
      (item) => item.area === filterArea
    );
    setSharedData(filteredData);
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
            Filtrar PDTs
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
              <div className="sm:w-auto w-full flex sm:justify-start justify-center flex-wrap py-2 px-4 gap-x-8">
                <div className="sm:w-auto w-full">
                  <p className="font-bold">Por fecha de creacion</p>
                  <form
                    className="flex flex-wrap justify-center items-center gap-x-1 mt-2 mb-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <CustomInput
                      type="date"
                      name="date"
                      register={register("date", {
                        required: "Ingrese una fecha",
                      })}
                      errors={errors}
                    />

                    <CustomButton
                      type="submit"
                      label="Aplicar"
                      icon={<icons.filter />}
                      btnStyles="mb-4"
                    />
                  </form>
                </div>
                <div className="sm:w-auto w-full">
                  <p className="font-bold">Por Area/Sitio</p>
                  <form
                    className="flex flex-wrap justify-center items-center gap-x-1 mt-2 mb-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      HandleFilterByArea();
                    }}
                  >
                    <CustomInput
                      as="select"
                      options={[
                        "SS.AA. 1",
                        "SS.AA. 2",
                        "Procesos 1",
                        "Procesos 2",
                        "Procesos 3",
                        "Produccion",
                      ]}
                      value={filterArea}
                      name="area"
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFilterArea(e.target.value)
                      }
                    />

                    <CustomButton
                      type="submit"
                      label="Aplicar"
                      icon={<icons.filter />}
                      btnStyles="mb-4"
                    />
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FilterSection;
