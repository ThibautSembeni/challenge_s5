import { useEffect, useMemo, useRef } from "react";
import {
  EventItem,
  filterSchedules,
  getTimeLabels,
} from "@/components/molecules/Calendar/Helper/index.jsx";
import "@/utils/date";

function getDaysBetweenDates(start, end, locale) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const today = new Date();
  const days = [];

  while (startDate <= endDate) {
    const dayOfWeek = new Intl.DateTimeFormat(locale, {
      weekday: "short",
    }).format(startDate);
    const isToday =
      startDate.getDate() === today.getDate() &&
      startDate.getMonth() === today.getMonth() &&
      startDate.getFullYear() === today.getFullYear();

    days.push({
      date: new Date(startDate),
      label: dayOfWeek,
      isToday: isToday,
    });

    startDate.setDate(startDate.getDate() + 1);
  }

  return days;
}

export default function Week({
  date,
  setDate,
  locale = "fr-FR",
  schedules,
  setView,
}) {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);
  const days = useMemo(() => {
    date = new Date(date);
    return getDaysBetweenDates(date.startOfWeek(), date.endOfWeek(), locale);
  }, [date]);
  const timeLabels = useMemo(() => getTimeLabels(locale), [locale]);

  const filteredSchedules = useMemo(
    () => filterSchedules(schedules, date, "week"),
    [schedules, date],
  );

  console.log(filteredSchedules);
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
    <div
      ref={container}
      className="isolate flex flex-auto flex-col overflow-auto bg-white"
    >
      <div
        style={{ width: "165%" }}
        className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
      >
        <div
          ref={containerNav}
          className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
        >
          <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
            {days.map((day, i) => (
              <button
                key={i}
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
                onClick={() => {
                  setDate(new Date(day.date));
                  setView("day");
                }}
              >
                {day.label}{" "}
                <span
                  className={`mt-1 flex h-8 w-8 items-center justify-center font-semibold ${
                    day.isToday
                      ? "rounded-full bg-indigo-600 text-white"
                      : "text-gray-900"
                  }`}
                >
                  {day.date.getDate()}
                </span>
              </button>
            ))}
          </div>

          <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
            <div className="col-end-1 w-14" />
            {days.map((day, i) => (
              <div
                className="flex items-center justify-center py-3 cursor-pointer"
                key={i}
                onClick={() => {
                  setDate(new Date(day.date));
                  setView("day");
                }}
              >
                <span className={`${day.isToday && "flex items-baseline"}`}>
                  {day.label}{" "}
                  <span
                    className={`items-center justify-center font-semibold ${
                      day.isToday
                        ? "rounded-full bg-indigo-600 text-white ml-1.5 flex h-8 w-8"
                        : "text-gray-900"
                    }`}
                  >
                    {day.date.getDate()}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-auto">
          <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            {/* Horizontal lines */}
            <div
              className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
              style={{
                gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))",
              }}
            >
              <div ref={containerOffset} className="row-end-1 h-7"></div>
              {timeLabels.map((timeLabel, index) => (
                <>
                  <div key={index}>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      {timeLabel}
                    </div>
                  </div>
                  <div />
                </>
              ))}
            </div>

            {/* Vertical lines */}
            <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
              <div className="col-start-1 row-span-full" />
              <div className="col-start-2 row-span-full" />
              <div className="col-start-3 row-span-full" />
              <div className="col-start-4 row-span-full" />
              <div className="col-start-5 row-span-full" />
              <div className="col-start-6 row-span-full" />
              <div className="col-start-7 row-span-full" />
              <div className="col-start-8 row-span-full w-8" />
            </div>

            {/* Events */}
            <ol
              className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
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
                  view="week"
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
