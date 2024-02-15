import React from "react";
import {useAuth} from "@/contexts/AuthContext";
import Loading from "@/components/molecules/Loading";
import {Link} from "react-router-dom";
//translation
import {useTranslation} from "react-i18next";


export default function Page() {
  //translation
  const { t } = useTranslation();
  const { register, isLoading, error } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstname = data.get("firstname");
    const lastname = data.get("lastname");
    const email = data.get("email");
    const password = data.get("password");
    await register(firstname, lastname, email, password);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {t("pages.auth.register.h2")}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          {isLoading && <Loading />}
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className={"flex gap-2"}>
                <div className={"w-full"}>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("pages.auth.register.labelFirstname")}
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      autoComplete="firstname"
                      required
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>{" "}
                <div className={"w-full"}>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("pages.auth.register.labelLastname")}
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      autoComplete="lastname"
                      required
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("pages.auth.register.labelEmail")}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("pages.auth.register.labelPassword")}
                </label>

                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-center">{error.message}</p>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t("pages.auth.register.buttonSubmit")}
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            {t("pages.auth.register.pDejaMembre")}{" "}
            <Link
              className={
                "font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              }
              to="/connexion"
            >
              {t("pages.auth.register.linkLogin")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
