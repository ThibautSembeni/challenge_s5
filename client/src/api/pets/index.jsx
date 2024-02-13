import axiosInstance from "@/utils/axiosInstance.js";

export const getAllPets = async () => {
  return axiosInstance.get(`/pets`);
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
