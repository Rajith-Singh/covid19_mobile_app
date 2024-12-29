import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CountContextProps {
  count: number;
  incrementCount: () => void;
}

const CountContext = createContext<CountContextProps | undefined>(undefined);

export const CountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount((prev) => prev + 1);

  return (
    <CountContext.Provider value={{ count, incrementCount }}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = (): CountContextProps => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};
