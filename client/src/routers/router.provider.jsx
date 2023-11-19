import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import list from "./routesList.jsx";
import areRolesAllowed from "../utils/habilitation/filteredRoles";
import { Fragment } from "react";

export default function RouterProvider() {
  const auth = useAuth();
  const { roles } = auth.user ?? { roles: [] };
  function checkURL(url) {
    if (url.endsWith("/")) {
      return "";
    } else {
      return "/";
    }
  }

  // Fonction pour récursivement créer des routes autorisées.
  function createAuthorizedRoutes(routes, parentPath = "") {
    return routes
      .filter((routeElement) => routeElement !== null)
      .map((route, index) => {
        const fullPath = `${parentPath}${checkURL(`${parentPath}`)}${
          route.path
        }`;
        if (areRolesAllowed(route.roles, roles)) {
          // La route est autorisée, créez-la.
          return (
            <Fragment key={`${fullPath}-${index}`}>
              <Route path={fullPath} element={route.element}></Route>
              {route.children &&
                createAuthorizedRoutes(route.children, fullPath)}
            </Fragment>
          );
        } else {
          // La route n'est pas autorisée, passez à la suivante.
          return null;
        }
      });
  }

  return <Routes>{createAuthorizedRoutes(list)}</Routes>;
}
