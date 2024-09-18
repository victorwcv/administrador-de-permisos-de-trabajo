export interface WorkPermit {
  id: string;
  category?: string;
  codePDT: string;
  typeWork: string;
  startProgHour: string;
  area: string;
  equipment: string;
  description: string;
  people: number;
  authority: string;
  contractor: string;
  executorName: string;
  requirements: string;
  estimatedStartDate: string;
  estimatedEndDate: string;
  approved: string;
  comments?: string;
  openHour: string | null;
  closeHour: string | null;
  date: string;
  coordinates?: Coordinates;
}

export type Coordinates = { x: number | null; y: number | null };
