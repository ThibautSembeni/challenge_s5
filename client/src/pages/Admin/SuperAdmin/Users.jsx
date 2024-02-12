import React, {Fragment, useEffect, useState} from "react";
import {PencilSquareIcon,} from "@heroicons/react/24/outline";
import {getAllUsers} from "@/api/auth/index.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useSuperAdmin} from "@/contexts/SuperAdminContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import Table from "@/components/atoms/Table/Table.jsx";
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

export default function Users() {
  const {user} = useAuth();
  const { navigation } = useSuperAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleOpenModalWithUserInfo = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const userColumns = [
    {
      Header: 'Nom',
      accessor: 'user',
      Cell: ( row ) => (
        <div className="font-medium text-gray-900">{row.firstname} {row.lastname}</div>
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
                          <h1 className="text-base font-semibold leading-6 text-gray-900">Les utilisateurs</h1>
                          <p className="mt-2 text-sm text-gray-700">
                            Retrouvez ici la liste des utilisateurs.
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
