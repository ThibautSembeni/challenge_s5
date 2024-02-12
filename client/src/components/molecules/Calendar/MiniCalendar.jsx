import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid/index.js";
import { useMemo } from "react";
import {
  generateDaysOfWeek,
  getDaysOfMonth,
} from "@/components/molecules/Calendar/Helper/index.jsx";
import "@/utils/date";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MiniCalendar({
  date,
  setDate,
  canSwitchMonth = false,
  locale = "fr-FR",
  className,
  schedules,
  onClick,
}) {
  const days = useMemo(() => getDaysOfMonth(date), [date]);
  const daysOfWeek = useMemo(
    () => generateDaysOfWeek(locale, "short"),
    [locale],
  );
  return useMemo(() => {
    return (
      <div
        className={`hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block ${className}`}
      >
        <div className="flex items-center text-center text-gray-900">
          {canSwitchMonth && (
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={() =>
                setDate((prevDate) => {
                  let newDate = new Date(prevDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  return newDate;
                })
              }
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          <div className="flex-auto text-sm font-semibold">
            {date.toLocaleDateString(locale, {
              month: "long",
              year: "numeric",
            })}
          </div>
          {canSwitchMonth && (
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={() =>
                setDate((prevDate) => {
                  let newDate = new Date(prevDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  return newDate;
                })
              }
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          {daysOfWeek.map((day, idx) => (
            <div key={idx}>{day}</div>
          ))}
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {days.map((day, dayIdx) => (
            <button
              key={dayIdx}
              type="button"
              className={classNames(
                "py-1.5 hover:bg-gray-100 focus:z-10",
                day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                (day.isSelected || day.isToday) && "font-semibold",
                day.isSelected && "text-white",
                !day.isSelected &&
                  day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-900",
                !day.isSelected &&
                  !day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-400",
                day.isToday && !day.isSelected && "text-indigo-600",
                dayIdx === 0 && "rounded-tl-lg",
                dayIdx === 6 && "rounded-tr-lg",
                dayIdx === days.length - 7 && "rounded-bl-lg",
                dayIdx === days.length - 1 && "rounded-br-lg",
              )}
              disabled={!canSwitchMonth && !day.isCurrentMonth}
              onClick={() => {
                setDate(new Date(day.date));
                onClick && onClick();
              }}
            >
              <time
                dateTime={day.date}
                className={classNames(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                  day.isSelected && day.isToday && "bg-indigo-600",
                  day.isSelected && !day.isToday && "bg-gray-900",
                )}
              >
                {day.date.split("-").pop().replace(/^0/, "")}
              </time>
            </button>
          ))}
        </div>
      </div>
    );
  }, [date, locale]);
}
