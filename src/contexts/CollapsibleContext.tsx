import React, { createContext, useContext, useState, ReactNode } from "react";

interface ICollapsibleContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

const CollapsibleContext = createContext<ICollapsibleContextType | undefined>(
  undefined
);

export const useCollapsible = () => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error("useCollapsible must be used within a CollapsibleProvider");
  }
  return context;
};

interface CollapsibleProviderProps {
  children: ReactNode;
}

export const CollapsibleProvider: React.FC<CollapsibleProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <CollapsibleContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </CollapsibleContext.Provider>
  );
};
