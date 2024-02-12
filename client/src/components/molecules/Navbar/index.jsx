import { Fragment, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import RadiosButtonsWithIcons from "@/components/atoms/RadiosButtons/RadiosButtonsWithIcons.jsx";
import logo from "@/assets/images/logo.png";
import { useTranslation } from "react-i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();

  const [navigation, setNavigation] = useState([
    {
      name: "Mon Compte",
      iconName: "CogIcon",
      type: "link",
      to: "/mon-compte",
      current: false,
    },
    {
      name: "Mon Espace",
      iconName: "UserIcon",
      type: "link",
      to: "/mon-espace",
      current: false,
    },
    {
      name: "Déconnexion",
      iconName: "ArrowLeftOnRectangleIcon",
      type: "button",
      onClick: () => logout(),
    },
  ]);

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={"/"}>
                    <img className="h-8 w-auto" src={logo} alt="Vetcare" />
                  </Link>
                </div>
              </div>
              <div className={"flex items-center justify-center text-sm gap-2"}>
                <div className="flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">{t("components.molecules.navbar.index.disclosureButton.span")}</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {isAuthenticated ? (
                  <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">

                    {user.roles.includes("ROLE_VETERINARIAN") || user.roles.includes("ROLE_MANAGER") ? (
                      <Link
                        to={"/administration/accueil"}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Administration
                      </Link>
                    ) : (
                      <>
                        <Link
                          to={"/inscription/informations"}
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          {t("components.molecules.navbar.index.isVeterinaire.link")}
                        </Link>

                        <Link to={"/mes-rendez-vous"}>{t("components.molecules.navbar.index.isAthenticated.link")}</Link>
                      </>
                    )}


                    <RadiosButtonsWithIcons
                      placeholder={`${user.firstname} ${user.lastname}`}
                      className={
                        "inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm"
                      }
                      options={[
                        [
                          {
                            name: "Mon Compte",
                            iconName: "CogIcon",
                            type: "link",
                            to: "/mon-compte",
                          },
                        ],
                        [
                          {
                            name: "Mon Espace",
                            iconName: "UserIcon",
                            type: "link",
                            to: "/mon-espace",
                            current: false,
                          },
                        ],
                        [
                          {
                            name: "Déconnexion",
                            iconName: "ArrowLeftOnRectangleIcon",
                            type: "button",
                            onClick: () => logout(),
                          },
                        ],
                      ]}
                    />
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                    <Link

                      to={"/practicien-register"}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      {t("components.molecules.navbar.index.isAthenticated.link")}
                    </Link>
                    <Link

                      to="/login"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      {t("components.molecules.navbar.index.seConnecter.link")}<span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            {isAuthenticated ? (
              <div className="space-y-1 pb-3 pt-2">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                {navigation.map((item) => (
                  <Fragment key={item.name}>
                    {item.type === "link" && (
                      <Link
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                            : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                          "block border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:bg-gray-50",
                        )}
                        onClick={(e) => {
                          setNavigation(
                            navigation.map((nav) => ({
                              ...nav,
                              current: nav.name === item.name,
                            })),
                          );
                        }}
                      >
                        {item.name}
                      </Link>
                    )}
                    {item.type === "button" && (
                      <button
                        onClick={item.onClick}
                        className={classNames(
                          item.current
                            ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                            : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                          "block border-l-4 py-2 pl-3 pr-4 text-left font-medium hover:bg-gray-50 w-full",
                        )}
                      >
                        {item.name}
                      </button>
                    )}
                  </Fragment>
                ))}
              </div>
            ) : (
              <>
                <div className="py-4">
                  <Link

                    to="/login"
                    className="block py-2 pl-3 pr-4 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {t("components.molecules.navbar.index.seConnecter.link")}
                  </Link>
                </div>
              </>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
