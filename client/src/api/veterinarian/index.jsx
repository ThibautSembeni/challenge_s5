import axiosInstance from "@/utils/axiosInstance.js";
import axios from "axios";

export const getAllVeterinarians = async () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/veterinarians`);
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

export const deleteVeterinarians = async (uuid) => {
  return axiosInstance.delete(`/veterinarians/${uuid}`);
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
