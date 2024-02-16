import axiosInstance from "@/utils/axiosInstance.js";
import axios from "axios";

export const getAllFeedbacks = async ({
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
    `${import.meta.env.VITE_API_URL}/feedbacks?${params.toString()}`,
  );
};

export const getAllFeedbacksForVeterinarian = async ({
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
    `${
      import.meta.env.VITE_API_URL
    }/feedbacks/veterinarians/?${params.toString()}`,
  );
};

export const createFeedback = async ({
  rating,
  comment,
  appointment,
  verify,
}) => {
  return axiosInstance.post(`${import.meta.env.VITE_API_URL}/feedbacks`, {
    rating,
    comment,
    appointment,
    verify,
  });
};

export const updateFeedback = async (id, { rating, comment, verify }) => {
  try {
    const response = await axiosInstance.patch(
      `/feedbacks/${id}`,
      {
        rating,
        comment,
        verify,
      },
      {
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
      },
    );

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du paiement : ", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour du commentaire",
    };
  }
};

export const deleteFeedback = async (id) => {
  return axiosInstance.delete(
    `${import.meta.env.VITE_API_URL}/feedbacks/${id}`,
  );
};
