import {useEffect, useState} from "react";
import {
  BookOpenIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  HomeIcon,
  PencilSquareIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import CalendarOpenCloseComponent from "@/components/organisms/Veterinarian/CalendarOpenCloseComponent.jsx";
import {
  getAllClinicsByManager,
  getCountClinicsByManager,
  getCountScheduledAppointmentsByClinic,
  getCountVeterinariesByClinic,
  getOneClinics,
} from "@/api/clinic/Clinic.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import SideBar, {TopSideBar} from "@/components/molecules/Navbar/SideBar.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {CalendarDaysIcon, IdentificationIcon,} from "@heroicons/react/24/outline/index.js";
import {useClinic} from "@/contexts/ClinicAdminContext.jsx";

export default function Home() {
  const {user} = useAuth();
  const {selectedClinic, navigation} = useClinic();
  const [clinicsData, setClinicsData] = useState([]);
  const [veterinariansData, setVeterinariansData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchAndSetClinicsData(user.uuid).then(() => setIsLoading(false));
  }, [user.uuid, selectedClinic]);

  useEffect(() => {
    async function fetchStarts() {
      setIsLoading(true);

      const vetCount = await getCountVeterinariesByClinic();
      const clinicCount = await getCountClinicsByManager();
      const appointmentCount =
        await getCountScheduledAppointmentsByClinic();

      setStats([
        {
          id: 1,
          name: "Nombre de vétérinaires",
          stat: `${vetCount.data} vétérinaires`,
          icon: UsersIcon,
        },
        {
          id: 2,
          name: "Nombre de cliniques",
          stat: `${clinicCount.data} cliniques`,
          icon: BuildingOfficeIcon,
        },
        {
          id: 3,
          name: "Nombre de rendez-vous programmés",
          stat: `${appointmentCount.data} rendez-vous`,
          icon: BookOpenIcon,
        },
      ]);
    }

    fetchStarts().then(() => setIsLoading(false));
  }, []);

  const fetchAndSetClinicsData = async (userUuid) => {
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
          ({firstname, lastname, specialties, uuid}) => ({
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

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <>
          <div>
            <SideBar
              navigation={navigation}
              teams={veterinariansData}
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
                  {user.roles.includes("ROLE_MANAGER") && (
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
                  )}

                  <div className="mb-20">
                    {clinicsData.map((clinic) => (
                      <div key={clinic.clinicInfo.uuid}>
                        <CalendarOpenCloseComponent
                          clinicInformation={clinic}
                          titleClinic={true}
                        />
                      </div>
                    ))}
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
