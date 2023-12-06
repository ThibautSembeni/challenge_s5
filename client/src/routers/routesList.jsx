import Login from "@/pages/Auth/Login.jsx";
import Register from "@/pages/Auth/Register.jsx";
import Account from "@/pages/Auth/Account.jsx";
import Home from "@/pages/Home/Home.jsx";
import PracticienRegister from "@/pages/PracticienRegister/index.jsx";
import SearchResult from "@/pages/Search/Search.jsx";
import Clinic from "@/pages/Veterinarian/Clinic.jsx";
import Veterinarian from "@/pages/Veterinarian/Veterinarian.jsx";
import ClinicAdminHome from "@/pages/Admin/Clinic/Home.jsx";
import Teams from "@/pages/Admin/Clinic/Teams.jsx";
import AddAppointments from "@/pages/Admin/Clinic/AddAppointments.jsx";
import ClinicAdminSchedule from "@/pages/Admin/Clinic/Schedule.jsx";
import NotFound404 from "@/pages/NotFound404.jsx";
const list = [
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "practicien-register",
        element: <PracticienRegister />,
      },
      {
        path: "about",
        element: <h1>About</h1>,
      },
      {
        path: "admin",
        element: <h1>admin</h1>,
        roles: ["ROLE_ADMIN"],
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
        roles: ["ROLE_MANAGER"],
      },
      {
        path: "equipe",
        element: <Teams />,
        roles: ["ROLE_MANAGER"],
      },
      {
        path: "ajouter-rdv",
        element: <AddAppointments />,
        roles: ["ROLE_MANAGER"],
      },
      {
        path: "calendrier-ouverture",
        element: <ClinicAdminSchedule />,
        roles: ["ROLE_MANAGER"],
      }
    ]
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
    path: "*",
    element: <NotFound404 />,
  },
];

export default list;
