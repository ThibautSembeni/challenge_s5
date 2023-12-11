import React, {Fragment, useEffect, useState} from 'react'
import {
  CalendarDaysIcon,
  CalendarIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import {
  createClinicSchedules,
  createComplementaryInformation,
  getOneClinics,
  updateOneClinics
} from "@/api/clinic/Clinic.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import SideBar, {TopSideBar} from "@/components/molecules/Navbar/SideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {IdentificationIcon, PencilSquareIcon, VideoCameraIcon} from "@heroicons/react/24/outline/index.js";
import {getAllPets} from "@/api/clinic/Pet.jsx";
import {Link} from "react-router-dom";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import ComplementaryInformationComponent
  from "@/components/organisms/Veterinarian/ComplementaryInformationComponent.jsx";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";

const navigation = [
  {name: 'Accueil', href: '/administration/accueil', icon: HomeIcon, current: false},
  {name: 'Équipe', href: '/administration/equipe', icon: UsersIcon, current: false},
  {name: 'Calendrier d\'ouverture', href: '/administration/calendrier-ouverture', icon: CalendarIcon, current: false},
  {name: 'Rendez-vous', href: '/administration/rendez-vous', icon: CalendarDaysIcon, current: false},
  { name: 'Téléconsultation', href: '/administration/animaux', icon: VideoCameraIcon, current: false },
  {name: 'Animaux', href: '/administration/animaux', icon: IdentificationIcon, current: false},
  { name: 'Informations cabinet', href: '/administration/informations-cabinet', icon: PencilSquareIcon, current: true },
]
const userNavigation = [
  {name: 'Déconnexion', href: '#'},
]

export default function Pet() {
  const {user} = useAuth();
  const uuid = user.clinic.uuid;
  const [clinicInfo, setClinicInfo] = useState({
    clinic: null,
    teams: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modifyInformation, setModifyInformation] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadClinicData().then(() => setIsLoading(false));
  }, [uuid]);

  const loadClinicData = async () => {
    try {
      const clinicData = await getOneClinics(uuid);
      const { data } = clinicData;
      setClinicInfo(prev => ({
        ...prev,
        clinic: data,
        teams: data.veterinarians.map(({ firstname, lastname, specialties, uuid }) => ({
          name: `${firstname} ${lastname}`,
          initial: `${firstname[0]}`,
          role: specialties,
          uuid,
          current: false,
          imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
          href: `/veterinaire/${uuid}`,
        })),
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmitInformation = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get('name');
    const phone = data.get('phone');
    const address = data.get('address');
    const postalCode = data.get('postal_code');
    const city = data.get('city');
    const description = data.get('description');

    console.log(name, phone, address, postalCode, city, description);

    const updateClinicResponse = await updateOneClinics(uuid, {
      name,
      phone,
      address,
      postalCode,
      city,
      description,
    })

    if (updateClinicResponse.success) {
      await loadClinicData().then(() => setIsLoading(false));
      setIsSuccess(true);
      setMessage("Les informations du cabinet ont bien été modifiées");
      setShowNotificationToast(true);
      setModifyInformation(true);

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage(updateClinicResponse.message);
      setShowNotificationToast(true);
      setModifyInformation(true);

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);

    }
  }
  const handleSubmitModal = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get('name');
    const description = data.get('description');
    const clinicId = clinicInfo.clinic['@id'];

    const createClinicComplementaryInformationResponse = await createComplementaryInformation({
      name,
      description,
      clinicId: clinicId,
    });

    if (createClinicComplementaryInformationResponse.success) {
      await loadClinicData().then(() => setIsLoading(false));
      setIsSuccess(true);
      setMessage("Les informations complémentaires du cabinet ont bien été ajoutées");
      setShowNotificationToast(true);
      setIsModalOpen(false);
      closeModal();

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    } else {
      setIsSuccess(false);
      setMessage(createClinicComplementaryInformationResponse.message);
      setShowNotificationToast(true);
      setIsModalOpen(false);
      closeModal();

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    }
  };

  return (
      <>
        {isLoading ? (
            <Loading/>
        ) : (
            <>
              <div>
                <NotificationToast
                  show={showNotificationToast}
                  setShow={setShowNotificationToast}
                  message={message}
                  isSuccess={isSuccess}
                />

                <SideBar navigation={navigation} teams={clinicInfo.teams} sidebarOpen={sidebarOpen}
                         setSidebarOpen={setSidebarOpen}/>

                <div className="lg:pl-72">
                  <TopSideBar navigation={userNavigation} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

                  <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                      <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                          <h1 className="text-base font-semibold leading-6 text-gray-900">Informations sur le cabinet</h1>
                        </div>

                        {modifyInformation && (
                          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                              type="button"
                              onClick={() => setModifyInformation(!modifyInformation)}
                              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Modifier les informations du cabinet
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="mb-20">
                        <div className="max-w-7xl gap-x-8 gap-y-10 mt-10">
                          <form onSubmit={handleSubmitInformation}>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
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
                                    defaultValue={clinicInfo.clinic.name}
                                    disabled={modifyInformation}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="col-span-full">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6">
                                  Téléphone
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    required={true}
                                    defaultValue={clinicInfo.clinic.phone}
                                    disabled={modifyInformation}
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
                                    defaultValue={clinicInfo.clinic.address}
                                    disabled={modifyInformation}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="col-span-full">
                                <label htmlFor="postal_code" className="block text-sm font-medium leading-6">
                                  Code postal
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="postal_code"
                                    name="postal_code"
                                    type="text"
                                    required={true}
                                    defaultValue={clinicInfo.clinic.postalCode}
                                    disabled={modifyInformation}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="col-span-full">
                                <label htmlFor="city" className="block text-sm font-medium leading-6">
                                  Ville
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    required={true}
                                    defaultValue={clinicInfo.clinic.city}
                                    disabled={modifyInformation}
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
                                    defaultValue={clinicInfo.clinic.description}
                                    disabled={modifyInformation}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </div>

                            {!modifyInformation && (
                              <div className="mt-8 flex">
                                <button
                                  type="submit"
                                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 text-white"
                                >
                                  Enregistrer
                                </button>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>

                      <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                          <h1 className="text-base font-semibold leading-6 text-gray-900">Informations complémentaires sur le cabinet</h1>
                        </div>

                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                          <button
                            type="button"
                            onClick={openModal}
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Ajouter des informations complémentaires sur le cabinet
                          </button>
                        </div>
                      </div>

                      <Modal isOpen={isModalOpen} onClose={closeModal} title="Ajouter des informations complémentaires">
                        <form onSubmit={handleSubmitModal}>
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nom
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  required={true}
                                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  name="description"
                                  id="description"
                                  required={true}
                                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"

                            >
                              Enregistrer
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                              onClick={closeModal}
                            >
                              Annuler
                            </button>
                          </div>
                        </form>
                      </Modal>

                      <div className="mb-20">
                        <ComplementaryInformationComponent complementaryInformationsProps={clinicInfo.clinic.clinicComplementaryInformation} title={false} admin={true} />
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </>
        )}
      </>
  )
}