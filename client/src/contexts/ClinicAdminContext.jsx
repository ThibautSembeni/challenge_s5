import React, { createContext, useContext, useState, useEffect } from "react";

const ClinicAdminContext = createContext(null);

export const useClinic = () => {
  return useContext(ClinicAdminContext);
};

export const ClinicAdminProvider = ({ children }) => {
  const [selectedClinic, setSelectedClinic] = useState(localStorage.getItem('selectedClinic') || "all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedClinic', selectedClinic);
  }, [selectedClinic]);

  return (
    <ClinicAdminContext.Provider value={{ selectedClinic, setSelectedClinic, isLoaded }}>
      {isLoaded ? children : null}
    </ClinicAdminContext.Provider>
  );
};

export default ClinicAdminProvider;
