import axiosInstance from "@/utils/axiosInstance.js";
import axios from "axios";
export const getAllVeterinarians = async ({
      page = 1,
      itemsPerPage = 30,
      pagination = false,
      ...filters
    } = {}) => {
  const params = new URLSearchParams({
    page,
    itemsPerPage,
    pagination,
    ...filters,
  });
  return axios.get(
    `${import.meta.env.VITE_API_URL}/veterinarians?${params.toString()}`,
  );
};

export const createVeterinarians = async ({
  lastname,
  firstname,
  phone,
  specialties,
  email,
  clinicID,
  appointments,
  appointmentHistories,
  schedules,
}) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/veterinarians`, {
    lastname,
    firstname,
    phone,
    specialties,
    email,
    clinicID,
    appointments,
    appointmentHistories,
    schedules,
  });
};

export const getOneVeterinarians = async (uuid) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/veterinarians/${uuid}`);
};
export const replaceOneVeterinarians = async (
  uuid,
  {
    lastname,
    firstname,
    phone,
    specialties,
    email,
    clinicID,
    appointments,
    appointmentHistories,
    schedules,
  },
) => {
  return axiosInstance.put(`/veterinarians/${uuid}`, {
    lastname,
    firstname,
    phone,
    specialties,
    email,
    clinicID,
    appointments,
    appointmentHistories,
    schedules,
  });
};

export const createVeterinarianByClinic = async ({
     firstname,
     lastname,
     email,
     clinicId,
   }) => {
  try {
    await axiosInstance.post(`${import.meta.env.VITE_API_URL}/veterinarians`, {
      firstname,
      lastname,
      email,
      clinic: clinicId
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: "Une erreur est survenue lors de la création du profil du vétérinaire" };
  }
};

export const deleteVeterinarians = async (uuid) => {
  try {
    await axiosInstance.delete(`/veterinarians/${uuid}`);

    return { success: true };
  } catch (error) {
    return { success: false, message: "Une erreur est survenue lors de la suppression du vétérinaire" };
  }
};

export const updateOneVeterinarians = async (
  uuid,
  {
    lastname,
    firstname,
    phone,
    specialties,
    email,
    clinicID,
    appointments,
    appointmentHistories,
    schedules,
  },
) => {
  return axiosInstance.patch(`/veterinarians/${uuid}`, {
    lastname,
    firstname,
    phone,
    specialties,
    email,
    clinicID,
    appointments,
    appointmentHistories,
    schedules,
  });
};
