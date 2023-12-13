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

export const createComplementaryInformation = async ({
    name,
    description,
    clinicId
  }) => {
  try {
    await axiosInstance.post(`${import.meta.env.VITE_API_URL}/clinic_complementary_informations`, {
      name,
      description,
      clinicId: clinicId
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: "Une erreur est survenue lors de la création des informations complémentaires" };
  }
};

export const deleteComplementaryInformation = async (id) => {
  try {
    await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/clinic_complementary_informations/${id}`);

    return { success: true };
  } catch (error) {
    return { success: false, message: "Une erreur est survenue lors de la suppression des informations complémentaires" };
  }
}

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
    phone,
    email,
    address,
    postalCode,
    city,
    description
}) => {
  const clinic = axios.post(`${import.meta.env.VITE_API_URL}/clinics`, {
    name,
    phone,
    email,
    address,
    postalCode,
    city,
    description
  });
};

export const getOneClinics = async (uuid) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/clinics/${uuid}`);
};

export const getAllClinicsByManager = async (uuid) => {
  return axiosInstance.get(`${import.meta.env.VITE_API_URL}/clinics?manager=${uuid}`);
}

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

export const updateOneClinics = async (uuid, { name, phone, address, postalCode, city, description }) => {
  try {
    const response = await axiosInstance.patch(`/clinics/${uuid}`, {
      name, phone, address, postalCode, city, description
    }, {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du cabinet : ", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour du cabinet" };
  }
};

