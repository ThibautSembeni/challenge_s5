import React, {Fragment, useEffect, useState} from "react";
import {EyeIcon, PencilSquareIcon, TrashIcon,} from "@heroicons/react/24/outline";
import Table from "@/components/atoms/Table/Table.jsx";
import {getAllClinics} from "@/api/clinic/Clinic.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useSuperAdmin} from "@/contexts/SuperAdminContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {CheckIcon} from "@heroicons/react/20/solid";
import {checkClinic} from "@/api/clinic/Clinic.jsx";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import MapInfo from "@/components/molecules/Map/MapInfo.jsx";

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

export default function Clinics() {
  const {user} = useAuth();
  const { navigation } = useSuperAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clinics, setClinics] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);

  useEffect(() => {
    fetchClinics().then(() => setIsLoading(false));
  }, []);

  const fetchClinics = async () => {
    try {
      setIsLoading(true);
      const response = await getAllClinics();
      setClinics(response.data["hydra:member"])
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const handleOpenModalWithClinicInfo = (clinic) => {
    setSelectedClinic(clinic);
    setIsModalOpen(true);
  };

  const columns = [
    {
      Header: 'Nom',
      accessor: 'name',
    },
    {
      Header: 'Contact',
      accessor: 'email',
      Cell: (row) => (
        <>
          <div className="text-gray-900">{row.email}</div>
          <div className="mt-1 text-gray-500">{row.phone}</div>
        </>
      ),
    },
    {
      Header: 'Statut',
      accessor: 'isActif',
      Cell: (row) => (
        row.isActif ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">Active</span>
        ) : (
          <div className="flex">
          <span
            className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">En attente</span>
            <span className="ml-2 cursor-pointer hover:text-blue-500 transform duration-100 ease-in"><EyeIcon className="w-5 l-5"/></span>
            <span className="ml-2 cursor-pointer hover:text-green-500 transform duration-100 ease-in" onClick={() => {
              checkClinic(row.uuid).then(() => fetchClinics().then(() => setIsLoading(false)));
            }}><CheckIcon className="w-5 l-5"/></span>
          </div>
        )
      ),
    },
    {
      Header: 'Adresse',
      accessor: 'address',
      Cell: (row) => (
        <>
          <div className="text-gray-900">{row.address}</div>
          <div className="mt-1 text-gray-500 uppercase">{row.postalCode} {row.city}</div>
        </>
      ),
    },
    {
      Header: 'Actions',
      Cell: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleOpenModalWithClinicInfo(row)} className="text-blue-600 hover:text-blue-900">
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
                          <h1 className="text-base font-semibold leading-6 text-gray-900">Les cabinets</h1>
                          <p className="mt-2 text-sm text-gray-700">
                            Retrouvez ici la liste des cabinets.
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
                        <Table data={clinics} columns={columns} />
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Informations du cabinet"
              >
                {selectedClinic && (
                  <div className="flex flex-col gap-2">
                    <p><b>ID :</b> {selectedClinic.id}</p>
                    <p><b>UUID :</b> {selectedClinic.uuid}</p>
                    <p><b>Nom :</b> {selectedClinic.name}</p>
                    <p><b>Adresse :</b> {selectedClinic.address}, {selectedClinic.postalCode}, {selectedClinic.city}</p>
                    <p><b>Email :</b> {selectedClinic.email}</p>
                    <p><b>Téléphone :</b> {selectedClinic.phone}</p>
                    <p><b>Description :</b> {selectedClinic.description}</p>
                    <p>
                      <b className={"mr-4"}>Actif :</b>
                      { selectedClinic.isActif ? (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">Active</span>
                      ) : (
                        <span
                          className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">En attente</span>
                      )}
                    </p>

                    <div className={"mt-4"}>
                      <MapInfo
                        geocode={[
                          selectedClinic.latitude,
                          selectedClinic.longitude,
                        ]}
                        zoom={15}
                        className={"w-full h-[20vh]"}
                      />
                    </div>
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
