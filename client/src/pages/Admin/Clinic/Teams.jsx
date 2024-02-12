import React, {Fragment, useEffect, useState} from 'react'
import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import {getOneClinics} from "@/api/clinic/Clinic.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import TeamSectionComponent from "@/components/organisms/Veterinarian/TeamSectionComponent.jsx";
import SideBar, {TopSideBar} from "@/components/molecules/Navbar/SideBar.jsx";
import {
  CalendarDaysIcon,
  IdentificationIcon,
  PencilSquareIcon,
  VideoCameraIcon
} from "@heroicons/react/24/outline/index.js";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";
import {createVeterinarianByClinic} from "@/api/clinic/Veterinarian.jsx";
//translation
import { useTranslation } from "react-i18next";

const navigation = [
  { name: 'Accueil', href: '/administration/accueil', icon: HomeIcon, current: false },
  { name: 'Équipe', href: '/administration/equipe', icon: UsersIcon, current: true },
  { name: 'Calendrier d\'ouverture', href: '/administration/calendrier-ouverture', icon: CalendarIcon, current: false },
  { name: 'Rendez-vous', href: '/administration/rendez-vous', icon: CalendarDaysIcon, current: false },
  { name: 'Téléconsultation', href: '/administration/animaux', icon: VideoCameraIcon, current: false },
  { name: 'Animaux', href: '/administration/animaux', icon: IdentificationIcon, current: false },
  { name: 'Informations cabinet', href: '/administration/informations-cabinet', icon: PencilSquareIcon, current: false },
]

const userNavigation = [
  { name: 'Déconnexion', href: '#' },
]

export default function Teams () {
  //translation
  const { t } = useTranslation();
  const { user } = useAuth();
  const uuid = user.clinic.uuid;
  const [clinicInfo, setClinicInfo] = useState({
    clinic: null,
    teams: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const firstname = data.get("firstname");
    const lastname = data.get("lastname");
    const email = data.get("email");
    const clinicId = clinicInfo.clinic['@id'];

    const createVeterinarianByClinicResponse = await createVeterinarianByClinic({
      firstname,
      lastname,
      email,
      clinicId,
    });

    if (createVeterinarianByClinicResponse.success) {
      await loadClinicData().then(() => setIsLoading(false));

      setIsLoading(false);
      setIsSuccess(true);
      setMessage("Le vétérinaire a bien été ajouté");
      setShowNotificationToast(true);
      closeModal();

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage(createVeterinarianByClinicResponse.message);
      setShowNotificationToast(true);
      closeModal();

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <NotificationToast
              show={showNotificationToast}
              setShow={setShowNotificationToast}
              message={message}
              isSuccess={isSuccess}
            />

            <SideBar navigation={navigation} teams={clinicInfo.teams} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="lg:pl-72">
              <TopSideBar navigation={userNavigation} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="mb-20">
                    <div className="sm:flex sm:items-center">
                      <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">{t("pages.admin.clinic.teams.h1")}</h1>
                      </div>
                      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                          type="button"
                          onClick={openModal}
                          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {t("pages.admin.clinic.teams.buttonAddVeterinaire")}
                        </button>
                      </div>
                    </div>

                    <Modal isOpen={isModalOpen} onClose={closeModal} title="{t('pages.admin.clinic.teams.modalAttrTitle')}">
                      <form onSubmit={handleSubmit}>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                          <div className="sm:col-span-3">
                            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                              {t("pages.admin.clinic.teams.labelFirstName")}
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                autoComplete="given-name"
                                required={true}
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                              {t("pages.admin.clinic.teams.labelLastName")}
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                autoComplete="family-name"
                                required={true}
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                              {t("pages.admin.clinic.teams.labelEmail")}
                            </label>
                            <div className="mt-2">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
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
                            {t("pages.admin.clinic.teams.buttonSubmit")}
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={closeModal}
                          >
                            {t("pages.admin.clinic.teams.buttonCancel")}
                          </button>
                        </div>
                      </form>
                    </Modal>

                    <TeamSectionComponent teamsProps={clinicInfo.teams} admin={true} />
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
