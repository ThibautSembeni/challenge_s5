import Login from "@/pages/Auth/Login.jsx";
import Register from "@/pages/Auth/Register.jsx";
import Account from "@/pages/Auth/Account.jsx";
import Home from "@/pages/Home/Home.jsx";
import SearchResult from "@/pages/Search/Search.jsx";
import Clinic from "@/pages/Clinic/Clinic.jsx";
import Veterinarian from "@/pages/Clinic/Veterinarian.jsx";
import ClinicAdminHome from "@/pages/Admin/Clinic/Home.jsx";
import Teams from "@/pages/Admin/Clinic/Teams.jsx";
import Information from "@/pages/Admin/Clinic/Information.jsx";
import FullAdminHome from "@/pages/Admin/SuperAdmin/Home.jsx";
import FullAdminVeterinarians from "@/pages/Admin/SuperAdmin/Veterinarians.jsx";
import FullAdminClinics from "@/pages/Admin/SuperAdmin/Clinics.jsx";
import FullAdminPets from "@/pages/Admin/SuperAdmin/Pets.jsx";
import FullAdminUsers from "@/pages/Admin/SuperAdmin/Users.jsx";
import FullAdminPayments from "@/pages/Admin/SuperAdmin/Payments.jsx";
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
import ClinicRegisterPayment from "@/pages/PracticienRegister/ClinicRegisterPayment.jsx";
import ClinicRegisterPaymentConfirmation from "@/pages/PracticienRegister/ClinicRegisterPaymentConfirmation.jsx";

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
        path: "inscription/cabinet/paiement",
        element: <ClinicRegisterPayment />,
      },
      {
        path: "inscription/cabinet/confirmation",
        element: <ClinicRegisterPaymentConfirmation />,
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
    element: <Outlet />,
    context: 'clinicAdmin',
    children: [
      {
        path: "accueil",
        element: <ClinicAdminHome />,
        roles: ["ROLE_MANAGER"],
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
        path: "informations-cabinet",
        element: <Information />,
        roles: ["ROLE_MANAGER"],
      },
    ],
  },
  ////// CLINIC SUPER ADMINISTRATION //////
  {
    path: "full-administration",
    element: <Outlet />,
    context: 'superAdmin',
    children: [
      {
        path: "accueil",
        element: <FullAdminHome />,
        roles: ["ROLE_ADMIN"],
      },
      {
        path: "veterinaires",
        element: <FullAdminVeterinarians />,
        roles: ["ROLE_ADMIN"],
      },
      {
        path: "cabinets",
        element: <FullAdminClinics />,
        roles: ["ROLE_ADMIN"],
      },
      {
        path: "paiements",
        element: <FullAdminPayments />,
        roles: ["ROLE_ADMIN"],
      },
      {
        path: "animaux",
        element: <FullAdminPets />,
        roles: ["ROLE_ADMIN"],
      },
      {
        path: "utilisateurs",
        element: <FullAdminUsers />,
        roles: ["ROLE_ADMIN"],
      },
    ],
  },
  {
    path: "gestion",
    element: <Outlet />,
    roles: ["ROLE_VETERINARIAN"],
    children: [
      {
        path: "",
        element: <Manage />,
        roles: ["ROLE_VETERINARIAN"],
      },
      {
        path: "calendrier",
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
    path: "connexion",
    element: <Login />,
  },
  {
    path: "inscription",
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
