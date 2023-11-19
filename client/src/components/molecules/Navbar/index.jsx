import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import RadiosButtonsWithIcons from "@/components/atoms/RadiosButtons/RadiosButtonsWithIcons.jsx";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const [navigation, setNavigation] = useState([
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
  ]);
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
              </div>
              <div className={"flex items-center justify-center text-sm gap-2"}>
                {isAuthenticated ? (
                  <>
                    <Link to={"#"}>Mes rendez-vous</Link>
                    <RadiosButtonsWithIcons
                      placeholder={`${user.firstname} ${user.lastname}`}
                      className={
                        "inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm"
                      }
                      options={[
                        [
                          {
                            name: "Mon Compte",
                            iconName: "UserIcon",
                            type: "link",
                            to: "/account",
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
                  </>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                    <Link
                      to={""}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Vous êtes vétérinaire ?
                    </Link>
                    <Link
                      to="/login"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Se connecter <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:bg-gray-50",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    setNavigation(
                      navigation.map((nav) => ({
                        ...nav,
                        current: nav.name === item.name,
                      })),
                    );
                  }}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {isAuthenticated ? (
              <RadiosButtonsWithIcons
                placeholder={`${user.firstname} ${user.lastname}`}
                options={[
                  [
                    {
                      name: "Mon Compte",
                      iconName: "UserIcon",
                      type: "link",
                      to: "/account",
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
            ) : (
              <div className="py-6">
                <Link
                  to="/login"
                  className="block py-2 pl-3 pr-4 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
