import React, { Fragment, useEffect, useState } from "react";
import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import {
  createClinicSchedules,
  getAllClinicsByManager,
  getOneClinics,
} from "@/api/clinic/Clinic.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import SideBar, { TopSideBar } from "@/components/molecules/Navbar/SideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import CalendarOpenCloseComponent from "@/components/organisms/Veterinarian/CalendarOpenCloseComponent.jsx";
import {
  CalendarDaysIcon,
  PencilSquareIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline/index.js";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";
import { useClinic } from "@/contexts/ClinicAdminContext.jsx";

const userNavigation = [{ name: "Déconnexion", href: "/logout" }];

export default function Schedule() {
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
          current: true,
        },
        {
          name: "Informations cabinet",
          href: "/administration/informations-cabinet",
          icon: PencilSquareIcon,
          current: false,
        },
      );
    }
    setNavigation(newNavigation);
  }, [user.roles]);

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
        clinicSchedules: clinic.clinicSchedules.map((schedule) => ({
          day: schedule.day,
          startTime: new Date(schedule.timeslot.start_time),
          endTime: new Date(schedule.timeslot.end_time),
          isOpen: schedule.timeslot.isOpen,
          id: schedule.id,
        })),
        earliestStart: 24,
        latestEnd: 0,
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

  const days = {
    lundi: "Monday",
    mardi: "Tuesday",
    mercredi: "Wednesday",
    jeudi: "Thursday",
    vendredi: "Friday",
    samedi: "Saturday",
    dimanche: "Sunday",
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(time);
      }
    }
    return options;
  };

  const handleSubmit = async (event, uuid) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const day = data.get("day");
    const isOpen = data.get("isOpen");
    const startTime = data.get("startTime");
    const endTime = data.get("endTime");
    const clinic = `/api/clinics/${uuid}`;

    const createClinic = await createClinicSchedules({
      day,
      isOpen,
      startTime,
      endTime,
      clinic,
    });

    console.log(createClinic);

    if (createClinic.success) {
      await fetchAndSetClinicsData(user.uuid);
      setModalsOpen({});
      closeModal();
      setMessage("Les horaires d'ouverture ont bien été ajoutés");
      setIsSuccess(true);
      setShowNotificationToast(true);
      setIsLoading(false);

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    } else {
      setModalsOpen({});
      closeModal();
      setMessage(createClinic.message);
      setIsSuccess(false);
      setShowNotificationToast(true);
      setIsLoading(false);

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    }
  };

  function TimeSelect() {
    const timeOptions = generateTimeOptions();

    return (
      <>
        <div className="sm:col-span-3">
          <label
            htmlFor="startTime"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Horaire de début
          </label>
          <div className="mt-2">
            <select
              id="startTime"
              name="startTime"
              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="endTime"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Horaire de fin
          </label>
          <div className="mt-2">
            <select
              id="endTime"
              name="endTime"
              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    );
  }

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
                    className="px-4 sm:px-6 lg:px-8"
                    key={clinic.clinicInfo.uuid}
                  >
                    <div className="sm:flex sm:items-center">
                      <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">
                          Les horaires d'ouverture
                        </h1>
                      </div>
                      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                          type="button"
                          onClick={() => openModal(clinic.clinicInfo.uuid)}
                          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Ajouter des horaires d'ouverture
                        </button>
                      </div>
                    </div>

                    <Modal
                      isOpen={modalsOpen[clinic.clinicInfo.uuid] || false}
                      onClose={() => closeModal(clinic.clinicInfo.uuid)}
                      title="Ajouter des horaires d'ouverture"
                    >
                      <form
                        onSubmit={(event) =>
                          handleSubmit(event, clinic.clinicInfo.uuid)
                        }
                      >
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="day"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Jour
                            </label>
                            <div className="mt-2">
                              <select
                                id="day"
                                name="day"
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                              >
                                {Object.keys(days).map((day) => (
                                  <option key={day}>{days[day]}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="isOpen"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Ouverture
                            </label>
                            <div className="mt-2">
                              <select
                                id="isOpen"
                                name="isOpen"
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                              >
                                <option value="1">Ouvert</option>
                                <option value="0">Fermé</option>
                              </select>
                            </div>
                          </div>

                          {TimeSelect()}
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
                      <CalendarOpenCloseComponent
                        clinicInformation={clinic}
                        admin={true}
                        titleClinic={true}
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
