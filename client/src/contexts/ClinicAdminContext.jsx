import React, {createContext, useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {HomeIcon, IdentificationIcon} from "@heroicons/react/24/outline/index.js";
import {CalendarIcon, PencilSquareIcon} from "@heroicons/react/24/outline";

const ClinicAdminContext = createContext(null);

export const useClinic = () => {
  return useContext(ClinicAdminContext);
};

export const ClinicAdminProvider = ({ children }) => {
  const { user } = useAuth();
  const [selectedClinic, setSelectedClinic] = useState(localStorage.getItem('selectedClinic') || "all");
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedClinic', selectedClinic);
  }, [selectedClinic]);

  useEffect(() => {
    if (user && user.roles.includes("ROLE_MANAGER")) {
      const updatedNavigation = [
        { name: "Tableau de bord", href: "/administration/accueil", icon: HomeIcon },
        { name: "Équipe", href: "/administration/equipe", icon: IdentificationIcon },
        { name: "Calendrier d'ouverture", href: "/administration/calendrier-ouverture", icon: CalendarIcon },
        { name: "Informations cabinet", href: "/administration/informations-cabinet", icon: PencilSquareIcon},
      ].map(item => ({
        ...item,
        current: location.pathname === item.href,
      }));

      setNavigation(updatedNavigation);
    }
  }, [user, location]);

  return (
    <ClinicAdminContext.Provider value={{ selectedClinic, setSelectedClinic, isLoaded, navigation }}>
      {isLoaded ? children : null}
    </ClinicAdminContext.Provider>
  );
};

export default ClinicAdminProvider;
