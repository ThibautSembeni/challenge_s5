import { Fragment, useMemo } from "react";
import { ClockIcon } from "@heroicons/react/20/solid";
import {
  filterSchedules,
  generateDaysOfWeek,
  getDaysOfMonth,
} from "@/components/molecules/Calendar/Helper/index.jsx";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Month({ date, setDate, locale = "fr-FR", schedules }) {
  const days = useMemo(() => getDaysOfMonth(date), [date]);
  const daysOfWeek = useMemo(
    () => generateDaysOfWeek(locale, "long"),
    [locale],
  );
  const filteredSchedules = useMemo(
    () => filterSchedules(schedules, date, "month"),
    [schedules, date],
  );

  console.log(filteredSchedules);

  return (
    <>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className="bg-white py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day) => (
              <div
                key={day.date}
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                  "relative px-3 py-2",
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    day.isToday
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                      : undefined
                  }
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
                {filteredSchedules.filter(
                  (schedule) =>
                    new Date(schedule.startTime).toISOString().split("T")[0] ===
                      new Date(day.date).toISOString().split("T")[0] &&
                    schedule.hasOwnProperty("appointments"),
                ).length > 0 && (
                  <ol className="mt-2">
                    {filteredSchedules
                      .filter(
                        (schedule) =>
                          new Date(schedule.startTime)
                            .toISOString()
                            .split("T")[0] ===
                            new Date(day.date).toISOString().split("T")[0] &&
                          schedule.hasOwnProperty("appointments"),
                      )
                      .slice(0, 2)
                      .map((event) => (
                        <li key={event["@id"]}>
                          <a href={"#"} className="group flex">
                            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                              RDV avec {event.appointments.userID.firstname}
                              {event.appointments.userID.lastname}
                            </p>
                            <time
                              dateTime={event.startTime}
                              className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                            >
                              {event.startTime}
                            </time>
                          </a>
                        </li>
                      ))}
                    {filteredSchedules.filter(
                      (schedule) =>
                        new Date(schedule.startTime)
                          .toISOString()
                          .split("T")[0] ===
                          new Date(day.date).toISOString().split("T")[0] &&
                        schedule.hasOwnProperty("appointments"),
                    ).length > 2 && (
                      <li className="text-gray-500">
                        +{" "}
                        {filteredSchedules.filter(
                          (schedule) =>
                            new Date(schedule.startTime)
                              .toISOString()
                              .split("T")[0] ===
                              new Date(day.date).toISOString().split("T")[0] &&
                            schedule.hasOwnProperty("appointments"),
                        ).length - 2}{" "}
                        more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && day.isToday && "text-indigo-600",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-500",
                  "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10",
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected &&
                      "flex h-6 w-6 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-indigo-600",
                    day.isSelected && !day.isToday && "bg-gray-900",
                    "ml-auto",
                  )}
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
                {/*<span className="sr-only">{day?.events?.length} events</span>*/}
                {/*{filteredSchedules.filter(
                  (schedule) =>
                    new Date(schedule.startTime).toISOString().split("T")[0] ===
                      new Date(day.date).toISOString().split("T")[0] &&
                    schedule.hasOwnProperty("appointments"),
                ).length > 0 && (*/}
                {/*  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">*/}
                {/*    {filteredSchedules.filter(
                  (schedule) =>
                    new Date(schedule.startTime).toISOString().split("T")[0] ===
                      new Date(day.date).toISOString().split("T")[0] &&
                    schedule.hasOwnProperty("appointments"),
                ).map((event) => (*/}
                {/*      <span*/}
                {/*        key={event.id}*/}
                {/*        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"*/}
                {/*      />*/}
                {/*    ))}*/}
                {/*  </span>*/}
                {/*)}*/}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/*{selectedDay?.events.length > 0 && (*/}
      {/*  <div className="px-4 py-10 sm:px-6 lg:hidden">*/}
      {/*    <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">*/}
      {/*      {selectedDay.events.map((event) => (*/}
      {/*        <li*/}
      {/*          key={event.id}*/}
      {/*          className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"*/}
      {/*        >*/}
      {/*          <div className="flex-auto">*/}
      {/*            <p className="font-semibold text-gray-900">{event.name}</p>*/}
      {/*            <time*/}
      {/*              dateTime={event.datetime}*/}
      {/*              className="mt-2 flex items-center text-gray-700"*/}
      {/*            >*/}
      {/*              <ClockIcon*/}
      {/*                className="mr-2 h-5 w-5 text-gray-400"*/}
      {/*                aria-hidden="true"*/}
      {/*              />*/}
      {/*              {event.time}*/}
      {/*            </time>*/}
      {/*          </div>*/}
      {/*          <a*/}
      {/*            href={event.href}*/}
      {/*            className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"*/}
      {/*          >*/}
      {/*            Edit<span className="sr-only">, {event.name}</span>*/}
      {/*          </a>*/}
      {/*        </li>*/}
      {/*      ))}*/}
      {/*    </ol>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}
