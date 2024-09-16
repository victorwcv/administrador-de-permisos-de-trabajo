import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir el tipo para el contexto
interface PlotContextType {
  workPermit: any; // Puedes definir un tipo más específico según lo que esperas
  setWorkPermit: React.Dispatch<React.SetStateAction<any>>; // Cambiar 'any' por el tipo adecuado
}

// Crear el contexto con un valor predeterminado que puede ser undefined
const PlotContext = createContext<PlotContextType | undefined>(undefined);

// Crear un proveedor del contexto
interface PlotProviderProps {
  children: ReactNode;
}

export const PlotProvider: React.FC<PlotProviderProps> = ({ children }) => {
  const [workPermit, setWorkPermit] = useState<any>(null); // Cambiar 'any' por el tipo adecuado

  return (
    <PlotContext.Provider value={{ workPermit, setWorkPermit }}>
      {children}
    </PlotContext.Provider>
  );
};

// Custom hook para usar el contexto
export const usePlotContext = (): PlotContextType => {
  const context = useContext(PlotContext);
  if (context === undefined) {
    throw new Error('usePlotContext must be used within a PlotProvider');
  }
  return context;
};
