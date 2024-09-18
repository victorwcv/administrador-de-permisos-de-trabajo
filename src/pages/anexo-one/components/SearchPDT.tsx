import { useForm } from "react-hook-form";
import { useRef } from "react";
import CustomInput from "../../../components/CustomInput";
import { getDocumentByPDTfromDB } from "../../../firestore";
import { useAppContext } from "../../../context/AppContext";
import { WorkPermit } from "../../../types";
import CustomButton from "../../../components/CustomButton";
import { icons } from "../../../assets/icons/IconProvider";

interface ValuesSubmit {
  codePDT: string;
}

function SearchPDT() {
  const { sharedData, setSharedData } = useAppContext();
  const { register, handleSubmit, watch } = useForm<ValuesSubmit>({
    defaultValues: { codePDT: "" },
  });
  const dataRef = useRef<WorkPermit[]>(sharedData);
  const codePDT = watch("codePDT");

  const filterLocalData = (filterString: string) => {
    if (filterString === "") {
      return [];
    }
    return sharedData.filter((item) =>
      item.codePDT.includes(filterString.toUpperCase())
    );
  };

  const onsubmit = async (values: ValuesSubmit) => {
    // setear Ref para no hacer renderizado
    dataRef.current = sharedData;
    if (!values.codePDT) {
      return;
    }
    const filterString = values.codePDT.toUpperCase();
    const localResults = filterLocalData(filterString);

    if (localResults.length > 0) {
      // Si se encuentran resultados en el estado local, actualiza el estado
      setSharedData(localResults);
      console.log("localResults", localResults);
    } else {
      // Si no se encuentran resultados, busca en la base de datos
      const result = await getDocumentByPDTfromDB(filterString);
      console.log("results from DB", result);

      if (result) {
        setSharedData(result as WorkPermit[]);
      } else {
        console.log("No se encontraron documentos en la base de datos.");
      }
    }
  };

  const handleBlur = () => {
    if (codePDT === "") {
      setSharedData(dataRef.current);
    }
  };

  return (
    <div className="sm:w-auto w-full">
      <form
        className="flex items-start"
        onSubmit={handleSubmit(onsubmit)}
      >
        <CustomInput
          name={"codePDT"}
          register={register("codePDT")}
          placeholder="Buscar PDT"
          inputStyle="rounded-r-none flex-1"
          onBlur={handleBlur}
        />
        <CustomButton
          type="submit"
          icon={<icons.search />}
          btnStyles="h-11 mb-4 w-16 rounded-l-none focus:ring-transparent"
        />
      </form>
    </div>
  );
}

export default SearchPDT;
