// Fonction pour vérifier si les rôles d'une route corresponsdent aux rôles de l'utilisateur
export default function areRolesAllowed(routeRoles, userRoles) {
  if (!routeRoles) {
    // Si la route n'a pas de rôles spécifiés, elle est autorisée par défaut.
    return true;
  }
  if (Array.isArray(routeRoles)) {
    // Vérifier si au moins un des rôles de la route correspond à un rôle de l'utilisateur.
    return routeRoles.some((role) => userRoles?.includes(role));
  } else if (typeof routeRoles === "string") {
    // Vérifier si le rôle de la route correspond à un rôle de l'utilisateur.
    return userRoles.includes(routeRoles);
  } else {
    return false;
  }
}

export { areRolesAllowed };
