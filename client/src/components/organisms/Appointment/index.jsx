import { useEffect, useState } from "react";
import Table from "@/components/atoms/Table/Table";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { getAllAppointments } from "@/api/appointments/index";

const people = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
    },
    {
        name: "Emily Foster",
        title: "Designer",
        email: "enfoenuof@fjfej.eif",
        role: "Admin",
    },
    {
        name: "Jenny Wilson",
        title: "Human Resources",
        email: "vefeé",
        role: "Admin",
    },
];

export default function Appointments() {
    const [appointmentsScheduled, setAppointmentsScheduled] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetAppointmentsScheduled = async () => {
        const result = await getAllAppointments();
        const appointmentsScheduled = result.data["hydra:member"].filter(
            (appointment) => appointment.status === "scheduled"
        );
        setAppointmentsScheduled(appointmentsScheduled);
        setIsLoading(false);
    };

    useEffect(() => {
        handleGetAppointmentsScheduled();
    }, []);

    console.log(appointmentsScheduled);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Mes rendez-vous
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Liste des rendez-vous à venir
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    >
                        <DocumentIcon className="-ml-1 mr-2 h-5 w-5" />
                        Exporter
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <Table
                    data={people}
                    columns={[
                        {
                            Header: "Name",
                            accessor: "name",
                        },
                        {
                            Header: "Title",
                            accessor: "title",
                        },
                        {
                            Header: "Email",
                            accessor: "email",
                        },
                        {
                            Header: "Role",
                            accessor: "role",
                        },
                    ]}
                />
            </div>
        </div>
    );
}
