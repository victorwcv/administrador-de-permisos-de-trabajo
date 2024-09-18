import React, { createContext, useState, useContext, ReactNode } from "react";
import { WorkPermit } from "../types";

// defines the types and creates the context
interface PlotContextType {
  workPermit: WorkPermit | null;
  setWorkPermit: React.Dispatch<React.SetStateAction<WorkPermit | null>>;
}

const PlotContext = createContext<PlotContextType | null>(null);

// creates a provider for the PlotContext
interface PlotProviderProps {
  children: ReactNode;
}

export const PlotProvider: React.FC<PlotProviderProps> = ({ children }) => {
  const [workPermit, setWorkPermit] = useState<WorkPermit | null>(null);

  return (
    <PlotContext.Provider value={{ workPermit, setWorkPermit }}>
      {children}
    </PlotContext.Provider>
  );
};

// custom hook to use the PlotContext
export const usePlotContext = (): PlotContextType => {
  const context = useContext(PlotContext);
  if (context === null) {
    throw new Error("usePlotContext must be used within a PlotProvider");
  }
  return context;
};
