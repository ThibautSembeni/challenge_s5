import Login from "@/pages/Auth/Login.jsx";
import Register from "@/pages/Auth/Register.jsx";
import Home from "@/pages/Home/Home.jsx";

const list = [
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "home",
        element: <h1>Home</h1>,
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
