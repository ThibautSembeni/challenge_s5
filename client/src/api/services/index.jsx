import axiosInstance from "@/utils/axiosInstance.js";

export const getAllServices = async (veterinarian_id) => {
  return axiosInstance.get(`/veterinarians/${veterinarian_id}/services`);
};
export const getAllServicesFromVeterinarian = async () => {
  return axiosInstance.get(`/services`);
};

export const createServices = async ({ description, price }) => {
  return axiosInstance.post(`/services`, {
    description,
    price,
  });
};

export const getOneService = async (id) => {
  return axiosInstance.get(`/services/${id}`);
};

export const updateServices = async (id, { description, price }) => {
  return axiosInstance.put(`/services/${id}`, { description, price });
};

export const deleteServices = async (id) => {
  return axiosInstance.delete(`/services/${id}`);
};
