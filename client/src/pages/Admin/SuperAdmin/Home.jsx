import React, { Fragment, useEffect, useState } from "react";
import {
    CalendarIcon,
    HomeIcon,
    UsersIcon,
    CursorArrowRaysIcon,
    EnvelopeOpenIcon,
    VideoCameraIcon,
    PencilSquareIcon,
    UserGroupIcon,
    TicketIcon,
    CurrencyEuroIcon,
    BuildingOfficeIcon,
    BookOpenIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useSuperAdmin } from "@/contexts/SuperAdminContext.jsx";
import AdminSideBar, {
    TopSideBar,
} from "@/components/molecules/Navbar/AdminSideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import { getAllClinics } from "@/api/clinic/Clinic.jsx";
import { getAllUsers } from "@/api/auth/index.jsx";
import {
    CalendarDaysIcon,
    IdentificationIcon,
} from "@heroicons/react/24/outline/index.js";
import { useClinic } from "@/contexts/ClinicAdminContext.jsx";

export default function Home() {
    const { user } = useAuth();
    const { navigation } = useSuperAdmin();
    const [isLoading, setIsLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        async function fetchStarts() {
            setIsLoading(true);

            const getAllManagers = await getAllUsers();
            const countManagers = getAllManagers.data["hydra:member"].filter(
                (user) => user.roles[0] === "ROLE_MANAGER"
            ).length;

            const countUsers = getAllManagers.data["hydra:member"].length;

            const clinics = await getAllClinics({});
            const countClinics = clinics.data["hydra:member"].length;

            setStats([
                {
                    id: 1,
                    name: "Nombre d'utilisateurs",
                    stat: `${countUsers} utilisateurs`,
                    icon: UsersIcon,
                },
                {
                    id: 2,
                    name: "Nombre de managers",
                    stat: `${countManagers} managers`,
                    icon: UserIcon,
                },
                {
                    id: 3,
                    name: "Nombre de cliniques",
                    stat: `${countClinics} cliniques`,
                    icon: BuildingOfficeIcon,
                },
            ]);
        }

        fetchStarts().then(() => setIsLoading(false));
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
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
                                sidebarOpen={sidebarOpen}
                                setSidebarOpen={setSidebarOpen}
                            />

                            <main className="py-10">
                                <div className="px-4 sm:px-6 lg:px-8">
                                    <div className="mb-20">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                                            Statistiques
                                        </h3>
                                        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            {stats.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                                                >
                                                    <dt>
                                                        <div className="absolute rounded-md bg-indigo-500 p-3">
                                                            <item.icon
                                                                className="h-6 w-6 text-white"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                                            {item.name}
                                                        </p>
                                                    </dt>
                                                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                                        <p className="text-2xl font-semibold text-gray-900">
                                                            {item.stat}
                                                        </p>
                                                        <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6"></div>
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
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
