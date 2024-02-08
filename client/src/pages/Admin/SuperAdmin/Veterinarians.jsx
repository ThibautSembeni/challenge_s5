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
import CalendarOpenCloseComponent from "@/components/organisms/Veterinarian/CalendarOpenCloseComponent.jsx";
import {getAllClinicsByManager, getOneClinics} from "@/api/clinic/Clinic.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {
  CalendarDaysIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline/index.js";
import {useClinic} from "@/contexts/ClinicAdminContext.jsx";

const stats = [
  {id: 1, name: "Nombre de rdv aujourd'hui", stat: "71", icon: UsersIcon},
  {id: 2, name: "Avg. Open Rate", stat: "58.16%", icon: EnvelopeOpenIcon},
  {id: 3, name: "Avg. Click Rate", stat: "24.57%", icon: CursorArrowRaysIcon},
];

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

export default function Home() {
  const {user} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      if (user.roles.includes("ROLE_ADMIN")) {
        setNavigation([
          {name: "Tableau de bord", href: "/full-administration/accueil", icon: HomeIcon, current: false},
          {name: "Vétérinaires", href: "/full-administration/veterinaires", icon: IdentificationIcon, current: true},
          {name: "Cabinets", href: "/full-administration/cabinets", icon: HomeIcon, current: false},
        ]);
      }
    }
    setIsLoading(false);
  }, [user]);

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
                          <h1 className="text-base font-semibold leading-6 text-gray-900">Les vérinaires</h1>
                          <p className="mt-2 text-sm text-gray-700">
                            Retrouvez ici la liste des vétérinaires de tous les cabinets.
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
                                  Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Title
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Status
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Role
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                              {people.map((person) => (
                                <tr key={person.email}>
                                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div className="flex items-center">
                                      <div className="h-11 w-11 flex-shrink-0">
                                        <img className="h-11 w-11 rounded-full" src={person.image} alt=""/>
                                      </div>
                                      <div className="ml-4">
                                        <div className="font-medium text-gray-900">{person.name}</div>
                                        <div className="mt-1 text-gray-500">{person.email}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="text-gray-900">{person.title}</div>
                                    <div className="mt-1 text-gray-500">{person.department}</div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span
                        className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{person.role}</td>
                                  <td
                                    className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                      Edit<span className="sr-only">, {person.name}</span>
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
