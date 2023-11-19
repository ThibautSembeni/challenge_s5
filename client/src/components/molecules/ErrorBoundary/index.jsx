import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = () => {
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
        <p className="text-base font-semibold leading-8 text-orange">Erreur</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Oupsi, une erreur est survenue
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Désolé, une erreur est survenue. Veuillez réessayer plus tard.
        </p>
        <div className="mt-10">
          <Link to="/" className="text-sm font-semibold leading-7 text-orange">
            <span aria-hidden="true">&larr;</span> Retour à l'accueil
          </Link>
        </div>
      </main>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
