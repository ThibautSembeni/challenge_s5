/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Navbar from "@/components/molecules/Navbar/index.jsx";
import AppointmentPreview from "@/components/organisms/Appointment/preview.jsx";
import {
  getAllAppointments,
  getAllCompletedAppointments,
} from "@/api/appointments/index.jsx";
import { Button } from "@/components/atoms/Buttons/Button.jsx";
import EmptyPage from "@/components/organisms/Appointment/emptyPage.jsx";
import Show from "@/components/organisms/Appointment/show.jsx";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Profile", href: "#", current: false },
  { name: "Resources", href: "#", current: false },
  { name: "Company Directory", href: "#", current: false },
  { name: "Openings", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const handleGetAppointments = async () => {
    const result = await getAllAppointments();
    setAppointments(result.data["hydra:member"]);
  };
  const handleGetAppointmentsCompleted = async () => {
    const result = await getAllCompletedAppointments();
    setAppointments(result.data["hydra:member"]);
  };

  const handleAppointmentClick = (uuid) => {
    setSelectedAppointment(uuid);
  };

  useEffect(() => {
    handleGetAppointments();
  }, []);

  return (
    <>
      <Navbar className="pb-24 bg-white " />
      <main className="pb-8 overflow-hidden h-[90vh]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 h-full">
          <h1 className="sr-only">Page title</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8 h-full">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 h-full overflow-y-auto">
              <section aria-labelledby="section-2-title" className={""}>
                <h2 className="sr-only" id="section-2-title">
                  Section title
                </h2>
                <div className="rounded-lg bg-white relative overflow-hidden border border-gray-200">
                  <div className="p-6 flex flex-col gap-4 h-25 overflow-y">
                    {appointments && appointments.length > 0 ? (
                      appointments.map((appointment, index) => {
                        return (
                          <AppointmentPreview
                            key={appointment["@id"]}
                            appointment={appointment}
                            onClick={() =>
                              handleAppointmentClick(appointment.uuid)
                            }
                            selected={selectedAppointment === appointment.uuid}
                          />
                        );
                      })
                    ) : (
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={handleGetAppointmentsCompleted}
                      >
                        Voir les rendez-vous passés
                      </button>
                    )}
                  </div>
                </div>
              </section>
            </div>
            {/* Right column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2 h-full overflow-y-auto">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  Section title
                </h2>
                <div className="overflow-hidden rounded-lg bg-white relative overflow-hidden border border-gray-200">
                  <div className="p-6 flex flex-col gap-4 h-25 overflow-y">
                    {appointments &&
                    appointments.length > 0 &&
                    selectedAppointment ? (
                      <Show uuid={selectedAppointment} />
                    ) : (
                      <EmptyPage />
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
