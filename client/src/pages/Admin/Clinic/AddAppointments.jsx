import React, {Fragment, useEffect, useState} from 'react'
import {
  CalendarDaysIcon,
  CalendarIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import {getOneClinics} from "@/api/veterinarian/Clinic.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import SideBar, {TopSideBar} from "@/components/molecules/Navbar/SideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {IdentificationIcon} from "@heroicons/react/24/outline/index.js";

const navigation = [
  { name: 'Accueil', href: '/administration/accueil', icon: HomeIcon, current: false },
  { name: 'Équipe', href: '/administration/equipe', icon: UsersIcon, current: false },
  { name: 'Calendrier d\'ouverture', href: '/administration/calendrier-ouverture', icon: CalendarIcon, current: false },
  { name: 'Rendez-vous', href: '/administration/rendez-vous', icon: CalendarDaysIcon, current: false },
  { name: 'Animaux', href: '/administration/animaux', icon: IdentificationIcon, current: false },
]
const userNavigation = [
  { name: 'Déconnexion', href: '#' },
]

export default function AddAppointments() {
  const { user } = useAuth();
  const uuid = user.clinic_id.uuid;
  const [clinicInfo, setClinicInfo] = useState({
    clinic: null,
    teams: [],
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
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
        setIsLoading(false);
      });
  }, [uuid]);

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

                </div>
              </main>
            </div>
          </div>
        </>
      )}
    </>
  )
}
