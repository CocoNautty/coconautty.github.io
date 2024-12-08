// ScrollspyContext.js
import React, { createContext, useContext, useState, useRef } from 'react';

const ScrollspyContext = createContext();

export const ScrollspyProvider = ({ children }) => {
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const sectionRefsRef = useRef([]);

  const registerRef = (index, ref) => {
    sectionRefsRef.current[index] = ref;
  };

  return (
    <ScrollspyContext.Provider value={{
      currentElementIndex,
      setCurrentElementIndex,
      sectionRefs: sectionRefsRef.current,
      registerRef
    }}>
      {children}
    </ScrollspyContext.Provider>
  );
};

export const useScrollspy = () => useContext(ScrollspyContext);
