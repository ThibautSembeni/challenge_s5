import Navbar from "@/components/molecules/Navbar/index.jsx";
import Navigation from "@/components/atoms/Navigation/index.jsx";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getOneVeterinarians } from "@/api/clinic/Veterinarian.jsx";
import TwoColumnsForm from "@/components/molecules/Form/TwoColumnsForm.jsx";
import Cabinet from "@/components/organisms/BookingAppointment/Cabinet.jsx";
import TypeConsultation from "@/components/organisms/BookingAppointment/TypeConsultation.jsx";
import Motif from "@/components/organisms/BookingAppointment/Motif.jsx";
import { getAllServices } from "@/api/services/index.jsx";
import Schedules from "@/components/organisms/BookingAppointment/Schedules.jsx";
import { getFreeSchedules } from "@/api/schedules/index.jsx";
import { getAllPets } from "@/api/pets/index.jsx";
import ComplémentsInformations from "@/components/organisms/BookingAppointment/Informations.jsx";
import Alert from "@/components/atoms/Alerts/index.jsx";
import { createAppointment } from "@/api/appointments/index.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import { LinkBase } from "@/components/atoms/Links/Link.jsx";

export default function BookingAppointment() {
  const { uuid } = useParams();

  const [veterinarian, setVeterinarian] = useState(null);
  const [services, setServices] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedMotif, setSelectedMotif] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [cabinet, setCabinet] = useState(null);
  const [pets, setPets] = useState([]);
  const [steps, setSteps] = useState([
    { id: "1", name: "Cabinet", href: "#", status: "current" },
    { id: "2", name: "Type de consultation", href: "#", status: "upcoming" },
    { id: "3", name: "Motif", href: "#", status: "upcoming" },
    { id: "4", name: "Date et heure", href: "#", status: "upcoming" },
    {
      id: "5",
      name: "Complément d'informations",
      href: "#",
      status: "upcoming",
    },
    { id: "6", name: "Confirmation", href: "#", status: "upcoming" },
  ]);
  const [success, setSuccess] = useState("loading");
  const [errorState, setErrorState] = useState(null);

  const handleSubmitCabinet = (event) => {
    event.preventDefault();
    const dataInfo = new FormData(event.currentTarget);
    const data = Object.fromEntries(dataInfo.entries());
    setCabinet(data.clinic);
    const newSteps = [...steps];
    newSteps[0].status = "complete";
    newSteps[1].status = "current";
    setSteps(newSteps);
  };

  const handleSubmitSchedule = (event) => {
    event.preventDefault();
    const dataInfo = new FormData(event.currentTarget);
    const data = Object.fromEntries(dataInfo.entries());
    if (!data["schedule[id]"]) {
      // No value selected, prevent form submission and show error message
      setErrorState({
        type: "error",
        message: "Veuillez sélectionner un créneau de consultation",
      });
      return;
    }
    if (errorState) {
      setErrorState(null);
    }
    setSelectedSchedule(data);
    const newSteps = [...steps];
    newSteps[3].status = "complete";
    newSteps[4].status = "current";
    setSteps(newSteps);
  };

  const handleSubmitMotif = (event) => {
    event.preventDefault();
    const dataInfo = new FormData(event.currentTarget);
    const data = Object.fromEntries(dataInfo.entries());
    setSelectedMotif(data);
    const newSteps = [...steps];
    newSteps[2].status = "complete";
    newSteps[3].status = "current";
    setSteps(newSteps);
  };

  const handleVideoAppointment = () => {
    console.log("Video appointment");
  };

  const handleClinicAppointment = () => {
    const newSteps = [...steps];
    newSteps[1].status = "complete";
    newSteps[2].status = "current";
    setSteps(newSteps);
  };

  const handleSubmitConfirmation = (event) => {
    event.preventDefault();
    const dataInfo = new FormData(event.currentTarget);
    const data = Object.fromEntries(dataInfo.entries());
    setSelectedPet(data);
    console.group("Confirmation");
    console.info("cabinet", cabinet);
    console.info("motif", selectedMotif);
    console.info("schedule", selectedSchedule);
    console.info("pet", data);
    console.groupEnd();
    const newSteps = [...steps];
    newSteps[4].status = "complete";
    newSteps[5].status = "current";
    setSteps(newSteps);
    createAppointmentRequest({
      date: selectedSchedule[`schedule[startTime]`],
      service: selectedMotif[`motif[value]`],
      veterinarian: veterinarian["@id"],
      pet: data["complementInformations[value]"],
      schedules: selectedSchedule[`schedule[id]`],
    });
  };

  const getServices = (veterinarian_id) => {
    return getAllServices(veterinarian_id).then((response) => {
      setServices(response.data["hydra:member"]);
      return response;
    });
  };

  const getSchedules = (veterinarian_id) => {
    return getFreeSchedules(veterinarian_id).then((response) => {
      setSchedules(response.data["hydra:member"]);
      return response;
    });
  };

  const getPets = () => {
    return getAllPets().then((response) => {
      setPets(response.data["hydra:member"]);
      return response;
    });
  };

  const createAppointmentRequest = ({
    date,
    service,
    veterinarian,
    pet,
    appointmentServices,
    schedules,
  }) => {
    createAppointment({
      date,
      service,
      veterinarian,
      pet,
      appointmentServices,
      schedules,
    })
      .then((res) => {
        if (res.status === 201) {
          setSuccess("success");
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log(err.response.data["hydra:description"]);
        if (
          err?.response?.data["hydra:description"]?.startsWith(
            "Unable to send the SMS",
          )
        ) {
          setSuccess("success");
        } else {
          setSuccess("error");
        }
      });
  };

  useEffect(() => {
    getOneVeterinarians(uuid)
      .then(async (veterinarianData) => {
        setVeterinarian(veterinarianData.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
      });
  }, [uuid]);

  useEffect(() => {
    if (veterinarian) {
      Promise.all([
        getServices(veterinarian.uuid),
        getSchedules(veterinarian.uuid),
        getPets(),
      ]).finally(() => {
        setIsLoading(false);
      });
    }
  }, [veterinarian]);

  const appointmentAvailable = useMemo(() => {
    return !(
      (services && services.length === 0) ||
      (schedules && schedules.length === 0)
    );
  }, [services, schedules]);

  if (isLoading) return <Loading />;

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
          {!appointmentAvailable && (
            <Alert
              type={"warning"}
              title={
                <span>
                  La prise de rendez-vous avec votre vétérinaire est impossible.{" "}
                  <LinkBase
                    component={RouterLink}
                    to={"/"}
                    className={"text-yellow-700"}
                  >
                    Trouver un autre vétérinaire
                  </LinkBase>
                </span>
              }
            />
          )}
          {appointmentAvailable &&
            veterinarian &&
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
                    disabled={!appointmentAvailable}
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
          {steps.find((step) => step.status === "current").id === "3" && (
            <form onSubmit={handleSubmitMotif}>
              <Motif services={services} />
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
          )}{" "}
          {steps.find((step) => step.status === "current").id === "4" && (
            <form onSubmit={handleSubmitSchedule}>
              {errorState && (
                <Alert type={errorState.type} title={errorState.message} />
              )}
              <Schedules schedules={schedules} />
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                  `}
                >
                  Suivant
                </button>
              </div>
            </form>
          )}
          {steps.find((step) => step.status === "current").id === "5" && (
            <form
              onSubmit={handleSubmitConfirmation}
              className={"flex gap-2 flex-col"}
            >
              <ComplémentsInformations pets={pets} />
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
                  Confirmer le rendez-vous
                </button>
              </div>
              <Alert
                type={"info"}
                title={
                  <span>
                    En confirmant ce rendez-vous,{" "}
                    <strong>vous vous engager à l'honorer</strong>
                  </span>
                }
              />
            </form>
          )}
          {steps.find((step) => step.status === "current").id === "6" && (
            <form
              onSubmit={handleSubmitConfirmation}
              className={"flex gap-2 flex-col"}
            >
              {success === "loading" && (
                <span>Validation de votre rendez-vous en cours</span>
              )}
              {success === "success" && (
                <Alert
                  type={"success"}
                  title={
                    <span>
                      <strong>Rendez-vous confirmé</strong>, vous pouvez trouver
                      les détails dans l'onglet 'Mes rendez-vous' de votre
                      compte VetCare.
                    </span>
                  }
                />
              )}
              {success === "error" && (
                <Alert
                  type={"error"}
                  title={
                    <span>
                      <strong>Rendez-vous annulé</strong>, impossible de valider
                      votre rendez-vous, veuillez réessayer.
                    </span>
                  }
                />
              )}
            </form>
          )}
        </div>
      </main>
    </>
  );
}
