import { useEffect, useMemo, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import MiniCalendar from "@/components/molecules/Calendar/MiniCalendar.jsx";
import Event from "@/components/molecules/Calendar/Events/index.jsx";
import {
  filterSchedules,
  getTimeLabels,
  EventItem,
} from "@/components/molecules/Calendar/Helper/index.jsx";

function DayButton({ day, date, locale, onClick }) {
  const dayNames = [...Array(7).keys()].map(
    (_, i) =>
      new Intl.DateTimeFormat(locale, { weekday: "long" }).format(
        new Date(1970, 0, i + 4),
      )[0],
  );
  const dayName = dayNames[day.getDay()];
  const isToday =
    day.getDate() === date.getDate() &&
    day.getMonth() === date.getMonth() &&
    day.getFullYear() === date.getFullYear();
  const isSelected =
    day.getDate() === new Date().getDate() &&
    day.getMonth() === new Date().getMonth() &&
    day.getFullYear() === new Date().getFullYear();
  const dayClass = isSelected
    ? "bg-gray-900 text-white"
    : isToday
    ? "text-indigo-600"
    : "text-gray-900";

  return (
    <button
      type="button"
      className="flex flex-col items-center pb-1.5 pt-3"
      onClick={onClick}
    >
      <span>{dayName}</span>
      <span
        className={`mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold ${dayClass}`}
      >
        {day.getDate()}
      </span>
    </button>
  );
}

export default function Day({ date, setDate, locale = "fr-FR", schedules }) {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const timeLabels = useMemo(() => getTimeLabels(locale), [locale]);
  const filteredSchedules = useMemo(
    () => filterSchedules(schedules, date, "day"),
    [schedules, date],
  );

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  return (
    <div className="isolate flex flex-auto overflow-hidden bg-white">
      <div ref={container} className="flex flex-auto flex-col overflow-auto">
        <div
          ref={containerNav}
          className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
        >
          {[...Array(7)].map((_, i) => {
            const day = new Date(date);
            day.setDate(date.getDate() - date.getDay() + i);
            return (
              <DayButton
                key={i}
                day={day}
                date={date}
                locale={locale}
                onClick={() => setDate(day)}
              />
            );
          })}
        </div>
        <div className="flex w-full flex-auto">
          <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            {/* Horizontal lines */}
            <div
              className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
              style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
            >
              <div ref={containerOffset} className="row-end-1 h-7"></div>
              {timeLabels.map((timeLabel, index) => (
                <>
                  <div key={index}>
                    <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      {timeLabel}
                    </div>
                  </div>
                  <div />
                </>
              ))}
            </div>

            {/* Events */}
            <ol
              className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
              style={{
                gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
              }}
            >
              {filteredSchedules.map((event, index) => (
                <EventItem
                  key={index}
                  event={event}
                  status={
                    event.hasOwnProperty("appointments")
                      ? event.appointments.status
                      : "free"
                  }
                  title={
                    event.hasOwnProperty("appointments") &&
                    `RDV avec ${event.appointments.userID.firstname} ${event.appointments.userID.lastname}`
                  }
                  description={
                    event.hasOwnProperty("appointments") &&
                    `Pour ${event.appointments.service.description}`
                  }
                  view="day"
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
      <MiniCalendar
        date={date}
        setDate={setDate}
        canSwitchMonth={true}
        locale={locale}
      />
    </div>
  );
}
