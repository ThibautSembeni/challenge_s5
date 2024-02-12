import React, {Fragment, useEffect, useState} from "react";
import {PencilSquareIcon,} from "@heroicons/react/24/outline";
import {getAllVeterinarians} from "@/api/clinic/Veterinarian.jsx";
import Table from "@/components/atoms/Table/Table.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useSuperAdmin} from "@/contexts/SuperAdminContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {EyeIcon, TrashIcon,} from "@heroicons/react/24/outline/index.js";
import Modal from "@/components/organisms/Modal/Modal.jsx";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVeterinarian, setSelectedVeterinarian] = useState(null);

  useEffect(() => {
    fetchVeterinarians().then(() => setIsLoading(false));
  }, []);

  const fetchVeterinarians = async () => {
    try {
      setIsLoading(true);
      const response = await getAllVeterinarians();
      const preparedVeterinarians = response.data["hydra:member"].map(veterinarian => ({
        ...veterinarian,
        fullname: `${veterinarian.firstname} ${veterinarian.lastname}`,
      }));
      setVeterinarians(preparedVeterinarians);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const handleOpenModalWithVeterinarianInfo = (veterinarian) => {
    setSelectedVeterinarian(veterinarian);
    setIsModalOpen(true);
  };

  const veterinarianColumns = [
    {
      Header: 'Nom',
      accessor: 'fullname',
      Cell: (row) => (
        <>
          <div className="font-medium text-gray-900">{row.firstname} {row.lastname}</div>
        </>
      ),
    },
    {
      Header: 'Contact',
      accessor: 'contact',
      Cell: (row) => (
        <>
          <div className="text-gray-900">{row.email}</div>
          <div className="mt-1 text-gray-500">{row.phone}</div>
        </>
      ),
    },
    {
      Header: 'Cabinet',
      accessor: 'clinic.name',
      Cell: (row) => (
        <>
          <div className="text-gray-900">{row.clinic.name}</div>
        </>
      ),
    },
    {
      Header: 'Actions',
      Cell: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleOpenModalWithVeterinarianInfo(row)} className="text-blue-600 hover:text-blue-900">
            <EyeIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
          <button className="text-orange-600 hover:text-orange-900">
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
          <button className="text-red-600 hover:text-red-900">
            <TrashIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
        </div>
      ),
      accessor: 'actions',
    },
  ];

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
                        <Table data={veterinarians} columns={veterinarianColumns} />
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Informations du vétérianaire"
              >
                {selectedVeterinarian && (
                  <div className="flex flex-col gap-2">
                    <p><b>ID :</b> {selectedVeterinarian.id}</p>
                    <p><b>UUID :</b> {selectedVeterinarian.uuid}</p>
                    <p><b>Cabinet :</b> {selectedVeterinarian.clinic.name}</p>
                    <p><b>Nom :</b> {selectedVeterinarian.firstname} {selectedVeterinarian.lastname}</p>
                    <p><b>Email :</b> {selectedVeterinarian.email}</p>
                    <p><b>Téléphone :</b> {selectedVeterinarian.phone}</p>
                  </div>
                )}
              </Modal>
            </div>
          </div>
        </>
      )}
    </>
  );
}
