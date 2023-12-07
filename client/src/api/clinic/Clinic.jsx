import axiosInstance from "@/utils/axiosInstance.js";
import axios from "axios";

export const getAllClinics = async ({
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
    `${import.meta.env.VITE_API_URL}/clinics?${params.toString()}`,
  );
};

export const createClinicSchedules = async ({
    day,
    isOpen,
    startTime,
    endTime,
    clinicId
  }) => {
  try {
    const isOpenBool = isOpen === '1' || isOpen === 1;

    const $timeSlot = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/time_slots`, {
      isOpen: isOpenBool,
      startTime,
      endTime
    });

    await axiosInstance.post(`${import.meta.env.VITE_API_URL}/clinic_schedules`, {
      day,
      timeslotId: $timeSlot.data['@id'],
      clinicId: clinicId
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: "Une erreur est survenue lors de la création du créneau" };
  }
};

export const deleteClinicsSchedules = async (id) => {
  try {
    await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/clinic_schedules/${id}`);

    return { success: true };
  } catch (error) {
    return { success: false, message: "Une erreur est survenue lors de la suppression du créneau" };
  }
};

export const createClinics = async ({
  name,
  address,
  email,
  phone,
  description,
}) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/clinics`, {
    name,
    address,
    phone,
    email,
    description,
  });
};

export const getOneClinics = async (uuid) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/clinics/${uuid}`);
};
export const replaceOneClinics = async (
  uuid,
  { name, address, email, phone, description },
) => {
  return axiosInstance.put(`/clinics/${uuid}`, {
    name,
    address,
    email,
    phone,
    description,
  });
};

export const deleteClinics = async (uuid) => {
  return axiosInstance.delete(`/clinics/${uuid}`);
};

export const updateOneClinics = async (
  uuid,
  { name, address, email, phone, description },
) => {
  return axiosInstance.patch(`/clinics/${uuid}`, {
    name,
    address,
    email,
    phone,
    description,
  });
};
