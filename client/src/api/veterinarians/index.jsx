import axiosInstance from "@/utils/axiosInstance.js";
import axios from "axios";

export const getAllVeterinarians = async () => {
  return axiosInstance.get(`/veterinarians`);
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

export const getOneVeterinarians = async (id) => {
  return axiosInstance.get(`/veterinarians/${id}`);
};
export const replaceOneVeterinarians = async (
  id,
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
  return axiosInstance.put(`/veterinarians/${id}`, {
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

export const deleteVeterinarians = async (id) => {
  return axiosInstance.delete(`/veterinarians/${id}`);
};

export const updateOneVeterinarians = async (
  id,
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
  return axiosInstance.patch(`/veterinarians/${id}`, {
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
