import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid/index.js";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useMemo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const selectViews = {
  day: { label: "Day view" },
  week: { label: "Week view" },
  month: { label: "Month view" },
  year: { label: "Year view" },
};
const selectDate = {
  day: { before: "Previous day", next: "Next day" },
  week: { before: "Previous week", next: "Next week" },
  month: {
    before: "Previous month",
    next: "Next month",
  },
  year: { before: "Previous year", next: "Next year" },
};

Date.prototype.startOfWeek = function () {
  const diff = (this.getDay() + 6) % 7; // Ajuster le jour de la semaine (0 = Dimanche, 1 = Lundi, ..., 6 = Samedi)
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() - diff);
};

Date.prototype.endOfWeek = function () {
  const startOfWeek = this.startOfWeek();
  return new Date(
    startOfWeek.getFullYear(),
    startOfWeek.getMonth(),
    startOfWeek.getDate() + 6,
  );
};

const getSelectedDateDisplayLabel = (date, view, locale) => {
  switch (view) {
    case "day":
      return date.toLocaleDateString(locale, {
        day: "numeric",
        month: "short",
      });
    case "week":
      const startOfWeek = date.startOfWeek();
      const endOfWeek = date.endOfWeek();
      return `${startOfWeek.toLocaleDateString(locale, {
        day: "numeric",
        month: "short",
      })} - ${endOfWeek.toLocaleDateString(locale, {
        day: "numeric",
        month: "short",
      })}`;
    case "month":
      return date.toLocaleDateString(locale, {
        month: "long",
        year: "numeric",
      });
    case "year":
      return date.toLocaleDateString(locale, { year: "numeric" });
    default:
      return "";
  }
};

const getDisplayLabel = (date, view, locale) => {
  switch (view) {
    case "day":
      return date.toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    case "week":
    case "month":
      return date.toLocaleDateString(locale, {
        month: "long",
        year: "numeric",
      });
    case "year":
      return date.toLocaleDateString(locale, { year: "numeric" });
    default:
      return "";
  }
};

export default function Header({
  view,
  setView,
  date,
  setDate,
  addEvent,
  locale = "fr-FR",
}) {
  const currentSelectedView = useMemo(() => selectViews[view], [view]);
  const currentSelectedDate = useMemo(() => selectDate[view], [view]);
  const currentSelectedDateDisplayLabel = useMemo(
    () => getSelectedDateDisplayLabel(date, view, locale),
    [date, view, locale],
  );
  const currentDisplayLabel = useMemo(
    () => getDisplayLabel(date, view, locale),
    [date, view, locale],
  );
  const changeDate = useCallback(
    (amount) => {
      switch (view) {
        case "day":
          setDate((prevDate) => {
            let newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + amount);
            return newDate;
          });
          break;
        case "week":
          setDate((prevDate) => {
            let newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 7 * amount);
            return newDate;
          });
          break;
        case "month":
          setDate((prevDate) => {
            let newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
          });
          break;
        case "year":
          setDate((prevDate) => {
            let newDate = new Date(prevDate);
            newDate.setFullYear(newDate.getFullYear() + amount);
            return newDate;
          });
          break;
        default:
          break;
      }
    },
    [view],
  );

  return (
    <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        <time dateTime={date.toISOString().slice(0, 7)}>
          {currentDisplayLabel}
        </time>{" "}
      </h1>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            onClick={() => changeDate(-1)}
          >
            <span className="sr-only">{currentSelectedDate.before}</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
          >
            {currentSelectedDateDisplayLabel}
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            onClick={() => changeDate(1)}
          >
            <span className="sr-only">{currentSelectedDate.after}</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:ml-4 md:flex md:items-center">
          <Menu as="div" className="relative">
            <Menu.Button
              type="button"
              className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {currentSelectedView.label}
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {Object.entries(selectViews).map(([viewName, { label }]) => (
                    <Menu.Item key={viewName}>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm w-full text-left",
                          )}
                          onClick={() => setView(viewName)}
                        >
                          {label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {addEvent && (
            <>
              <div className="ml-6 h-6 w-px bg-gray-300" />
              <button
                type="button"
                className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={addEvent}
              >
                Ajouter un événement
              </button>
            </>
          )}
        </div>
        <Menu as="div" className="relative ml-6 md:hidden">
          <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Ouvrir le menu</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {addEvent && (
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm w-full text-left",
                        )}
                        onClick={addEvent}
                      >
                        Créer un événement
                      </button>
                    )}
                  </Menu.Item>
                </div>
              )}
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left",
                      )}
                      onClick={() => setDate(new Date())}
                    >
                      Go to today
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                {Object.entries(selectViews).map(([viewName, { label }]) => (
                  <Menu.Item key={viewName}>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm w-full text-left",
                        )}
                        onClick={() => setView(viewName)}
                      >
                        {label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}
