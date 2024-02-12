import {
    CalendarDaysIcon,
    CreditCardIcon,
    UserCircleIcon,
} from "@heroicons/react/20/solid";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Icon } from "@/components/atoms/Icons/Icon.jsx";
import { displayDay, displayTime } from "@/utils/date.js";

export default function AppointmentPreview({ appointment, onClick, selected }) {
    return (
        <div
            className={`lg:col-start-3 lg:row-end-1 ${
                selected ? "scale-100 shadow-xl rounded-lg" : "bg-white"
            } hover:scale-105`}
            onClick={() => onClick()}
        >
            <h2 className="sr-only">Rendez-vous</h2>
            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap pb-6">
                    <div className="flex-auto pl-6 pt-6">
                        <dt className="text-sm font-semibold leading-6 text-gray-900 flex">
                            <CalendarIcon className={"h-6 w-5"} />
                            <span className="ml-3">
                                {displayDay(appointment?.date)}
                            </span>
                        </dt>
                        <dl className="mt-1 text-base font-semibold leading-6 text-gray-900 flex items-center justify-between">
                            <div className="mt-1 text-base font-semibold leading-6 text-gray-900 flex items-center justify-between">
                                <ClockIcon className={"h-6 w-5"} />
                                <span className="ml-3">
                                    {displayTime(appointment?.date)}
                                </span>
                            </div>
                            <div className="flex-none self-end px-6 pt-4">
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
                        </dl>
                    </div>
                    <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                        <dt className="flex-none">
                            <span className="sr-only">Vétérinaire</span>
                            <UserCircleIcon
                                className="h-6 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </dt>
                        <dd className="text-sm font-medium leading-6 text-gray-900">
                            {appointment.veterinarian.lastname +
                                " " +
                                appointment.veterinarian.firstname}
                        </dd>
                    </div>
                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                            <span className="sr-only">Due date</span>
                            <Icon
                                icon={"pets"}
                                className="h-6 w-5 text-gray-400 bg-gray-400"
                                aria-hidden="true"
                            />
                        </dt>
                        <dd className="text-sm leading-6 text-gray-500">
                            <time dateTime="2023-01-31">
                                {appointment.pet.name}
                            </time>
                        </dd>
                    </div>
                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                            <span className="sr-only">Status</span>
                            <CreditCardIcon
                                className="h-6 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </dt>
                        <dd className="text-sm leading-6 text-gray-500">
                            Paid with MasterCard
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
