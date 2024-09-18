import { useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { AnimatePresence } from "framer-motion";
import { icons } from "../../assets/icons/IconProvider";
import { Link } from "react-router-dom";
import Table from "./components/Table";
import FormCreatePermit from "./components/FormCreatePermit";
import CustomButton from "../../components/CustomButton";
import { WorkPermit } from "../../types";
import EditTimeForm from "./components/EditTimeForm";
import FilterSection from "./components/FilterSection";
import SearchPDT from "./components/SearchPDT";
import { handleWheel } from "../../utils/wheelScroll";

function AnexoOne() {
  const { sharedData } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditTimeFormOpen, setIsEditTimeFormOpen] =
    useState<WorkPermit | null>(null);
  const openFileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleFileOpen = () => {
    if (openFileRef.current) {
      openFileRef.current.click();
    }
  };

  const handleCloseTimeForm = () => {
    setIsEditTimeFormOpen(null);
  };

  return (
    <div className="flex-1 relative z-10 flex flex-col h-screen w-screen min-w-[320px] min-h-[720px]">
      {/* top bar */}
      <div className=" w-full lg:h-16 border-b bg-white"></div>

      {/* title */}
      <div className="shadow p-4 bg-white">
        <div className="border-b pb-4 lg:text-left text-center">
          <h2 className="lg:text-3xl text-xl">Anexo 1</h2>
          <p className="lg:text-base text-xs">
            Gestión de apertura de permisos
          </p>
        </div>
        <p className="text-xs pt-1">
          <Link to={"/app/"} className="text-blue-500">
            Inicio{" "}
          </Link>
          <span>/ Anexo 1</span>
        </p>
      </div>

      {/* filters */}
      <FilterSection />

      {/* table */}
      <div className="flex-1 flex flex-col bg-white p-4 mx-4 mb-4 rounded shadow overflow-auto">
        {/* buttons and search input */}
        <div className="flex flex-wrap gap-2 items-baseline md:justify-between justify-center">
          <div className="sm:w-full w-auto flex flex-wrap justify-between items-start gap-2">
            <div className="flex flex-wrap sm:w-auto w-full gap-2">
              <input ref={openFileRef} type="file" className="hidden" />
              <CustomButton
                label="Importar Excel"
                icon={<icons.documentText />}
                onClick={handleFileOpen}
                btnStyles="sm:w-auto w-full h-11 px-4"
              />

              <CustomButton
                label="Crear nuevo permiso"
                icon={<icons.plus />}
                onClick={handleFormOpen}
                btnStyles="sm:w-auto w-full h-11 px-4"
              />
            </div>

            <SearchPDT />
          </div>
        </div>
        <div
          ref={scrollRef}
          onWheel={(e) => handleWheel(e, scrollRef)}
          className="flex-1 overflow-auto border"
        >
          <Table sharedData={sharedData} onEditTime={setIsEditTimeFormOpen} />
        </div>
      </div>
      <AnimatePresence>
        {isFormOpen && <FormCreatePermit onClose={handleFormOpen} />}
      </AnimatePresence>
      <AnimatePresence>
        {isEditTimeFormOpen && (
          <EditTimeForm
            onClose={handleCloseTimeForm}
            permitData={isEditTimeFormOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default AnexoOne;
