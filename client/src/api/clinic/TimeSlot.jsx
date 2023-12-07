import axios from "axios";

export const createClinicSchedules = async ({
    startTime,
    endTime,
    isOpen
  }) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/time_slots`, {
    startTime,
    endTime,
    isOpen
  });
};