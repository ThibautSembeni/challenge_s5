import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import list from "./routesList.jsx";
import areRolesAllowed from "../utils/habilitation/filteredRoles";
import { Fragment, useMemo } from "react";

function checkURL(url) {
  if (url.endsWith("/")) {
    return "";
  } else {
    return "/";
  }
}

function createAuthorizedRoutes(roles, routes, parentPath = "") {
  return routes
    .filter((routeElement) => routeElement !== null)
    .map((route, index) => {
      const fullPath = `${parentPath}${checkURL(`${parentPath}`)}${route.path}`;
      if (areRolesAllowed(route.roles, roles)) {
        // La route est autorisée, créez-la.
        return (
          <Fragment key={`${fullPath}-${index}`}>
            <Route path={fullPath} element={route.element}>
              {route.children &&
                createAuthorizedRoutes(roles, route.children, fullPath)}
            </Route>
          </Fragment>
        );
      } else {
        // La route n'est pas autorisée, passez à la suivante.
        return null;
      }
    });
}
export default function RouterProvider() {
  const auth = useAuth();
  const { roles } = auth.user ?? { roles: [] };

  // Fonction pour récursivement créer des routes autorisées.

  const routes = useMemo(
    () => createAuthorizedRoutes(roles, list),
    [roles.join("-")],
  );

  return <Routes>{routes}</Routes>;
}
