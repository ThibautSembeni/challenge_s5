import axiosInstance from "@/utils/axiosInstance.js";

export const getAllAppointments = async () => {
  return axiosInstance.get(`/appointments`);
};
export const getAllCompletedAppointments = async () => {
  return axiosInstance.get(`/appointments/history`);
};

export const getOneAppointment = async (uuid) => {
  return axiosInstance.get(`/appointments/${uuid}`);
};

export const createAppointment = async ({
  date,
  service,
  veterinarian,
  pet,
  schedules,
}) => {
  return axiosInstance.post(`/appointments`, {
    date,
    service,
    veterinarian,
    pet,
    schedules,
  });
};
export const updateAppointment = async (
  uuid,
  { name, species, breed, birthdate, medicalHistory },
) => {
  return axiosInstance.patch(`/appointments/${uuid}`, {
    name,
    species,
    breed,
    birthdate,
    medicalHistory,
  });
};

export const deleteAppointment = async (uuid) => {
  return axiosInstance.delete(`/appointments/${uuid}`);
};

export const downloadIcsFile = async (uuid) => {
  try {
    const response = await axiosInstance.get(`/appointments/${uuid}/ics`, {
      responseType: "blob",
    });

    // Créez un objet Blob à partir du contenu ICS
    const blob = new Blob([response.data], { type: "text/calendar" });

    // Créez un lien temporaire et déclenchez le téléchargement
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rendez-vous.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier ICS", error);
  }
};

export const getAllAppointmentsOfVeterinarian = async (veterinarian) => {
  return axiosInstance.get(`/veterinarians/${veterinarian}/appointments`);
};
