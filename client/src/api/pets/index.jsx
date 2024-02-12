import axiosInstance from "@/utils/axiosInstance.js";
import axios from "axios";

export const getAllPets = async ({
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
    `${import.meta.env.VITE_API_URL}/pets?${params.toString()}`,
  );
};

export const getOnePets = async (uuid) => {
  return axiosInstance.get(`/pets/${uuid}`);
};

export const createPets = async ({
  name,
  species,
  breed,
  birthdate,
  medicalHistory,
}) => {
  return axiosInstance.post(`/pets`, {
    name,
    species,
    breed,
    birthdate,
    medicalHistory,
  });
};
export const updatePets = async (
  uuid,
  { name, species, breed, birthdate, medicalHistory },
) => {
  return axiosInstance.patch(`/pets/${uuid}`, {
    name,
    species,
    breed,
    birthdate,
    medicalHistory,
  });
};

export const deletePets = async (uuid) => {
  return axiosInstance.delete(`/pets/${uuid}`);
};
