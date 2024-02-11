import { useMemo, useState } from "react";
import Header from "@/components/molecules/Calendar/Header.jsx";
import Month from "@/components/molecules/Calendar/Views/Month.jsx";
import Week from "@/components/molecules/Calendar/Views/Week.jsx";
import Year from "@/components/molecules/Calendar/Views/Year.jsx";
import Day from "@/components/molecules/Calendar/Views/Day.jsx";

export default function Calendar({ view = "week", addEvent }) {
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
          <Day date={currentDate} setDate={setCurrentDate} />
        )}
        {currentView === "week" && (
          <Week date={currentDate} setDate={setCurrentDate} />
        )}
        {currentView === "month" && (
          <Month date={currentDate} setDate={setCurrentDate} />
        )}
        {currentView === "year" && (
          <Year date={currentDate} setDate={setCurrentDate} />
        )}
      </div>
    );
  }, [currentView, currentDate]);
}
