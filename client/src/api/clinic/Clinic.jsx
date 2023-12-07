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
    clinicId,
    timeslotId
  }) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/clinic_schedules`, {
    day,
    clinicId,
    timeslotId
  });
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
