import React, {Fragment, useEffect, useState} from "react";
import {PencilSquareIcon,} from "@heroicons/react/24/outline";
import {getAllVeterinarians, updateOneVeterinarians, deleteVeterinarians} from "@/api/clinic/Veterinarian.jsx";
import Table from "@/components/atoms/Table/Table.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useSuperAdmin} from "@/contexts/SuperAdminContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {EyeIcon, TrashIcon,} from "@heroicons/react/24/outline/index.js";
import Modal from "@/components/organisms/Modal/Modal.jsx";
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

export default function Veterinarians() {
  const {user} = useAuth();
  const { navigation } = useSuperAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [veterinarians, setVeterinarians] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVeterinarian, setSelectedVeterinarian] = useState(null);

  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);

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
  const handleSubmitInformation = async (event, uuid) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const phone = data.get('phone');
    const firstname = data.get('firstname');
    const lastname = data.get('lastname');

    const updateVeterinairianResponse = await updateOneVeterinarians(uuid, {
      email,
      phone,
      firstname,
      lastname,
    });

    setIsUpdateModalOpen(false);

    if (updateVeterinairianResponse.success) {
      await fetchVeterinarians();
      setIsLoading(false);
      setIsSuccess(true);
      setMessage("Les informations du vétérinaire ont bien été modifiées");
      setShowNotificationToast(true);
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage(updateVeterinairianResponse.message);
      setShowNotificationToast(true);
    }

    setTimeout(() => {
      setShowNotificationToast(false);
    }, 10000);
  };

  const deleteVeterinarian = async (uuid) => {
    try {
      setIsLoading(true);
      const response = await deleteVeterinarians(uuid);

      setIsDeleteModalOpen(false)

      if (response.success) {
        await fetchVeterinarians();
        setIsLoading(false);
        setIsSuccess(true);
        setMessage("Le vétérinaire a bien été supprimé");
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

  const handleOpenModalWithVeterinarianInfo = (veterinarian) => {
    setSelectedVeterinarian(veterinarian);
    setIsModalOpen(true);
  };

  const handleOpenUpdateModalWithVeterinarianInfo = (veterinarian) => {
    setSelectedVeterinarian(veterinarian);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDeleteModalWithVeterinarianInfo = (veterinarian) => {
    setSelectedVeterinarian(veterinarian);
    setIsDeleteModalOpen(true);
  };

  const veterinarianColumns = [
    {
      Header: 'Nom',
      accessor: 'fullname',
      Cell: (row) => (
        <>
          <div className="font-medium text-gray-900 flex items-center gap-2">
            {row.deletedAt && (
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700">Supprimé</span>
            )}
            {row.firstname} {row.lastname}
          </div>
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
          <button onClick={() => handleOpenUpdateModalWithVeterinarianInfo(row)} className="text-orange-600 hover:text-orange-900">
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
          <button onClick={() => handleOpenDeleteModalWithVeterinarianInfo(row)} className="text-red-600 hover:text-red-900">
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
                          <h1 className="text-base font-semibold leading-6 text-gray-900">Les vétérinaires</h1>
                          <p className="mt-2 text-sm text-gray-700">
                            Retrouvez ici la liste des vétérinaires.
                          </p>
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

              <Modal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                title="Modification des informations du cabinet"
              >
                {selectedVeterinarian && (
                  <div>
                    <form onSubmit={(event) => handleSubmitInformation(event, selectedVeterinarian.uuid)}>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
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
                              defaultValue={selectedVeterinarian.email}
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
                              defaultValue={selectedVeterinarian.phone}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label htmlFor="firstname" className="block text-sm font-medium leading-6">
                            Prénom
                          </label>
                          <div className="mt-2">
                            <input
                              id="firstname"
                              name="firstname"
                              type="text"
                              required={true}
                              defaultValue={selectedVeterinarian.firstname}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label htmlFor="lastname" className="block text-sm font-medium leading-6">
                            Nom
                          </label>
                          <div className="mt-2">
                            <input
                              id="lastname"
                              name="lastname"
                              type="text"
                              required={true}
                              defaultValue={selectedVeterinarian.lastname}
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
                title="Supprimer le vétérinaire"
              >
                {selectedVeterinarian && (
                  <div>
                    <p>Êtes-vous sûr de vouloir supprimer le vétérinaire {selectedVeterinarian.firstname} {selectedVeterinarian.lastname} ?</p>
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
                        onClick={() => deleteVeterinarian(selectedVeterinarian.uuid)}
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
