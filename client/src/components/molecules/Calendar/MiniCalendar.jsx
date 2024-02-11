import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid/index.js";
import { useMemo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function getDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDay();

  const days = [];
  for (let i = 1; i <= firstDayOfMonth; i++) {
    days.push({
      date: `${year}-${month.toString().padStart(2, "0")}-${(
        daysInPrevMonth -
        firstDayOfMonth +
        i
      )
        .toString()
        .padStart(2, "0")}`,
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const day = {
      date: `${year}-${(month + 1).toString().padStart(2, "0")}-${i
        .toString()
        .padStart(2, "0")}`,
      isCurrentMonth: true,
    };
    if (i === new Date().getDate()) day.isToday = true;
    if (i === date.getDate()) day.isSelected = true; // replace 22 with the selected day
    days.push(day);
  }
  for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
    days.push({
      date: `${year}-${(month + 2).toString().padStart(2, "0")}-${i
        .toString()
        .padStart(2, "0")}`,
    });
  }
  return days;
}
export default function MiniCalendar({
  date,
  setDate,
  canSwitchMonth = false,
}) {
  const days = useMemo(() => getDays(date), [date]);
  return useMemo(() => {
    return (
      <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
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
            {date.toLocaleDateString("fr-FR", {
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
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {days.map((day, dayIdx) => (
            <button
              key={day.date}
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
              onClick={() => setDate(new Date(day.date))}
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
  }, [date]);
}
