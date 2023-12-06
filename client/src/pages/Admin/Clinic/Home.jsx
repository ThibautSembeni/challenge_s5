import React, {Fragment, useEffect, useState} from 'react'
import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  CursorArrowRaysIcon,
  EnvelopeOpenIcon
} from '@heroicons/react/24/outline'
import CalendarOpenCloseComponent from "@/components/organisms/Veterinarian/CalendarOpenCloseComponent.jsx";
import {getOneClinics} from "@/api/veterinarian/Clinic.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import SideBar, {TopSideBar} from "@/components/molecules/Navbar/SideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {CalendarDaysIcon, IdentificationIcon} from "@heroicons/react/24/outline/index.js";

const stats = [
  { id: 1, name: 'Nombre de rdv aujourd\'hui', stat: '71', icon: UsersIcon},
  { id: 2, name: 'Avg. Open Rate', stat: '58.16%', icon: EnvelopeOpenIcon},
  { id: 3, name: 'Avg. Click Rate', stat: '24.57%', icon: CursorArrowRaysIcon},
]

const navigation = [
  { name: 'Accueil', href: '/administration/accueil', icon: HomeIcon, current: true },
  { name: 'Équipe', href: '/administration/equipe', icon: UsersIcon, current: false },
  { name: 'Calendrier d\'ouverture', href: '/administration/calendrier-ouverture', icon: CalendarIcon, current: false },
  { name: 'Rendez-vous', href: '/administration/rendez-vous', icon: CalendarDaysIcon, current: false },
  { name: 'Animaux', href: '/administration/animaux', icon: IdentificationIcon, current: false },
]
const userNavigation = [
  { name: 'Déconnexion', href: '#' },
]

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

export default function Home() {
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
                  <div className="mb-20">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Statistiques</h3>

                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {stats.map((item) => (
                        <div
                          key={item.id}
                          className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                        >
                          <dt>
                            <div className="absolute rounded-md bg-indigo-500 p-3">
                              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                          </dt>
                          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                              <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                  Tout voir
                                </a>
                              </div>
                            </div>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="mb-20">
                    <div className="sm:flex sm:items-center">
                      <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Les prochains rendez-vous</h1>
                        <p className="mt-2 text-sm text-gray-700">
                          Retrouvez ici les prochains rendez-vous de la clinique.
                        </p>
                      </div>
                      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <a
                          href={'/administration/ajouter-rdv'}
                          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Ajouter un rdv
                        </a>
                      </div>
                    </div>
                    <div className="mt-8 flow-root">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                Nom
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Type
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Animal
                              </th>
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                <span className="sr-only">Modifier</span>
                              </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {people.map((person) => (
                              <tr key={person.email}>
                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                  <div className="flex items-center">
                                    <div className="h-11 w-11 flex-shrink-0">
                                      <img className="h-11 w-11 rounded-full" src={person.image} alt="" />
                                    </div>
                                    <div className="ml-4">
                                      <div className="font-medium text-gray-900">{person.name}</div>
                                      <div className="mt-1 text-gray-500">{person.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  <div className="text-gray-900">{person.title}</div>
                                  <div className="mt-1 text-gray-500">{person.department}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Actif
                              </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{person.role}</td>
                                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Modifier <span className="sr-only">, {person.name}</span>
                                  </a>
                                </td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
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
