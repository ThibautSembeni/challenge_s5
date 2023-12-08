import React, {useState} from 'react';
import {deleteVeterinarians} from "@/api/clinic/Veterinarian.jsx";
import NotificationToast from "@/components/atoms/Notifications/NotificationToast.jsx";
import {TrashIcon} from "@heroicons/react/24/outline/index.js";

function TeamSectionComponent({ teamsProps, admin = false }) {
  const [teams, setTeams] = useState(teamsProps);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const deleteVeterinarianByAdmin = async (uuid) => {
    const deleteItem = await deleteVeterinarians(uuid);

    if (deleteItem.success) {
      await setTeams(prevTeams => {
        return prevTeams.filter(team => team.uuid !== uuid)
      });

      setIsSuccess(true);
      setMessage("Vétérinaire supprimé avec succès");
      setShowNotificationToast(true);

      setTimeout(() => {
        setShowNotificationToast(false);
      }, 10000);
    }
  }

  return (
    <div>
      <NotificationToast
        show={showNotificationToast}
        setShow={setShowNotificationToast}
        message={message}
        isSuccess={isSuccess}
      />

      {/* Logo cloud */}
      <div className="relative isolate -z-10 mt-32 sm:mt-48">
        <div
          className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
          <svg className="h-[40rem] w-[80rem] flex-none stroke-gray-200" aria-hidden="true">
            <defs>
              <pattern
                id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                width={200}
                height={200}
                x="50%"
                y="50%"
                patternUnits="userSpaceOnUse"
                patternTransform="translate(-100 0)"
              >
                <path d="M.5 200V.5H200" fill="none"/>
              </pattern>
            </defs>
            <svg x="50%" y="50%" className="overflow-visible fill-gray-50">
              <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" strokeWidth={0}/>
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"/>
          </svg>
        </div>
      </div>

      {/* Team section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Notre équipe</h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {teams.map((person) => (
            <li key={person.uuid}>
              {admin && <TrashIcon className="w-4 font-bold text-red-500 hover:text-black hover:scale-110 duration-75 ease-in cursor-pointer" onClick={() => deleteVeterinarianByAdmin(person.uuid)} />}

              <a href={`/veterinaire/${person.uuid}`}>
                <img className="mx-auto h-24 w-24 rounded-full" src={person.imageUrl} alt=""/>
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900 uppercase">DR. {person.name}</h3>
                <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamSectionComponent;
