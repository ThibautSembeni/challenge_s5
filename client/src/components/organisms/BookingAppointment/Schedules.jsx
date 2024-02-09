import { Disclosure, RadioGroup } from "@headlessui/react";
import Select from "@/components/atoms/Select/index.jsx";
import { useEffect, useMemo, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid/index.js";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "numeric",
  minute: "2-digit",
  hour12: false,
});
export default function Schedules({ schedules }) {
  const [currentSelected, setCurrentSelected] = useState("");
  const schedulesList = useMemo(() => {
    return Object.entries(
      schedules.reduce((acc, schedule) => {
        const startTime = new Date(schedule.startTime);
        const year = startTime.getFullYear();
        const month = startTime.getMonth() + 1; // Months are zero-based
        const day = startTime.getDate();
        const dateKey = `${year}-${month}-${day}`;
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push({
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          id: schedule["@id"],
        });
        return acc;
      }, {}),
    )
      .sort(([dateKeyA], [dateKeyB]) => {
        const startTimeA = new Date(dateKeyA);
        const startTimeB = new Date(dateKeyB);
        return startTimeA - startTimeB;
      })
      .reduce((acc, [dateKey, schedules]) => {
        acc[dateKey] = schedules;
        return acc;
      }, {});
  }, [schedules]);

  return useMemo(() => {
    return (
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Créneaux de consultation
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Choisissez la date de consultation
            </p>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-6 rounded-2xl bg-white p-2">
              <RadioGroup
                // value={currentSelected}
                // onChange={setCurrentSelected}
                name={"schedule"}
                className="mt-2 flex flex-col gap-2"
              >
                {Object.entries(schedulesList).map(([key, value]) => {
                  return (
                    <>
                      <Disclosure>
                        <RadioGroup.Label className="sr-only">
                          Choisissez la date de consultation
                        </RadioGroup.Label>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                          <span>
                            {new Date(key).toLocaleDateString("fr-FR", options)}
                          </span>
                          {/*<ChevronRightIcon*/}
                          {/*  className={open ? "rotate-90 transform" : ""}*/}
                          {/*/>*/}
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                            {value.map((time) => {
                              const date = new Date(time.startTime);
                              return (
                                <RadioGroup.Option
                                  key={time.startTime}
                                  value={time}
                                  className={({ active, checked }) =>
                                    classNames(
                                      active
                                        ? "ring-2 ring-blue-600 ring-offset-2"
                                        : "",
                                      checked
                                        ? "bg-blue-600 text-white hover:bg-blue-500"
                                        : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                                      "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1",
                                    )
                                  }
                                >
                                  <RadioGroup.Label as="span">
                                    {timeFormatter.format(date)}
                                  </RadioGroup.Label>
                                </RadioGroup.Option>
                              );
                            })}
                          </div>
                        </Disclosure.Panel>
                      </Disclosure>
                    </>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }, [schedulesList]);
}
