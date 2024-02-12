import axiosInstance from "@/utils/axiosInstance.js";

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