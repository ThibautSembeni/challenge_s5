import React, {Fragment, useEffect, useState} from 'react'
import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline'
import {getOneClinics} from "@/api/clinic/Clinic.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import SideBar, {TopSideBar} from "@/components/molecules/Navbar/SideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import CalendarOpenCloseComponent from "@/components/organisms/Veterinarian/CalendarOpenCloseComponent.jsx";
import {CalendarDaysIcon, PencilSquareIcon, VideoCameraIcon} from "@heroicons/react/24/outline/index.js";
import Modal from "@/components/organisms/Modal/Modal.jsx";

const navigation = [
  { name: 'Accueil', href: '/administration/accueil', icon: HomeIcon, current: false },
  { name: 'Équipe', href: '/administration/equipe', icon: UsersIcon, current: false },
  { name: 'Calendrier d\'ouverture', href: '/administration/calendrier-ouverture', icon: CalendarIcon, current: true },
  { name: 'Rendez-vous', href: '/administration/rendez-vous', icon: CalendarDaysIcon, current: false },
  { name: 'Téléconsultation', href: '/administration/animaux', icon: VideoCameraIcon, current: false },
  { name: 'Animaux', href: '/administration/animaux', icon: IdentificationIcon, current: false },
  { name: 'Informations cabinet', href: '/administration/informations-cabinet', icon: PencilSquareIcon, current: false },
]
const userNavigation = [
  { name: 'Déconnexion', href: '#' },
]

export default function Schedule () {
  const { user } = useAuth();
  const uuid = user.clinic.uuid;
  const [clinicInfo, setClinicInfo] = useState({
    clinic: null,
    teams: [],
    clinicSchedules: [],
    earliestStart: 24,
    latestEnd: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getOneClinics(uuid)
      .then((clinicData) => {
        const {data} = clinicData;
        setClinicInfo(prev => ({
          ...prev,
          clinic: data,
          teams: data.veterinarians.map(({firstname, lastname, specialties, uuid}) => ({
            name: `${firstname} ${lastname}`,
            initial: `${firstname[0]}`,
            role: specialties,
            uuid,
            current: false,
            imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            href: `/veterinaire/${uuid}`,
          })),
          clinicSchedules: data.clinicSchedules.map(schedule => ({
            day: schedule.day,
            startTime: new Date(schedule.timeslot_id.start_time),
            endTime: new Date(schedule.timeslot_id.end_time),
            isOpen: schedule.timeslot_id.isOpen,
          })),
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
        setIsLoading(false);
      });
  }, [uuid]);

  useEffect(() => {
    const {clinicSchedules} = clinicInfo;
    if (clinicSchedules.length > 0) {
      const times = clinicSchedules.map(({startTime, endTime}) => ({
        startHour: startTime.getHours(),
        endHour: endTime.getHours(),
      }));
      const earliestStart = Math.min(...times.map(t => t.startHour));
      const latestEnd = Math.max(...times.map(t => t.endHour));

      setClinicInfo(prev => ({
        ...prev,
        earliestStart,
        latestEnd,
      }));
    }
  }, [clinicInfo.clinicSchedules]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Helper functions
  const formatTime = date => `${date.getHours()}h${date.getMinutes() === 0 ? '00' : date.getMinutes()}`;
  const dayToColumnIndex = day => ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].indexOf(day.toLowerCase()) + 1;
  const timeToRowIndex = time => time.getHours() + (time.getMinutes() >= 30 ? 1 : 0) - 7;

  // Render functions
  const renderTimeRows = () => {
    const rows = [];
    for (let hour = clinicInfo.earliestStart; hour <= clinicInfo.latestEnd; hour++) {
      rows.push(
        <div key={hour}>
          <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
            {hour}h00
          </div>
        </div>
      );
    }
    return rows;
  };

  const days = {
    "lundi": "Lundi",
    "mardi": "Mardi",
    "mercredi": "Mercredi",
    "jeudi": "Jeudi",
    "vendredi": "Vendredi",
    "samedi": "Samedi",
    "dimanche": "Dimanche",
  }

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(time);
      }
    }
    return options;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const day = data.get("day");
    const isOpen = data.get("isOpen");
    const openTime = data.get("openTime");
    const closeTime = data.get("closeTime");
  };

  function TimeSelect() {
    const timeOptions = generateTimeOptions();

    return (
      <>
        <div className="sm:col-span-3">
          <label htmlFor="openTime" className="block text-sm font-medium leading-6 text-gray-900">
            Horaire de début
          </label>
          <div className="mt-2">
            <select
              id="openTime"
              name="openTime"
              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="closeTime" className="block text-sm font-medium leading-6 text-gray-900">
            Horaire de fin
          </label>
          <div className="mt-2">
            <select
              id="closeTime"
              name="closeTime"
              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
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
            <SideBar navigation={navigation} teams={clinicInfo.teams} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="lg:pl-72">
              <TopSideBar navigation={userNavigation} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-base font-semibold leading-6 text-gray-900">Les horaires d'ouverture</h1>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                      <button
                        type="button"
                        onClick={openModal}
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Ajouter des horaires d'ouverture
                      </button>
                    </div>
                  </div>

                  <Modal isOpen={isModalOpen} onClose={closeModal} title="Ajouter des horaires d'ouverture">
                    <form onSubmit={handleSubmit}>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="day" className="block text-sm font-medium leading-6 text-gray-900">
                            Jour
                          </label>
                          <div className="mt-2">
                            <select
                              id="day"
                              name="day"
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              {Object.keys(days).map(day => (
                                <option key={day}>{days[day]}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="isOpen" className="block text-sm font-medium leading-6 text-gray-900">
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
                      clinicSchedules={clinicInfo.clinicSchedules}
                      totalRows={clinicInfo.latestEnd - clinicInfo.earliestStart}
                      renderTimeRows={renderTimeRows}
                      dayToColumnIndex={dayToColumnIndex}
                      timeToRowIndex={timeToRowIndex}
                      formatTime={formatTime}
                    />
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
