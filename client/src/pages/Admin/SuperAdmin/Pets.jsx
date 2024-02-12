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
import Table from "@/components/atoms/Table/Table.jsx";
import {getAllPets} from "@/api/pets/index.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useSuperAdmin} from "@/contexts/SuperAdminContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {
  CalendarDaysIcon, CurrencyEuroIcon, EyeIcon,
  IdentificationIcon, TicketIcon, TrashIcon, UserGroupIcon,
} from "@heroicons/react/24/outline/index.js";

const userNavigation = [{name: "Déconnexion", href: "#"}];

const paymentColumns = [
  {
    Header: 'Nom',
    accessor: 'name',
    Cell: (row) => (
      <>
        <div className="font-medium text-gray-900">{row.name}</div>
      </>
    ),
  },
  {
    Header: 'Espèce',
    accessor: 'species',
  },
  {
    Header: 'Race',
    accessor: 'breed',
  },
  {
    Header: 'Utilisateur',
    accessor: 'userID',
    Cell: (row) => (
      <>
        <div className="font-medium text-gray-900">{row.userID.firstname} {row.userID.lastname}</div>
      </>
    ),
  },
];

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
  const { navigation } = useSuperAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pets, setPets] = useState([]);

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
                        <Table data={pets} columns={paymentColumns} />
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
