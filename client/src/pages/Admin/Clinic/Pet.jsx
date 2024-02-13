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
import { useTranslation } from "react-i18next";

import {
  IdentificationIcon,
  PencilSquareIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline/index.js";
import { getAllPets } from "@/api/pets/index.jsx";
import { Link } from "react-router-dom";

const userNavigation = [{ name: "Déconnexion", href: "/logout" }];


export default function Pet() {

  //translation
  const { t } = useTranslation();
  const {user} = useAuth();

  const uuid = user.clinic.uuid;
  const [clinicInfo, setClinicInfo] = useState({
    clinic: null,
    teams: [],
  });
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    Promise.all([getOneClinics(uuid), getAllPets()])
      .then(([clinicResponse, petsResponse]) => {
        const clinicData = clinicResponse.data;
        setClinicInfo((prev) => ({
          ...prev,
          clinic: clinicData,
          teams: clinicData.veterinarians.map(
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

        setPets(petsResponse.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
      })
      .finally(() => {
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
        current: false,
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
        current: true,
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
                        {t("pages.admin.clinic.pet.h1")}
                      </h1>
                    </div>
                  </div>

                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                      <h2 className="sr-only">{t("pages.admin.clinic.pet.h2")}</h2>


                      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {pets["hydra:member"].map((pet) => (
                          <Link
                            key={pet.id}
                            className="group"
                            to={`/administration/animal/${pet.uuid}`}
                          >
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                              <img
                                src="https://picsum.photos/200/300"
                                alt={pet.name}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                              />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700 uppercase">
                              {pet.userID.firstname} {pet.userID.lastname}
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                              {pet.name}
                            </p>
                          </Link>
                        ))}
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
