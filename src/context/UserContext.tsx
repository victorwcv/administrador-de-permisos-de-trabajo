import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define la estructura del usuario
interface User {
  email: string;
}

// Define el contexto y el valor inicial (puede ser null al inicio si no hay un usuario logueado)
interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Crea el contexto del usuario con valores por defecto
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Hook para usar el contexto en los componentes
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }
  return context;
};

// Proveedor del contexto del usuario
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
