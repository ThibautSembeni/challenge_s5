import axiosInstance from "@/utils/axiosInstance.js";

export const getAllServices = async (veterinarian_id) => {
  return axiosInstance.get(`/veterinarians/${veterinarian_id}/services`);
};