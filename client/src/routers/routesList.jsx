import Login from "@/pages/Auth/Login.jsx";
import Register from "@/pages/Auth/Register.jsx";
import Account from "@/pages/Auth/Account.jsx";
import Home from "@/pages/Home/Home.jsx";
import SearchResult from "@/pages/Search/Search.jsx";
import Clinic from "@/pages/Clinic/Clinic.jsx";
import Veterinarian from "@/pages/Clinic/Veterinarian.jsx";
import ClinicAdminHome from "@/pages/Admin/Clinic/Home.jsx";
import Teams from "@/pages/Admin/Clinic/Teams.jsx";
import Pet from "@/pages/Admin/Clinic/Pet.jsx";
import Information from "@/pages/Admin/Clinic/Information.jsx";
import Appointment from "@/pages/Admin/Clinic/Appointment.jsx";
import ClinicAdminSchedule from "@/pages/Admin/Clinic/Schedule.jsx";
import NotFound404 from "@/pages/NotFound404.jsx";
import InformationRegister from "@/pages/PracticienRegister/InformationRegister.jsx";
import ClinicRegisterInformations from "@/pages/PracticienRegister/ClinicRegisterInformations.jsx";
import MonEspace from "@/pages/MonEspace/index.jsx";
import Appointments from "@/pages/Appointment/index.jsx";
import BookingAppointment from "@/pages/BookingAppointment/index.jsx";
import { Outlet } from "react-router-dom";
import Logout from "@/pages/Auth/Logout.jsx";
import Manage from "@/pages/Manage/index.jsx";
const list = [
  {
    path: "",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "inscription/informations",
        element: <InformationRegister />,
      },
      {
        path: "inscription/cabinet/information",
        element: <ClinicRegisterInformations />,
      },
      {
        path: "a-propos",
        element: <h1>About</h1>,
      },
      {
        path: "search/:city",
        element: <SearchResult />,
      },
      {
        path: "cabinet/:uuid",
        element: <Clinic />,
      },
      {
        path: "veterinaire/:uuid",
        element: <Veterinarian />,
      },
      {
        path: "mon-compte",
        element: <Account />,
        roles: ["ROLE_USER"],
      },
      {
        path: "mes-rendez-vous",
        element: <Appointments />,
        roles: ["ROLE_USER"],
      },
      {
        path: "mon-espace",
        roles: ["ROLE_USER"],
        children: [
          {
            path: "",
            element: <MonEspace />,
            roles: ["ROLE_USER"],
          },
          {
            path: "mes-animaux",
            element: <MonEspace />,
            roles: ["ROLE_USER"],
          },
        ],
      },
      {
        path: "booking-appointment/:uuid",
        element: <BookingAppointment />,
        roles: ["ROLE_USER"],
      },
    ],
  },
  ////// CLINIC ADMINISTRATION //////
  {
    path: "administration",
    children: [
      {
        path: "accueil",
        element: <ClinicAdminHome />,
        roles: ["ROLE_MANAGER", "ROLE_VETERINARIAN"],
      },
      {
        path: "equipe",
        element: <Teams />,
        roles: ["ROLE_MANAGER"],
      },
      {
        path: "calendrier-ouverture",
        element: <ClinicAdminSchedule />,
        roles: ["ROLE_MANAGER"],
      },
      {
        path: "rendez-vous",
        element: <Appointment />,
        roles: ["ROLE_MANAGER", "ROLE_VETERINARIAN"],
      },
      {
        path: "animaux",
        element: <Pet />,
        roles: ["ROLE_MANAGER", "ROLE_VETERINARIAN"],
      },
      {
        path: "informations-cabinet",
        element: <Information />,
        roles: ["ROLE_MANAGER"],
      },
    ],
  },
  {
    path: "manage",
    element: <Outlet />,
    roles: ["ROLE_VETERINARIAN"],
    children: [
      {
        path: "",
        element: <Manage />,
        roles: ["ROLE_VETERINARIAN"],
      },
      {
        path: "calendar",
        element: <Manage type={"calendar"} />,
        roles: ["ROLE_VETERINARIAN"],
      },
      {
        path: "services",
        element: <Manage type={"services"} />,
        roles: ["ROLE_VETERINARIAN"],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
];

export default list;
