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
