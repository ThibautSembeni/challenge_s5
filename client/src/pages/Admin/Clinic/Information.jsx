import React, { Fragment, useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  CalendarIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  createComplementaryInformation,
  getAllClinicsByManager,
  getOneClinics,
  updateOneClinics,
} from "@/api/clinic/Clinic.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import SideBar, { TopSideBar } from "@/components/molecules/Navbar/SideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {
  IdentificationIcon,
  PencilSquareIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline/index.js";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import ComplementaryInformationComponent from "@/components/organisms/Veterinarian/ComplementaryInformationComponent.jsx";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";
import { useClinic } from "@/contexts/ClinicAdminContext.jsx";
import { useTranslation } from "react-i18next";

const userNavigation = [{ name: "Déconnexion", href: "/logout" }];

export default function Pet() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { selectedClinic } = useClinic();
  const [clinicsData, setClinicsData] = useState([]);
  const [veterinariansData, setVeterinariansData] = useState([]);
  const [modifyInformation, setModifyInformation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalsOpen, setModalsOpen] = useState({});
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    if (user && user.uuid) {
      fetchAndSetClinicsData(user.uuid).then(() => setIsLoading(false));
    }
  }, [user.uuid, selectedClinic]);

  const fetchAndSetClinicsData = async (userUuid) => {
    if (!userUuid) {
      return;
    }

    try {
      setIsLoading(true);

      let clinics;
      if (
          selectedClinic === "all" ||
          selectedClinic === "Voir tous les cabinets" ||
          typeof selectedClinic === undefined
      ) {
        const response = await getAllClinicsByManager(userUuid);
        clinics = response.data["hydra:member"];
      } else {
        const response = await getOneClinics(selectedClinic);
        clinics = [response.data];
      }

      const transformedClinics = clinics.map((clinic) => ({
        clinicInfo: clinic,
        teams: clinic.veterinarians.map(
            ({ firstname, lastname, specialties, uuid }) => ({
              name: `${firstname} ${lastname}`,
              initial: `${firstname[0]}`,
              role: specialties,
              uuid,
              current: false,
              imageUrl:
                  "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
              href: `/veterinaire/${uuid}`,
            }),
        ),
      }));

      setClinicsData(transformedClinics);

      if (
          selectedClinic === "all" ||
          selectedClinic === "Voir tous les cabinets" ||
          typeof selectedClinic === undefined
      ) {
        setVeterinariansData(
            transformedClinics.flatMap((clinic) => clinic.teams),
        );
      } else {
        setVeterinariansData(transformedClinics[0].teams);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const openModal = (clinicUuid) => {
    setModalsOpen((prev) => ({ ...prev, [clinicUuid]: true }));
  };

  const closeModal = (clinicUuid) => {
    setModalsOpen((prev) => ({ ...prev, [clinicUuid]: false }));
  };

  const handleSubmitInformation = async (event, uuid) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const phone = data.get("phone");
    const address = data.get("address");
    const postalCode = data.get("postal_code");
    const city = data.get("city");
    const description = data.get("description");

    const updateClinicResponse = await updateOneClinics(uuid, {
      name,
      phone,
      address,
      postalCode,
      city,
      description,
    });

    if (updateClinicResponse.success) {
      await fetchAndSetClinicsData(user.uuid);
      setModifyInformation(false);
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

  const handleSubmitModal = async (event, uuid) => {
    setIsLoading(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get("name");
    const description = data.get("description");
    const clinicId = `/api/clinics/${uuid}`;

    const createClinicComplementaryInformationResponse =
        await createComplementaryInformation({
          name,
          description,
          clinicId: clinicId,
        });

    if (createClinicComplementaryInformationResponse.success) {
      await fetchAndSetClinicsData(user.uuid);
      setIsSuccess(true);
      setMessage(
          "Les informations complémentaires du cabinet ont bien été ajoutées",
      );
      setShowNotificationToast(true);
      setIsLoading(false);
      setModalsOpen({});
      closeModal();

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    } else {
      setIsSuccess(false);
      setMessage(createClinicComplementaryInformationResponse.message);
      setShowNotificationToast(true);
      setIsLoading(false);
      setModalsOpen({});
      closeModal();

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    }
  };

  useEffect(() => {
    let newNavigation = [
      {
        name: "Accueil",
        href: "/administration/accueil",
        icon: HomeIcon,
        current: false,
      },
      {
        name: "Rendez-vous",
        href: "/administration/rendez-vous",
        icon: CalendarDaysIcon,
        current: false,
      },
      {
        name: "Téléconsultation",
        href: "/administration/animaux",
        icon: VideoCameraIcon,
        current: false,
      },
      {
        name: "Animaux",
        href: "/administration/animaux",
        icon: IdentificationIcon,
        current: false,
      },
    ];

    if (user.roles.includes("ROLE_MANAGER")) {
      newNavigation.push(
          {
            name: "Équipe",
            href: "/administration/equipe",
            icon: UsersIcon,
            current: false,
          },
          {
            name: "Calendrier d'ouverture",
            href: "/administration/calendrier-ouverture",
            icon: CalendarIcon,
            current: false,
          },
          {
            name: "Informations cabinet",
            href: "/administration/informations-cabinet",
            icon: PencilSquareIcon,
            current: true,
          },
      );
    }
    setNavigation(newNavigation);
  }, [user.roles]);

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

                <SideBar
                    navigation={navigation}
                    teams={veterinariansData}
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
                    {clinicsData.map((clinic) => (
                        <div
                            key={clinic.clinicInfo.uuid}
                            className="px-4 sm:px-6 lg:px-8"
                        >
                          <div className="sm:flex sm:items-center">
                            <div className="flex flex-wrap items-center gap-2">
                              <h1 className="text-xl font-semibold leading-6 text-gray-900">
                                {t("pages.admin.clinic.information.h1")}
                              </h1>
                              <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                          {clinic.clinicInfo.name}
                        </span>
                            </div>

                            {modifyInformation && (
                                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                  <button
                                      type="button"
                                      onClick={() =>
                                          setModifyInformation(!modifyInformation)
                                      }
                                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    {t("pages.admin.clinic.information.buttonModiferInfoCabinet")}
                                  </button>
                                </div>
                            )}
                          </div>

                          <div className="mb-20">
                            <div className="max-w-7xl gap-x-8 gap-y-10 mt-10">
                              <form
                                  onSubmit={(event) =>
                                      handleSubmitInformation(
                                          event,
                                          clinic.clinicInfo.uuid,
                                      )
                                  }
                              >
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                                  <div className="col-span-full">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium leading-6"
                                    >
                                      {t("pages.admin.clinic.information.labelName")}
                                    </label>
                                    <div className="mt-2">
                                      <input
                                          id="name"
                                          name="name"
                                          type="text"
                                          required={true}
                                          defaultValue={clinic.clinicInfo.name}
                                          disabled={modifyInformation}
                                          className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-span-full">
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium leading-6"
                                    >
                                      {t("pages.admin.clinic.information.labelPhone")}
                                    </label>
                                    <div className="mt-2">
                                      <input
                                          id="phone"
                                          name="phone"
                                          type="text"
                                          required={true}
                                          defaultValue={clinic.clinicInfo.phone}
                                          disabled={modifyInformation}
                                          className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-span-full">
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-medium leading-6"
                                    >
                                      {t("pages.admin.clinic.information.labelAddress")}
                                    </label>
                                    <div className="mt-2">
                                      <input
                                          id="address"
                                          name="address"
                                          type="text"
                                          required={true}
                                          defaultValue={clinic.clinicInfo.address}
                                          disabled={modifyInformation}
                                          className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-span-full">
                                    <label
                                        htmlFor="postal_code"
                                        className="block text-sm font-medium leading-6"
                                    >
                                      {t("pages.admin.clinic.information.labelCodePostal")}
                                    </label>
                                    <div className="mt-2">
                                      <input
                                          id="postal_code"
                                          name="postal_code"
                                          type="text"
                                          required={true}
                                          defaultValue={clinic.clinicInfo.postalCode}
                                          disabled={modifyInformation}
                                          className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-span-full">
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium leading-6"
                                    >
                                      {t("pages.admin.clinic.information.labelCity")}
                                    </label>
                                    <div className="mt-2">
                                      <input
                                          id="city"
                                          name="city"
                                          type="text"
                                          required={true}
                                          defaultValue={clinic.clinicInfo.city}
                                          disabled={modifyInformation}
                                          className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-span-full">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium leading-6"
                                    >
                                      {t("pages.admin.clinic.information.labelDescription")}
                                    </label>
                                    <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    required={true}
                                    defaultValue={clinic.clinicInfo.description}
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
                                        {t("pages.admin.clinic.information.buttonSubmit")}
                                      </button>
                                    </div>
                                )}
                              </form>
                            </div>
                          </div>

                          <div className="sm:flex sm:items-center">
                            <div className="flex flex-wrap items-center gap-2">
                              <h1 className="text-base font-semibold leading-6 text-gray-900">
                                {t("pages.admin.clinic.information.h1InfosComplementaires")}
                              </h1>
                              <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                          {clinic.clinicInfo.name}
                        </span>
                            </div>

                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                              <button
                                  type="button"
                                  onClick={() => openModal(clinic.clinicInfo.uuid)}
                                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                {t("pages.admin.clinic.information.buttonAjouterInfoSurCabinet")}
                              </button>
                            </div>
                          </div>

                          <Modal
                              isOpen={modalsOpen[clinic.clinicInfo.uuid] || false}
                              onClose={() => closeModal(clinic.clinicInfo.uuid)}
                              title={t("pages.admin.clinic.information.titleAjouterInfoCabinet")}
                          >
                            <form
                                onSubmit={(event) =>
                                    handleSubmitModal(event, clinic.clinicInfo.uuid)
                                }
                            >
                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                  <label
                                      htmlFor="name"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {t("pages.admin.clinic.information.labelNameSimple")}
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
                                  <label
                                      htmlFor="description"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {t("pages.admin.clinic.information.labelDescription")}
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
                                  {t("pages.admin.clinic.information.buttonSubmit")}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                    onClick={closeModal}
                                >
                                  {t("pages.admin.clinic.information.buttonAnnuler")}
                                </button>
                              </div>
                            </form>
                          </Modal>

                          <div className="mb-32 border-b border-gray-200 pb-10">
                            <ComplementaryInformationComponent
                                complementaryInformationsProps={
                                  clinic.clinicInfo.clinicComplementaryInformation
                                }
                                title={false}
                                admin={true}
                            />
                          </div>
                        </div>
                    ))}
                  </main>
                </div>
              </div>
            </>
        )}
      </>
  );
}