import Navbar from "@/components/molecules/Navbar/index.jsx";
import Navigation from "@/components/atoms/Navigation/index.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneVeterinarians } from "@/api/clinic/Veterinarian.jsx";
import TwoColumnsForm from "@/components/molecules/Form/TwoColumnsForm.jsx";
import Cabinet from "@/components/organisms/BookingAppointment/Cabinet.jsx";
import TypeConsultation from "@/components/organisms/BookingAppointment/TypeConsultation.jsx";

export default function BookingAppointment() {
  const { uuid } = useParams();

  const [veterinarian, setVeterinarian] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [steps, setSteps] = useState([
    { id: "1", name: "Cabinet", href: "#", status: "current" },
    { id: "2", name: "Type de consultation", href: "#", status: "upcoming" },
    { id: "3", name: "Motif", href: "#", status: "upcoming" },
    { id: "4", name: "Date et heure", href: "#", status: "upcoming" },
    { id: "5", name: "Récapitulatif", href: "#", status: "upcoming" },
  ]);

  const handleSubmitCabinet = (event) => {
    event.preventDefault();
    const dataInfo = new FormData(event.currentTarget);
    const data = Object.fromEntries(dataInfo.entries());
    console.log(data);
    const newSteps = [...steps];
    newSteps[0].status = "complete";
    newSteps[1].status = "current";
    setSteps(newSteps);
  };

  const handleVideoAppointment = () => {
    console.log("Video appointment");
  };
  const handleClinicAppointment = () => {
    console.log("Clinic appointment");
  };

  useEffect(() => {
    getOneVeterinarians(uuid)
      .then(async (veterinarianData) => {
        setVeterinarian(veterinarianData.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
        setIsLoading(false);
      });
  }, [uuid]);

  return (
    <>
      <Navbar />
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Navigation type={"simple"} steps={steps} />
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold leading-6 text-gray-900 border-b border-gray-900/10 pb-4 mb-4">
            Prendre rendez-vous avec: {veterinarian?.firstname}{" "}
            {veterinarian?.lastname}
          </h1>
          {veterinarian &&
            steps.find((step) => step.status === "current").id === "1" && (
              <form onSubmit={handleSubmitCabinet}>
                <Cabinet clinic={veterinarian?.clinic} />

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Suivant
                  </button>
                </div>
              </form>
            )}
          {steps.find((step) => step.status === "current").id === "2" && (
            <TypeConsultation
              handleVideoAppointment={handleVideoAppointment}
              handleClinicAppointment={handleClinicAppointment}
            />
          )}
        </div>
      </main>
    </>
  );
}
