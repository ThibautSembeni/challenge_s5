import { Fragment, useMemo } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import MiniCalendar from "@/components/molecules/Calendar/MiniCalendar.jsx";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getAllMonthsInYear(year, locale) {
  const months = [];
  for (let month = 0; month <= 11; month++) {
    const date = new Date(year, month, 1);
    const name = date.toLocaleString(locale, { month: "long" });
    months.push({ date, name });
  }
  return months;
}

export default function Year({ date, setDate, locale = "fr-FR", schedules }) {
  const months = useMemo(() => {
    return getAllMonthsInYear(date.getFullYear(), locale);
  }, [date]);

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-3">
        {months.map((month) => (
          <MiniCalendar
            date={month.date}
            setDate={setDate}
            canSwitchMonth={false}
            locale={locale}
            className={"w-full"}
          />
        ))}
      </div>
    </div>
  );
}
