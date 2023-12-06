import React, {Fragment, useEffect, useState} from 'react'
import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import {getOneClinics} from "@/api/veterinarian/Clinic.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import SideBar, {TopSideBar} from "@/components/molecules/Navbar/SideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import CalendarOpenCloseComponent from "@/components/organisms/Veterinarian/CalendarOpenCloseComponent.jsx";

const navigation = [
  { name: 'Accueil', href: '/administration/accueil', icon: HomeIcon, current: false },
  { name: 'Équipe', href: '/administration/equipe', icon: UsersIcon, current: false },
  { name: 'Calendrier', href: '/administration/calendrier-ouverture', icon: CalendarIcon, current: true },
]
const userNavigation = [
  { name: 'Déconnexion', href: '#' },
]

export default function Schedule () {
  const { user } = useAuth();
  const uuid = user.clinic_id.uuid;
  const [clinicInfo, setClinicInfo] = useState({
    clinic: null,
    teams: [],
    clinicSchedules: [],
    earliestStart: 24,
    latestEnd: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  // Helper functions
  const formatTime = date => `${date.getHours()}h${date.getMinutes() === 0 ? '00' : date.getMinutes()}`;
  const dayToColumnIndex = day => ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].indexOf(day.toLowerCase()) + 1;
  const timeToRowIndex = time => time.getHours() + (time.getMinutes() >= 30 ? 1 : 0) - 5;

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
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Ajouter des horaires d'ouverture
                      </button>
                    </div>
                  </div>

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
