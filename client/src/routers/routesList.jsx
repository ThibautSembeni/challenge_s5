import Login from "@/pages/Auth/Login.jsx";
import Register from "@/pages/Auth/Register.jsx";
import Home from "@/pages/Home/Home.jsx";
import PracticienRegister from "@/pages/PracticienRegister/index.jsx";
import SearchResult from "@/pages/Search/Search.jsx";
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
    path: "*",
    element: <h1>404</h1>,
  },
];

export default list;
