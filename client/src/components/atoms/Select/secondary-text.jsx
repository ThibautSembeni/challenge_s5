import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// const list = [
//   { value: '', primaryText: "Wade Cooper", secondaryText: "@wadecooper" },
//   { value: '', primaryText: "Arlene Mccoy", secondaryText: "@arlenemccoy" },
//   { value: '', primaryText: "Devon Webb", secondaryText: "@devonwebb" },
//   { value: '', primaryText: "Tom Cook", secondaryText: "@tomcook" },
//   { value: '', primaryText: "Tanya Fox", secondaryText: "@tanyafox" },
//   { value: '', primaryText: "Hellen Schmidt", secondaryText: "@hellenschmidt" },
//   { value: '', primaryText: "Caroline Schultz", secondaryText: "@carolineschultz" },
//   { value: '', primaryText: "Mason Heaney", secondaryText: "@masonheaney" },
//   { value: '', primaryText: "Claudie Smitham", secondaryText: "@claudiesmitham" },
//   { value: '', primaryText: "Emil Schaefer", secondaryText: "@emilschaefer" },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SecondaryText({ list, selected = "", label, name }) {
  const [currentSelected, setSelected] = useState(selected);

  return (
    <Listbox value={currentSelected} onChange={setSelected} name={name}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="inline-flex w-full truncate">
                <span className="truncate">
                  {list.find((opt) => opt.value === selected).primaryText}
                </span>
                <span className="ml-2 truncate text-gray-500">
                  {list.find((opt) => opt.value === selected).secondaryText}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {list.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={option.value}
                  >
                    {({ currentSelected, active }) => (
                      <>
                        <div className="flex">
                          <span
                            className={classNames(
                              currentSelected ? "font-semibold" : "font-normal",
                              "truncate",
                            )}
                          >
                            {option.primaryText}
                          </span>
                          <span
                            className={classNames(
                              active ? "text-indigo-200" : "text-gray-500",
                              "ml-2 truncate",
                            )}
                          >
                            {option.secondaryText}
                          </span>
                        </div>

                        {currentSelected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
