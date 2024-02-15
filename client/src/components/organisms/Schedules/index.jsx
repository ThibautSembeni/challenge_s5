import Calendar from "@/components/molecules/Calendar/index.jsx";
import { useEffect, useMemo, useState } from "react";
import { getSchedules } from "@/api/schedules/index.jsx";
import { getAllAppointmentsOfVeterinarian } from "@/api/appointments/index.jsx";

export default function Schedules({ view = "week", addEvent, veterinarian }) {
  const [schedules, setSchedules] = useState([]);
  const fetchSchedules = async () => {
    const response = await getSchedules();
    setSchedules(response.data["hydra:member"] || []);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return <Calendar view={view} addEvent={addEvent} schedules={schedules} />;
}
