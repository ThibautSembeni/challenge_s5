import { PaperClipIcon } from "@heroicons/react/20/solid";
import {
  downloadIcsFile,
  getOneAppointment,
} from "@/api/appointments/index.jsx";
import { useEffect, useState } from "react";
import { displayDay, displayTime } from "@/utils/date.js";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline/index.js";
import { Link } from "react-router-dom";

export default function Show({ uuid }) {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleGetAppointmentDetail = async () => {
    setLoading(true);
    const result = await getOneAppointment(uuid);
    setAppointment(result.data);
    setLoading(false);
  };

  useEffect(() => {
    if (uuid) handleGetAppointmentDetail();
  }, [uuid]);

  if (loading) return <Skeleton />;

  return (
    <div className={`overflow-hidden sm:rounded-lg bg-white`}>
      <div className="px-4 py-6 sm:px-6 flex justify-between">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900 flex gap-2 items-center">
            <CalendarIcon className={"h-6 w-5"} />
            {displayDay(appointment?.date)}
          </h3>
          <div className="mt-1 text-base font-semibold leading-6 text-gray-900 flex items-center">
            <ClockIcon className={"h-6 w-5"} />
            <span className="ml-3">{displayTime(appointment?.date)}</span>
          </div>
        </div>
        <div className="flex-none self-start px-6 pt-4">
          <dt className="sr-only">Status</dt>
          {appointment.status === "scheduled" && (
            <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              A venir
            </dd>
          )}
          {appointment.status === "completed" && (
            <dd className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
              Passé
            </dd>
          )}{" "}
          {appointment.status === "cancelled" && (
            <dd className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
              Annulé
            </dd>
          )}
        </div>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Practicien</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {appointment.veterinarian.lastname +
                " " +
                appointment.veterinarian.firstname}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Patient</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {appointment.pet.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">
              Se rendre à la consultation
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-col">
              <span className={"font-semibold"}>
                {appointment.veterinarian.clinic.name}
              </span>
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${new URLSearchParams(
                  appointment.veterinarian.clinic.address +
                    " " +
                    appointment.veterinarian.clinic.postalCode +
                    " " +
                    appointment.veterinarian.clinic.city,
                )}`}
                target={"_blank"}
                className={"text-blue-500 flex flex-col"}
              >
                <span>{appointment.veterinarian.clinic.address}</span>
                <span>
                  {appointment.veterinarian.clinic.postalCode +
                    " " +
                    appointment.veterinarian.clinic.city}
                </span>
              </Link>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">
              Moyens de paiement
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Chèques, espèces et cartes bancaires
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Raison </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {appointment.reason}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Pièces jointes
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        Ajouter à votre calendrier
                      </span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        downloadIcsFile(appointment.uuid);
                      }}
                    >
                      Télécharger
                    </button>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="space-y-2 mt-2">
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
    </div>
  );
}
