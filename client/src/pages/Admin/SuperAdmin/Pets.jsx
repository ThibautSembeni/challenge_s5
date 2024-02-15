import React, {Fragment, useEffect, useState} from "react";
import {PencilSquareIcon,} from "@heroicons/react/24/outline";
import Table from "@/components/atoms/Table/Table.jsx";
import {getAllPets, updatePets, deletePets} from "@/api/pets/index.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useSuperAdmin} from "@/contexts/SuperAdminContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {EyeIcon, TrashIcon,} from "@heroicons/react/24/outline/index.js";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";

export default function Pets() {
  const {user} = useAuth();
  const { navigation } = useSuperAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pets, setPets] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);

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

  const handleSubmitInformation = async (event, uuid) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const species = data.get("species");
    const breed = data.get("breed");

    const updatePetResponse = await updatePets(uuid, {
      name: name,
      species: species,
      breed: breed,
    });

    setIsUpdateModalOpen(false);

    if (updatePetResponse.success) {
      await fetchPets();
      setIsLoading(false);
      setIsSuccess(true);
      setMessage("Les informations de l'animal ont bien été modifiées");
      setShowNotificationToast(true);
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage(updatePetResponse.message);
      setShowNotificationToast(true);
    }

    setTimeout(() => {
      setShowNotificationToast(false);
    }, 10000);
  };

  const deletePet = async (uuid) => {
    try {
      setIsLoading(true);
      const response = await deletePets(uuid);

      setIsDeleteModalOpen(false)

      if (response.success) {
        await fetchPets();
        setIsLoading(false);
        setIsSuccess(true);
        setMessage("L'animal a bien été supprimé");
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

  const handleOpenModalWithPetInfo = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleOpenUpdateModalWithPetInfo = (pet) => {
    setSelectedPet(pet);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDeleteModalWithPetInfo = (pet) => {
    setSelectedPet(pet);
    setIsDeleteModalOpen(true);
  };

  const paymentColumns = [
    {
      Header: 'Nom',
      accessor: 'name',
      Cell: (row) => (
        <>
          <div className="font-medium text-gray-900 flex items-center gap-2">
            {row.deletedAt && (
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700">Supprimé</span>
            )}
            {row.name}
          </div>
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
    {
      Header: 'Actions',
      Cell: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleOpenModalWithPetInfo(row)}
                  className="text-blue-600 hover:text-blue-900">
            <EyeIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
          <button onClick={() => handleOpenUpdateModalWithPetInfo(row)} className="text-orange-600 hover:text-orange-900">
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
          <button onClick={() => handleOpenDeleteModalWithPetInfo(row)} className="text-red-600 hover:text-red-900">
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
                      </div>
                      <div className="mt-8 flow-root">
                        <Table data={pets} columns={paymentColumns} />
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Informations de l'animal"
              >
                {selectedPet && (
                  <div className="flex flex-col gap-2">
                    <p><b>UUID :</b> {selectedPet.uuid}</p>
                    <p><b>Nom :</b> {selectedPet.name}</p>
                    <p><b>Espèce :</b> {selectedPet.species}</p>
                    <p><b>Race :</b> {selectedPet.breed}</p>
                  </div>
                )}
              </Modal>

              <Modal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                title="Modification des informations de l'animal"
              >
                {selectedPet && (
                  <div>
                    <form onSubmit={(event) => handleSubmitInformation(event, selectedPet.uuid)}>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                        <div className="col-span-full">
                          <label htmlFor="name" className="block text-sm font-medium leading-6">
                            Nom
                          </label>
                          <div className="mt-2">
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required={true}
                              defaultValue={selectedPet.name}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label htmlFor="species" className="block text-sm font-medium leading-6">
                            Espèce
                          </label>
                          <div className="mt-2">
                            <input
                              id="species"
                              name="species"
                              type="text"
                              required={true}
                              defaultValue={selectedPet.species}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label htmlFor="breed" className="block text-sm font-medium leading-6">
                            Race
                          </label>
                          <div className="mt-2">
                            <input
                              id="breed"
                              name="breed"
                              type="text"
                              required={true}
                              defaultValue={selectedPet.breed}
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
                title="Supprimer l'animal"
              >
                {selectedPet && (
                  <div>
                    <p>Êtes-vous sûr de vouloir supprimer le cabinet {selectedPet.name} ?</p>
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
                        onClick={() => deletePet(selectedPet.uuid)}
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
