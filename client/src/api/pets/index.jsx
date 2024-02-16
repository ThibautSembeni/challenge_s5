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
  return axiosInstance.get(
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
  try {
    const response = await axiosInstance.patch(
      `/pets/${uuid}`,
      {
        name,
        species,
        breed,
        birthdate,
        medicalHistory,
      },
      {
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
      },
    );

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'animal : ", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour de l'animal",
    };
  }
};

export const deletePets = async (uuid) => {
  try {
    await axiosInstance.delete(`/pets/${uuid}`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Une erreur est survenue lors de la suppression de l'animal",
    };
  }
};
