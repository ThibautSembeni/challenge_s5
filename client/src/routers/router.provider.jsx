import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import list from "./routesList.jsx";
import areRolesAllowed from "../utils/habilitation/filteredRoles";
import { Fragment, useMemo } from "react";
import {SuperAdminProvider} from "../contexts/SuperAdminContext.jsx";
import ClinicAdminProvider from "../contexts/ClinicAdminContext.jsx";

function checkURL(url) {
  if (url.endsWith("/")) {
    return "";
  } else {
    return "/";
  }
}

const contextList = {
  superAdmin: SuperAdminProvider,
  clinicAdmin: ClinicAdminProvider,
}

function createAuthorizedRoutes(roles, routes, parentPath = "") {
  return routes
    .filter((routeElement) => routeElement !== null)
    .map((route, index) => {
      const fullPath = `${parentPath}${checkURL(`${parentPath}`)}${route.path}`;
      if (areRolesAllowed(route.roles, roles)) {
        // La route est autorisée, créez-la.
        let routeElement = route.element;
        const ContextProvider = contextList[route?.context || ""];
        if (ContextProvider && fullPath.slice(-1) !== "/") {
          routeElement = <ContextProvider>{routeElement}</ContextProvider>
        }
        const CurrentRoute = (
          <Route path={fullPath} element={routeElement} key={`${fullPath}-${index}`}>
            {route.children &&
              createAuthorizedRoutes(roles, route.children, fullPath)}
          </Route>
        )
        return (
          <Fragment key={fullPath}>
            {CurrentRoute}
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
