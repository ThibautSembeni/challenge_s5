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
import {getAllVeterinarians} from "@/api/clinic/Veterinarian.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useSuperAdmin} from "@/contexts/SuperAdminContext.jsx";
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

export default function Veterinarians() {
  const {user} = useAuth();
  const { navigation } = useSuperAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [veterinarians, setVeterinarians] = useState([]);

  useEffect(() => {
    fetchVeterinarians().then(() => setIsLoading(false));
  }, []);

  const fetchVeterinarians = async () => {
    try {
      setIsLoading(true);
      const response = await getAllVeterinarians();
      setVeterinarians(response.data["hydra:member"]);
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
                          <h1 className="text-base font-semibold leading-6 text-gray-900">Les vétérinaires</h1>
                          <p className="mt-2 text-sm text-gray-700">
                            Retrouvez ici la liste des vétérinaires.
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
                                  Contact
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Clinique
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                  <span className="sr-only">Modifier</span>
                                </th>
                              </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                              {veterinarians.map((veterinarian) => (
                                <tr key={veterinarian.uuid}>
                                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div className="flex items-center">
                                      <div className="ml-4">
                                        <div className="font-medium text-gray-900">{veterinarian.firstname} {veterinarian.lastname}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="text-gray-900">{veterinarian.email}</div>
                                    <div className="mt-1 text-gray-500">{veterinarian.phone}</div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="text-gray-900">{veterinarian.clinic.name}</div>
                                  </td>
                                  <td
                                    className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex items-center gap-2">
                                    <a href="#" className="text-blue-600 hover:text-blue-900">
                                      <EyeIcon className="h-5 w-5" aria-hidden="true"/>
                                      <span className="sr-only">, {veterinarian.name}</span>
                                    </a>

                                    <a href="#" className="text-orange-600 hover:text-orange-900">
                                      <PencilSquareIcon className="h-5 w-5" aria-hidden="true"/>
                                      <span className="sr-only">, {veterinarian.name}</span>
                                    </a>

                                    <a href="#" className="text-red-600 hover:text-red-900">
                                      <TrashIcon className="h-5 w-5" aria-hidden="true"/>
                                      <span className="sr-only">, {veterinarian.name}</span>
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
