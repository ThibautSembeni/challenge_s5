import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useLocation } from "react-router-dom";
import {
  CurrencyEuroIcon,
  HomeIcon,
  IdentificationIcon,
  TicketIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline/index.js";
import {getAllClinics} from "../api/clinic/Clinic.jsx";

const SuperAdminContext = createContext(null);

export function useSuperAdmin() {
  return useContext(SuperAdminContext);
}

export const SuperAdminProvider = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [navigation, setNavigation] = useState([]);
  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    fetchInactiveClinics().then(r => r);
  }, []);

  useEffect(() => {
    if (user && user.roles.includes("ROLE_ADMIN")) {
      const updatedNavigation = [
        { name: "Tableau de bord", href: "/full-administration/accueil", icon: HomeIcon },
        { name: "Vétérinaires", href: "/full-administration/veterinaires", icon: IdentificationIcon },
        { name: "Cabinets", href: "/full-administration/cabinets", icon: HomeIcon, clinicStayValidation: inactiveCount },
        { name: "Utilisateurs", href: "/full-administration/utilisateurs", icon: UserGroupIcon },
        { name: "Animaux", href: "/full-administration/animaux", icon: TicketIcon },
        { name: "Paiements", href: "/full-administration/paiements", icon: CurrencyEuroIcon },
      ].map(item => ({
        ...item,
        current: location.pathname === item.href,
      }));

      setNavigation(updatedNavigation);
    }
  }, [user, location, inactiveCount]);

  const fetchInactiveClinics = async () => {
    try {
      const response = await getAllClinics();

      setInactiveCount(
        response.data["hydra:member"].filter(cabinet => cabinet.isActif).length
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  }

  return (
    <SuperAdminContext.Provider value={{navigation}}>
      {children}
    </SuperAdminContext.Provider>
  );
};
