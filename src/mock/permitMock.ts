// Función para generar un valor aleatorio de una lista dada
const getRandomValue = <T>(values: T[]): T =>
  values[Math.floor(Math.random() * values.length)];

// Funciones específicas para cada campo

export const generateRandomCategory = () => {
  const categories = ["Tipo_2", "Tipo_3", "Tipo_4"];
  return getRandomValue(categories);
};

export const generateRandomCodePDT = () => {
  let pdt = "";
  pdt = pdt.padStart(5, "PDT-");
  return pdt + Math.floor(Math.random() * 10000);
};

export const generateRandomTypeWork = () => {
  const types = ["Caliente", "Frio"];
  return getRandomValue(types);
};

export const generateRandomStartProgHour = () => {
  const hours = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];
  return getRandomValue(hours);
};

export const generateRandomArea = () => {
  const areas = [
    "SS.AA. 1",
    "SS.AA. 2",
    "Procesos 1",
    "Procesos 2",
    "Procesos 3",
    "Produccion",
  ];
  return getRandomValue(areas);
};

export const generateRandomEquipment = () => {
  const equipments = [
    "Crane",
    "Excavator",
    "Forklift",
    "Generator",
    "Welding Machine",
    "Drill",
    "Saw",
    "Pump",
    "Compressor",
    "Loader",
  ];
  return getRandomValue(equipments);
};

export const generateRandomDescription = () => {
  const descriptions = [
    "Routine inspection of equipment",
    "Emergency repair required",
    "Maintenance task scheduled",
    "Installation of new system",
    "Cleaning of workspace",
    "Testing equipment functionality",
    "Upgrade of existing system",
    "Removal of obsolete parts",
    "Safety checks and protocols",
    "Contractor supervision and management",
  ];
  return getRandomValue(descriptions);
};

export const generateRandomAuthority = () => {
  const authorities = [
    "F. Torres",
    "M. Navarrete",
    "V. Lajo",
    "R. Martinez",
    "A. Gil",
    "L. Sandoval",
    "I. Munarriz",
    "W. Kianman",
    "V. Lajo",
    "M. Navarrete",
    "J. Cardenas",
    "E. Martinez",
  ];
  return getRandomValue(authorities);
};

export const generateRandomContractor = () => {
  const contractors = [
    "APPLUS END",
    "APTIM .",
    "APTIM I/C",
    "Aptim CBM.",
    "Aptim Elect.",
    "Aptim Meca.",
    "Aptim SSGG.",
    "CONFIPETROL",
    "CONFIP / PROY",
    "CPPQ",
    "ICCE",
    "OTECRIERA",
    "PROSECOR",
    "SHERWIN",
    "SOLAR TURBINES",
    "TAMOIN",
  ];
  return getRandomValue(contractors);
};

export const generateRandomExecutorName = () => {
  const names = [
    "John Doe",
    "Jane Smith",
    "Michael Brown",
    "Emily Davis",
    "Chris Johnson",
    "Sarah Wilson",
    "David Lee",
    "Laura Martinez",
    "James Anderson",
    "Elizabeth Taylor",
  ];
  return getRandomValue(names);
};

export const generateRandomPeople = () => {
  return Math.floor(Math.random() * 8 + 2); // Número aleatorio entre 2 y 10
};

export const generateRandomRequirements = () => {
  const requirements = [
    "Equipo de seguridad requerido",
    "Autorización necesaria",
    "Lista de verificación de equipo",
    "Entrenamiento requerido",
    "Aprobación del permiso",
    "Autorización ambiental",
    "Asignación de presupuesto",
    "Adquisición de materiales",
    "Especificaciones técnicas",
    "Inspección antes del trabajo",
  ];

  return getRandomValue(requirements);
};

export const generateRandomApproved = () => {
  const approvals = ["Aprobado", "Rechazado"];
  return getRandomValue(approvals);
};

export const generateRandomComments = () => {
  const comments = [
    "Work completed successfully",
    "Minor issues encountered",
    "No issues reported",
    "Delays expected",
    "Additional resources required",
    "Inspection needed",
    "Pending review",
    "Feedback required",
    "Final approval pending",
    "Work in progress",
  ];
  return getRandomValue(comments);
};

export const generateRandomOpenHour = () => {
  const hours = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];
  return getRandomValue(hours);
};

import { WorkPermit } from "../types";

export const generateRandomWorkPermit = (): Partial<WorkPermit> => ({
  category: generateRandomCategory(),
  codePDT: generateRandomCodePDT(),
  typeWork: generateRandomTypeWork(),
  startProgHour: generateRandomStartProgHour(),
  area: generateRandomArea(),
  equipment: generateRandomEquipment(),
  description: generateRandomDescription(),
  estimatedStartDate: "",
  estimatedEndDate: "",
  authority: generateRandomAuthority(),
  contractor: generateRandomContractor(),
  executorName: generateRandomExecutorName(),
  requirements: generateRandomRequirements(),
  approved:  "Aprobado",
  comments: generateRandomComments(),
  openHour: null,
  closeHour: null,
});
