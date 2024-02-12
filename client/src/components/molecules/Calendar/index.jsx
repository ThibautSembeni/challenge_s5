import { useMemo, useState } from "react";
import Header from "@/components/molecules/Calendar/Header.jsx";
import Month from "@/components/molecules/Calendar/Views/Month.jsx";
import Week from "@/components/molecules/Calendar/Views/Week.jsx";
import Year from "@/components/molecules/Calendar/Views/Year.jsx";
import Day from "@/components/molecules/Calendar/Views/Day.jsx";
import Modal from "@/components/organisms/Modal/Modal.jsx";

export default function Calendar({ view = "week", addEvent, schedules }) {
  const [currentView, setCurrentView] = useState(view);
  const [currentDate, setCurrentDate] = useState(new Date());
  return useMemo(() => {
    return (
      <div className="flex h-full flex-col">
        <Header
          view={currentView}
          setView={setCurrentView}
          date={currentDate}
          setDate={setCurrentDate}
          addEvent={addEvent}
        />
        {currentView === "day" && (
          <Day
            date={currentDate}
            setDate={setCurrentDate}
            locale={"fr-FR"}
            schedules={schedules}
          />
        )}
        {currentView === "week" && (
          <Week
            date={currentDate}
            setDate={setCurrentDate}
            locale={"fr-FR"}
            schedules={schedules}
            setView={setCurrentView}
          />
        )}
        {currentView === "month" && (
          <Month
            date={currentDate}
            setDate={setCurrentDate}
            locale={"fr-FR"}
            schedules={schedules}
            setView={setCurrentView}
          />
        )}
        {currentView === "year" && (
          <Year
            date={currentDate}
            setDate={setCurrentDate}
            locale={"fr-FR"}
            schedules={schedules}
            setView={setCurrentView}
          />
        )}
      </div>
    );
  }, [currentView, currentDate, schedules]);
}
