import axiosInstance from "@/utils/axiosInstance.js";

export const getAllPets = async () => {
    return axiosInstance.get(`/pets`);
};