import React, { createContext, useState, useContext, ReactNode } from 'react';
import { WorkPermit } from '../types';

// Definir el tipo para el contexto
interface AppContextType {
  sharedData: WorkPermit[] ;
  setSharedData: React.Dispatch<React.SetStateAction<WorkPermit[] >>;
}

// Crear el contexto con un valor predeterminado vacío
const AppContext = createContext<AppContextType | undefined>(undefined);

// Crear un proveedor del contexto
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sharedData, setSharedData] = useState<WorkPermit[] >([]);

  return (
    <AppContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
