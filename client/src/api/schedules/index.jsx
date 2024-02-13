import axiosInstance from "@/utils/axiosInstance.js";

export const getFreeSchedules = async (veterinarian_id) => {
  return axiosInstance.get(`/veterinarians/${veterinarian_id}/schedules`);
};

export const generateSchedules = async (
  veterinarian_id,
  { start_date, end_date },
) => {
  return axiosInstance.post(
    `/veterinarians/${veterinarian_id}/generate-schedules`,
    {
      start_date,
      end_date,
    },
  );
};

export const getSchedules = async () => {
  return axiosInstance.get(`/schedules`);
};
