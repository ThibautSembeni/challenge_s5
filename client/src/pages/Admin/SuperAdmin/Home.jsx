import React, {Fragment, useEffect, useState} from "react";
import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  VideoCameraIcon,
  PencilSquareIcon, UserGroupIcon, TicketIcon, CurrencyEuroIcon,
} from "@heroicons/react/24/outline";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useSuperAdmin} from "@/contexts/SuperAdminContext.jsx";
import AdminSideBar, {TopSideBar} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {
  CalendarDaysIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline/index.js";
import {useClinic} from "@/contexts/ClinicAdminContext.jsx";

const stats = [
  {id: 1, name: "Nombre de rdv aujourd'hui", stat: "71", icon: UsersIcon},
  {id: 2, name: "Avg. Open Rate", stat: "58.16%", icon: EnvelopeOpenIcon},
  {id: 3, name: "Avg. Click Rate", stat: "24.57%", icon: CursorArrowRaysIcon},
];

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

export default function Home() {
  const {user} = useAuth();
  const { navigation } = useSuperAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Statistiques
                    </h3>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </>
      )}
    </>
  );
}
