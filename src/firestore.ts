import {
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  QuerySnapshot,
  DocumentData,
  onSnapshot,
  Unsubscribe,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { WorkPermit } from "./types";
import { formatDate } from "./utils/dates";

// Save new entry to Firestore
export const saveNewReportToDB = async (data: Partial<WorkPermit>) => {
  try {
    // Generar el ID manualmente
    const docRef = doc(collection(db, "reports",));
    const id = docRef.id;

    // Agregar el id al objeto data
    const dataWithId = { ...data, id, createdAt: serverTimestamp() };

    // Guardar el documento con el id incluido en el objeto
    await setDoc(docRef, dataWithId);
    console.log("Document written with ID: ", id);

    return dataWithId;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

// Gets all Reports of the days from Firestore
export const getAllReportsOfDayFromDB = async (
  inputDate: string
): Promise<DocumentData[] | undefined> => {
  const q = query(collection(db, "reports"), where("date", "==", inputDate));

  try {
    const dataFromDB: QuerySnapshot<DocumentData> = await getDocs(q);

    // Mapea los documentos a un array de datos
    return dataFromDB.docs.map((doc) => doc.data());
  } catch (e) {
    console.error("Error fetching reports: ", e);
    return undefined;
  }
};

// Listens all changes in Reports of the days from Firestore
export const listenChangesInReportsOfDayFromDB = (
  setData: (data: DocumentData[]) => void
): Unsubscribe => {
  //  gets current date
  const date = formatDate();
  // Queryto get all reports of the day
  const q = query(collection(db, "reports"), where("date", "==", date));

  // listens changes in Reports of the days from Firestore

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(data);
  });

  // return unsubscribe function to stop listening
  return unsubscribe;
};

// Delete Report by ID from Firestore
export const deleteReportfromDB = async (id: string) => {
  try {
    const dogRef = doc(db, "reports", id);
    await deleteDoc(dogRef);
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Update a Report in Firestore
export const updateReportInDB = async (
  id: string,
  updateData: Partial<WorkPermit>
) => {
  try {
    const docRef = doc(db, "reports", id);
    await updateDoc(docRef, updateData as DocumentData);
    console.log(`Document with ID ${id} successfully updated.`);
    return true;
  } catch (e) {
    console.error(`Error updating document with ID ${id}:`, e);
    return false;
  }
};

// Search for PDTs
export const getDocumentByPDTfromDB = async (searchString: string) => {
  try {
    const q = query(
      collection(db, "reports"),
      where("codePDT", "==", searchString)
    );
    const querySnapshot = await getDocs(q);

    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return results;
  } catch (e) {
    console.error("Error fetching documents: ", e);
    return false;
  }
};
