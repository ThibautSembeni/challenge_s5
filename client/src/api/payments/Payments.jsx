import axiosInstance from "@/utils/axiosInstance.js";
import axios from "axios";

export const getAllPayments = async ({
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
    `${import.meta.env.VITE_API_URL}/payments?${params.toString()}`,
  );
};

export const updateOnePayments = async (id, { amount, status }) => {
  try {
    const response = await axiosInstance.patch(
      `/payments/${id}`,
      {
        amount,
        status,
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
      message: "Une erreur est survenue lors de la mise à jour du paiement",
    };
  }
};

export const createPayments = async ({ paymentMethod }) => {
  try {
    const payment = await axiosInstance.post(`/create-payments`, {
      paymentMethod,
    });

    return { success: true, payment };
  } catch (error) {
    return {
      success: false,
      message: "Une erreur est survenue lors du paiement",
    };
  }
};
