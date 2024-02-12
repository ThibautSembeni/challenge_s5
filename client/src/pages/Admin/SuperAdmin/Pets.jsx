import React, {Fragment, useEffect, useState} from "react";
import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  VideoCameraIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import {getAllPets} from "@/api/pets/index.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {
  CalendarDaysIcon, CurrencyEuroIcon, EyeIcon,
  IdentificationIcon, TicketIcon, TrashIcon, UserGroupIcon,
} from "@heroicons/react/24/outline/index.js";

const userNavigation = [{name: "Déconnexion", href: "#"}];

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

export default function Pets() {
  const {user} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState([]);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      if (user.roles.includes("ROLE_ADMIN")) {
        setNavigation([
          {name: "Tableau de bord", href: "/full-administration/accueil", icon: HomeIcon, current: false},
          {name: "Vétérinaires", href: "/full-administration/veterinaires", icon: IdentificationIcon, current: false},
          {name: "Cabinets", href: "/full-administration/cabinets", icon: HomeIcon, current: false, clinicStayValidation: 3},
          {name: "Utilisateurs", href: "/full-administration/utilisateurs", icon: UserGroupIcon, current: false},
          {name: "Animaux", href: "/full-administration/animaux", icon: TicketIcon, current: true},
          {name: "Paiements", href: "/full-administration/paiements", icon: CurrencyEuroIcon, current: false},
        ]);
      }
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchPets().then(() => setIsLoading(false));
  }, []);

  const fetchPets = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPets();
      setPets(response.data["hydra:member"])
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <>
          <div>
            <AdminSideBar
              navigation={navigation}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              uuid={user.uuid}
            />

            <div className="lg:pl-72">
              <TopSideBar
                navigation={userNavigation}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="mb-20">
                    <div className="px-4 sm:px-6 lg:px-8">
                      <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                          <h1 className="text-base font-semibold leading-6 text-gray-900">Les animaux</h1>
                          <p className="mt-2 text-sm text-gray-700">
                            Retrouvez ici la liste des animaux.
                          </p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                          <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                      <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                              <thead>
                              <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                  Nom
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Espèce
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Race
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Utilisateur
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                  <span className="sr-only">Modifier</span>
                                </th>
                              </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                              {pets.length === 0 && (
                                <tr>
                                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0" colSpan={5}>
                                    <div className="flex items-center">
                                      <div className="ml-4">
                                        <div className="font-medium text-gray-900 text-center">Aucun animal de renseigné</div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}

                              {pets.map((pet) => (
                                <tr key={pet.uuid}>
                                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div className="flex items-center">
                                      <div className="ml-4">
                                        <div className="font-medium text-gray-900">{pet.name}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="text-gray-900">{pet.species}</div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="text-gray-900">{pet.breed}</div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="text-gray-900">{pet.userID.firstname} {pet.userID.lastname}</div>
                                    <div className="mt-1 text-gray-500">{pet.userID.email}</div>
                                  </td>
                                  <td
                                    className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex items-center gap-2">
                                    <a href="#" className="text-blue-600 hover:text-blue-900">
                                      <EyeIcon className="h-5 w-5" aria-hidden="true"/>
                                      <span className="sr-only">, {pet.name}</span>
                                    </a>

                                    <a href="#" className="text-orange-600 hover:text-orange-900">
                                      <PencilSquareIcon className="h-5 w-5" aria-hidden="true"/>
                                      <span className="sr-only">, {pet.name}</span>
                                    </a>

                                    <a href="#" className="text-red-600 hover:text-red-900">
                                      <TrashIcon className="h-5 w-5" aria-hidden="true"/>
                                      <span className="sr-only">, {pet.name}</span>
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
