import axiosInstance from "@/utils/axiosInstance.js";

export const getFreeSchedules = async (veterinarian_id) => {
  return axiosInstance.get(`/veterinarians/${veterinarian_id}/schedules`);
};

export const getSchedules = async () => {
  return axiosInstance.get(`/schedules`);
};
