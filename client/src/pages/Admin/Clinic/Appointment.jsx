import React, { Fragment, useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  CalendarIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { getOneClinics } from "@/api/clinic/Clinic.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import SideBar, { TopSideBar } from "@/components/molecules/Navbar/SideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";

import {IdentificationIcon, PencilSquareIcon, VideoCameraIcon} from "@heroicons/react/24/outline/index.js";
//translation
import { useTranslation } from "react-i18next";

import {
  IdentificationIcon,
  PencilSquareIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline/index.js";


const userNavigation = [{ name: "Déconnexion", href: "/logout" }];

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    department: "Optimization",
    email: "lindsay.walton@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];

export default function Appointment() {
  //translation
  const { t } = useTranslation();
  const { user } = useAuth();
  const uuid = user.clinic.uuid;
  const [clinicInfo, setClinicInfo] = useState({
    clinic: null,
    teams: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    getOneClinics(uuid)
      .then((clinicData) => {
        const { data } = clinicData;
        setClinicInfo((prev) => ({
          ...prev,
          clinic: data,
          teams: data.veterinarians.map(
            ({ firstname, lastname, specialties, uuid }) => ({
              name: `${firstname} ${lastname}`,
              initial: `${firstname[0]}`,
              role: specialties,
              uuid,
              current: false,
              imageUrl:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
              href: `/veterinaire/${uuid}`,
            }),
          ),
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
        setIsLoading(false);
      });
  }, [uuid]);

  useEffect(() => {
    let newNavigation = [
      {
        name: "Accueil",
        href: "/administration/accueil",
        icon: HomeIcon,
        current: false,
      },
      {
        name: "Rendez-vous",
        href: "/administration/rendez-vous",
        icon: CalendarDaysIcon,
        current: true,
      },
      {
        name: "Téléconsultation",
        href: "/administration/animaux",
        icon: VideoCameraIcon,
        current: false,
      },
      {
        name: "Animaux",
        href: "/administration/animaux",
        icon: IdentificationIcon,
        current: false,
      },
    ];

    if (user.roles.includes("ROLE_MANAGER")) {
      newNavigation.push(
        {
          name: "Équipe",
          href: "/administration/equipe",
          icon: UsersIcon,
          current: false,
        },
        {
          name: "Calendrier d'ouverture",
          href: "/administration/calendrier-ouverture",
          icon: CalendarIcon,
          current: false,
        },
        {
          name: "Informations cabinet",
          href: "/administration/informations-cabinet",
          icon: PencilSquareIcon,
          current: false,
        },
      );
    }
    setNavigation(newNavigation);
  }, [user.roles]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <SideBar
              navigation={navigation}
              teams={clinicInfo.teams}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            <div className="lg:pl-72">
              <TopSideBar
                navigation={userNavigation}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">

                      <h1 className="text-base font-semibold leading-6 text-gray-900">
                          {t("pages.admin.clinic.appointment.h1")}                      </h1>

                    </div>
                  </div>

                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>

                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                              >
                                  {t("pages.admin.clinic.appointment.thNom")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                  {t("pages.admin.clinic.appointment.thType")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                  {t("pages.admin.clinic.appointment.thStatus")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                  {t("pages.admin.clinic.appointment.thAnimal")}
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                              >
                                <span className="sr-only">{t("pages.admin.clinic.appointment.thSpanModifier")}</span>
                              </th>
                            </tr>

                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {people.map((person) => (
                              <tr key={person.email}>
                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                  <div className="flex items-center">
                                    <div className="h-11 w-11 flex-shrink-0">
                                      <img
                                        className="h-11 w-11 rounded-full"
                                        src={person.image}
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="font-medium text-gray-900">
                                        {person.name}
                                      </div>
                                      <div className="mt-1 text-gray-500">
                                        {person.email}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  <div className="text-gray-900">
                                    {person.title}
                                  </div>

                                  <div className="mt-1 text-gray-500">
                                    {person.department}
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                     {t("pages.admin.clinic.appointment.tdSpanActif")}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  {person.role}
                                </td>
                                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                  <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                      {t("pages.admin.clinic.appointment.tdHrefModifier")} {" "}
                                    <span className="sr-only">
                                      , {person.name}
                                    </span>
                                  </a>
                                </td>
                              </tr>
                            ))}

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </>
      )}
    </>
  );
}
