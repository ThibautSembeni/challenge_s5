import React, {Fragment, useEffect, useState} from "react";
import {PencilSquareIcon,} from "@heroicons/react/24/outline";
import {getAllUsers, updateOneUsers, deleteUser} from "@/api/auth/index.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useSuperAdmin} from "@/contexts/SuperAdminContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import Table from "@/components/atoms/Table/Table.jsx";
import {EyeIcon, TrashIcon,} from "@heroicons/react/24/outline/index.js";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";

export default function Users() {
  const {user} = useAuth();
  const { navigation } = useSuperAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUsers().then(() => setIsLoading(false));
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getAllUsers();
      setUsers(response.data["hydra:member"])
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const handleSubmitInformation = async (event, uuid) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const phone = data.get("phone");
    const firstname = data.get("firstname");
    const lastname = data.get("lastname");
    const address = data.get("address");
    const postalCode = data.get("postal_code");
    const city = data.get("city");


    const updateUserResponse = await updateOneUsers(uuid, {
      email,
      phone,
      firstname,
      lastname,
      address,
      postalCode,
      city,
    });

    setIsUpdateModalOpen(false);

    if (updateUserResponse.success) {
      await fetchUsers();
      setIsLoading(false);
      setIsSuccess(true);
      setMessage("Les informations de l'utilisateur ont bien été modifiées");
      setShowNotificationToast(true);
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage(updateUserResponse.message);
      setShowNotificationToast(true);
    }

    setTimeout(() => {
      setShowNotificationToast(false);
    }, 10000);
  };

  const deleteSoftUser = async (uuid) => {
    try {
      setIsLoading(true);
      const response = await deleteUser(uuid);

      setIsDeleteModalOpen(false)

      if (response.success) {
        await fetchUsers();
        setIsLoading(false);
        setIsSuccess(true);
        setMessage("L'utilisateur a bien été supprimé");
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

  const handleOpenModalWithUserInfo = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleOpenUpdateModalWithUserInfo = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDeleteModalWithUserInfo = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const userColumns = [
    {
      Header: 'Nom',
      accessor: 'user',
      Cell: ( row ) => (
        <div className="font-medium text-gray-900 flex items-center gap-2">
          {row.deletedAt && (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700">Supprimé</span>
          )}
          {row.firstname} {row.lastname}
        </div>
      ),
    },
    {
      Header: 'Contact',
      accessor: 'email',
      Cell: ( row ) => (
        <>
          <div className="text-gray-900">{row.email}</div>
          <div className="mt-1 text-gray-500">{row.phone}</div>
        </>
      ),
    },
    {
      Header: 'Role',
      accessor: 'roles',
      Cell: ( row ) => row.roles.map(role => (
        <div key={role} className="mt-1 text-gray-500">
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
          {role}
        </span>
        </div>
      )),
    },
    {
      Header: 'Animaux',
      accessor: 'pets',
      Cell: ( row ) => row.pets.map(pet => (
        <div key={pet.uuid} className="mt-1 text-gray-500">
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          {pet.name}
        </span>
        </div>
      )),
    },
    {
      Header: 'Adresse',
      accessor: 'address',
      Cell: ( row ) => (
        <>
          <div className="text-gray-900">{row.address}</div>
          <div className="mt-1 text-gray-500">{row.postalCode}, {row.city}</div>
        </>
      ),
    },
    {
      Header: 'Actions',
      Cell: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleOpenModalWithUserInfo(row)}
                  className="text-blue-600 hover:text-blue-900">
            <EyeIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
          <button onClick={() => handleOpenUpdateModalWithUserInfo(row)} className="text-orange-600 hover:text-orange-900">
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
          <button onClick={() => handleOpenDeleteModalWithUserInfo(row)} className="text-red-600 hover:text-red-900">
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
                          <h1 className="text-base font-semibold leading-6 text-gray-900">Les utilisateurs</h1>
                          <p className="mt-2 text-sm text-gray-700">
                            Retrouvez ici la liste des utilisateurs.
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 flow-root">
                        <Table columns={userColumns} data={users} />
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Informations de l'utilisateur"
              >
                {selectedUser && (
                  <div className="flex flex-col gap-2">
                    <p><b>ID :</b> {selectedUser.id}</p>
                    <p><b>UUID :</b> {selectedUser.uuid}</p>
                    <p><b>Nom :</b> {selectedUser.firstname} {selectedUser.lastname}</p>
                    <p><b>Email :</b> {selectedUser.email}</p>
                    <p><b>Téléphone :</b> {selectedUser.phone}</p>
                    <p><b>Adresse :</b> {selectedUser.address}, {selectedUser.postalCode}, {selectedUser.city}</p>
                    <p><b>Role :</b> {selectedUser.roles.map(role => (
                      <span key={role} className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                        {role}
                      </span>
                    ))}</p>
                    <p><b>Animaux :</b> {selectedUser.pets.map(pet => (
                      <span key={pet.uuid} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {pet.name}
                      </span>
                    ))}</p>
                  </div>
                )}
              </Modal>

              <Modal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                title="Modification des informations du l'utilsateur"
              >
                {selectedUser && (
                  <div>
                    <form onSubmit={(event) => handleSubmitInformation(event, selectedUser.uuid)}>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
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
                              defaultValue={selectedUser.firstname}
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
                              defaultValue={selectedUser.lastname}
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
                              defaultValue={selectedUser.email}
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
                              defaultValue={selectedUser.phone}
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
                              defaultValue={selectedUser.address}
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
                              defaultValue={selectedUser.postalCode}
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
                              defaultValue={selectedUser.city}
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
                title="Supprimer l'utilisateur"
              >
                {selectedUser && (
                  <div>
                    <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedUser.firstname} {selectedUser.lastname} ?</p>
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
                        onClick={() => deleteSoftUser(selectedUser.uuid)}
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
