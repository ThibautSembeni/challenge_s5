import React, {Fragment, useEffect, useState} from "react";
import {EyeIcon, PencilSquareIcon, TrashIcon,} from "@heroicons/react/24/outline";
import Table from "@/components/atoms/Table/Table.jsx";
import {getAllClinics, updateOneClinics, deleteClinics} from "@/api/clinic/Clinic.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useSuperAdmin} from "@/contexts/SuperAdminContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {CheckIcon} from "@heroicons/react/20/solid";
import {checkClinic} from "@/api/clinic/Clinic.jsx";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import MapInfo from "@/components/molecules/Map/MapInfo.jsx";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";

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
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);

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
  const handleSubmitInformation = async (event, uuid) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone');
    const address = data.get('address');
    const postalCode = data.get('postal_code');
    const city = data.get('city');
    const description = data.get('description');

    const updateClinicResponse = await updateOneClinics(uuid, {
      name,
      email,
      phone,
      address,
      postalCode,
      city,
      description,
    });

    setIsUpdateModalOpen(false);

    if (updateClinicResponse.success) {
      await fetchClinics();
      setIsLoading(false);
      setIsSuccess(true);
      setMessage("Les informations du cabinet ont bien été modifiées");
      setShowNotificationToast(true);
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage(updateClinicResponse.message);
      setShowNotificationToast(true);
    }

    setTimeout(() => {
      setShowNotificationToast(false);
    }, 10000);
  };

  const deleteClinic = async (uuid) => {
    try {
      setIsLoading(true);
      const response = await deleteClinics(uuid);

      setIsDeleteModalOpen(false)

      if (response.success) {
        await fetchClinics();
        setIsLoading(false);
        setIsSuccess(true);
        setMessage("Le cabinet a bien été supprimé");
        setShowNotificationToast(true);
      } else {
        setIsLoading(false);
        setIsSuccess(false);
        setMessage(response.message);
        setShowNotificationToast(true);
      }

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  }

  const handleOpenModalWithClinicInfo = (clinic) => {
    setSelectedClinic(clinic);
    setIsModalOpen(true);
  };

  const handleOpenUpdateModalWithClinicInfo = (clinic) => {
    setSelectedClinic(clinic);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDeleteModalWithClinicInfo = (clinic) => {
    setSelectedClinic(clinic);
    setIsDeleteModalOpen(true);
  };

  const columns = [
    {
      Header: 'Nom',
      accessor: 'name',
      Cell: (row) => (
        <>
          <div className="text-gray-900 flex items-center gap-2">
            {row.deletedAt && (
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700">Supprimé</span>
            )}
            {row.name}
          </div>
        </>
      ),
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
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">Confirmé</span>
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
          <button onClick={() => handleOpenUpdateModalWithClinicInfo(row)} className="text-orange-600 hover:text-orange-900">
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
          <button onClick={() => handleOpenDeleteModalWithClinicInfo(row)} className="text-red-600 hover:text-red-900">
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

            <NotificationToast
              show={showNotificationToast}
              setShow={setShowNotificationToast}
              message={message}
              isSuccess={isSuccess}
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

              <Modal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                title="Modification des informations du cabinet"
              >
                {selectedClinic && (
                  <div>
                    <form onSubmit={(event) => handleSubmitInformation(event, selectedClinic.uuid)}>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                        <div className="col-span-full">
                          <label htmlFor="name" className="block text-sm font-medium leading-6">
                            Nom du cabinet
                          </label>
                          <div className="mt-2">
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required={true}
                              defaultValue={selectedClinic.name}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label htmlFor="email" className="block text-sm font-medium leading-6">
                            Email
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required={true}
                              defaultValue={selectedClinic.email}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label htmlFor="phone" className="block text-sm font-medium leading-6">
                            Téléphone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              name="phone"
                              type="text"
                              defaultValue={selectedClinic.phone}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="address" className="block text-sm font-medium leading-6">
                            Adresse postal
                          </label>
                          <div className="mt-2">
                            <input
                              id="address"
                              name="address"
                              type="text"
                              required={true}
                              defaultValue={selectedClinic.address}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label htmlFor="postal_code" className="block text-sm font-medium leading-6">
                            Code postal
                          </label>
                          <div className="mt-2">
                            <input
                              id="postal_code"
                              name="postal_code"
                              type="text"
                              required={true}
                              defaultValue={selectedClinic.postalCode}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label htmlFor="city" className="block text-sm font-medium leading-6">
                            Ville
                          </label>
                          <div className="mt-2">
                            <input
                              id="city"
                              name="city"
                              type="text"
                              required={true}
                              defaultValue={selectedClinic.city}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="description" className="block text-sm font-medium leading-6">
                            Description
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="description"
                              name="description"
                              required={true}
                              defaultValue={selectedClinic.description}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex">
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 text-white"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </Modal>

              <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Supprimer le cabinet"
              >
                {selectedClinic && (
                  <div>
                    <p>Êtes-vous sûr de vouloir supprimer le cabinet {selectedClinic.name} ?</p>
                    <div className="mt-8 grid grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="col-span-1 m-1 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 text-white"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteClinic(selectedClinic.uuid)}
                        className="col-span-1 m-1 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 text-white"
                      >
                        Supprimer
                      </button>
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
