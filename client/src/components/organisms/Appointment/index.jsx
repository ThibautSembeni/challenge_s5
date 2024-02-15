import { useCallback, useEffect, useState } from "react";
import Table from "@/components/atoms/Table/Table";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { getAllAppointmentsOfVeterinarian } from "@/api/appointments/index";
import { useAuth } from "@/contexts/AuthContext";
import { jsPDF } from "jspdf";

export default function Appointments() {
    const [appointmentsScheduled, setAppointmentsScheduled] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const vetUuid = user.veterinarian.uuid;

    const handleGetAppointmentsScheduled = useCallback(async () => {
        setIsLoading(true);
        const result = await getAllAppointmentsOfVeterinarian(vetUuid);
        const appointments = result.data["hydra:member"].filter(
            (appointment) => appointment.status === "scheduled"
        );

        const newAppointmentsScheduled = appointments.map((appointment) => ({
            lastname: appointment.userID.lastname,
            firstname: appointment.userID.firstname,
            phone: appointment.userID.phone,
            date: convertDate(appointment.date),
        }));

        setAppointmentsScheduled(newAppointmentsScheduled);
        setIsLoading(false);
    }, [vetUuid]);

    useEffect(() => {
        handleGetAppointmentsScheduled();
    }, [handleGetAppointmentsScheduled]);

    const convertDate = (date) => {
        const dateObject = new Date(date);
        return dateObject.toLocaleDateString("fr-FR");
    };

    const exportAppointmentsToCSV = () => {
        const headers = ["Nom", "Prénom", "Téléphone", "Date"].join(",");
        const csv = appointmentsScheduled.map((appointment) => {
            return [
                appointment.lastname,
                appointment.firstname,
                appointment.phone,
                appointment.date,
            ].join(",");
        });

        const csvContent = [headers, ...csv].join("\n");
        const csvData = new Blob([csvContent], { type: "text/csv" });

        const csvUrl = URL.createObjectURL(csvData);

        const a = document.createElement("a");
        a.href = csvUrl;
        a.download = "rendez-vous.csv";
        a.click();
    };

    const exportAppointmentsToPDF = () => {
        const doc = new jsPDF();
        const headers = ["Nom", "Prénom", "Téléphone", "Date"];

        let y = 10;
        headers.forEach((header, index) => {
            doc.text(header, 10 + index * 40, y);
        });
        y += 10;

        appointmentsScheduled.forEach((appointment) => {
            doc.text(appointment.lastname, 10, y);
            doc.text(appointment.firstname, 50, y);
            doc.text(appointment.phone, 90, y);
            doc.text(appointment.date, 130, y);
            y += 10;
        });

        doc.save("rendez-vous.pdf");
    };

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
                <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                        onClick={exportAppointmentsToCSV}
                    >
                        <DocumentIcon className="-ml-1 mr-2 h-5 w-5" />
                        Export CSV
                    </button>
                </div>
                <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                        onClick={exportAppointmentsToPDF}
                    >
                        <DocumentIcon className="-ml-1 mr-2 h-5 w-5" />
                        Export PDF
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <Table
                    data={appointmentsScheduled}
                    columns={[
                        {
                            Header: "Nom",
                            accessor: "lastname",
                        },
                        {
                            Header: "Prénom",
                            accessor: "firstname",
                        },
                        {
                            Header: "Téléphone",
                            accessor: "phone",
                        },
                        {
                            Header: "Date",
                            accessor: "date",
                        },
                    ]}
                />
                {isLoading && (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
