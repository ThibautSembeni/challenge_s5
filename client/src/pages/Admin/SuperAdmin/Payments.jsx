import React, {Fragment, useEffect, useState} from "react";
import {PencilSquareIcon,} from "@heroicons/react/24/outline";
import {getAllPayments, updateOnePayments} from "@/api/payments/Payments.jsx";
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

export default function Payments() {
  const {user} = useAuth();
  const { navigation } = useSuperAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [payments, setPayments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchPayments().then(() => setIsLoading(false));
  }, []);

  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPayments();
      setPayments(response.data["hydra:member"])
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const handleSubmitInformation = async (event, id) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const amount = data.get("amount");
    const status = data.get("status");

    const updatePaymentResponse = await updateOnePayments(id, {
      amount: new Number(amount),
      status
    });

    setIsUpdateModalOpen(false);

    if (updatePaymentResponse.success) {
      await fetchPayments();
      setIsLoading(false);
      setIsSuccess(true);
      setMessage("Les informations du paiement ont bien été modifiées");
      setShowNotificationToast(true);
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage(updatePaymentResponse.message);
      setShowNotificationToast(true);
    }

    setTimeout(() => {
      setShowNotificationToast(false);
    }, 10000);
  };

  const handleOpenModalWithPaymentInfo = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleOpenUpdateModalWithPaymentInfo = (payment) => {
    setSelectedPayment(payment);
    setIsUpdateModalOpen(true);
  };

  const paymentColumns = [
    {
      Header: 'Utilisateur',
      accessor: 'user',
      Cell: (row) => (
        <>
          <div className="font-medium text-gray-900">{row.person.firstname} {row.person.lastname}</div>
          <div className="text-gray-500">{row.person.email}</div>
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
      Header: 'Id de paiement',
      accessor: 'stripePaymentID',
    },
    {
      Header: 'Montant',
      accessor: 'amount',
    },
    {
      Header: 'Statut',
      accessor: 'status'
    },
    {
      Header: 'Actions',
      Cell: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleOpenModalWithPaymentInfo(row)}
                  className="text-blue-600 hover:text-blue-900">
            <EyeIcon className="h-5 w-5" aria-hidden="true"/>
          </button>
          <button onClick={() => handleOpenUpdateModalWithPaymentInfo(row)} className="text-orange-600 hover:text-orange-900">
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
                          <h1 className="text-base font-semibold leading-6 text-gray-900">Les paiements</h1>
                          <p className="mt-2 text-sm text-gray-700">
                            Retrouvez ici la liste des paiements.
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
                        <Table data={payments} columns={paymentColumns} />
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Informations sur le paiement"
              >
                {selectedPayment && (
                  <div className="flex flex-col gap-2">
                    <p><b>ID :</b> {selectedPayment.id}</p>
                    <p><b>ID Stripe :</b> {selectedPayment.stripePaymentID}</p>
                    <p><b>Utilisateur :</b> {selectedPayment.person.firstname} {selectedPayment.person.lastname}</p>
                    <p><b>Cabinet :</b> {selectedPayment.clinic.name}</p>
                    <p><b>Montant :</b> {selectedPayment.amount}</p>
                    <p><b>Statut :</b> {selectedPayment.status}</p>
                  </div>
                )}
              </Modal>

              <Modal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                title="Modification des informations du paiement"
              >
                {selectedPayment && (
                  <div>
                    <form onSubmit={(event) => handleSubmitInformation(event, selectedPayment.id)}>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                        <div className="col-span-full">
                          <label htmlFor="amount" className="block text-sm font-medium leading-6">
                            Montant
                          </label>
                          <div className="mt-2">
                            <input
                              id="amount"
                              name="amount"
                              type="number"
                              required={true}
                              defaultValue={selectedPayment.amount}
                              className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="status" className="block text-sm font-medium leading-6">
                            Statut
                          </label>
                          <div className="mt-2">
                            <input
                              id="status"
                              name="status"
                              type="text"
                              defaultValue={selectedPayment.status}
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
