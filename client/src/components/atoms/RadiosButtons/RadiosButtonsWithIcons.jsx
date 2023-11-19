import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ICONS = {
  PencilSquareIcon: PencilSquareIcon,
  DocumentDuplicateIcon: DocumentDuplicateIcon,
  ArchiveBoxIcon: ArchiveBoxIcon,
  ArrowRightCircleIcon: ArrowRightCircleIcon,
  UserPlusIcon: UserPlusIcon,
  HeartIcon: HeartIcon,
  TrashIcon: TrashIcon,
  ArrowLeftOnRectangleIcon: ArrowLeftOnRectangleIcon,
};

// Usage:
// options: [
//   [{ name: "Edit", type: "link", iconName?: "PencilSquareIcon", to: "edit", className: '' }], // section 1
//   [
//     {
//       name: "Logout",
//       type: "button",
//       onClick: () => {},
//       iconName?: "PencilSquareIcon",
//       className: '',
//     },
//   ], // section 2
// ];
export default function RadiosButtonsWithIcons({
  placeholder = "Options",
  options = [],
  className = "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
}) {
  return (
    <Menu as="div" className={`relative inline-block text-left text-center`}>
      <div>
        <Menu.Button className={`${className}`}>
          {placeholder}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((section, index) => {
            return (
              <div className="py-1" key={index}>
                {section.map((item) => {
                  return (
                    <Menu.Item key={item.name}>
                      {({ active }) => {
                        const IconComponent =
                          ICONS[item.iconName] || PencilSquareIcon;
                        if (item.type === "link") {
                          return (
                            <Link
                              to={item.to}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "group flex items-center px-4 py-2 text-sm",
                                `${item.className}`,
                              )}
                            >
                              {item.iconName && (
                                <IconComponent
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                              {item.name}
                            </Link>
                          );
                        } else if (item.type === "button") {
                          return (
                            <button
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "group flex items-center px-4 py-2 text-sm w-full",
                                `${item.className}`,
                              )}
                              onClick={item.onClick}
                            >
                              {item.iconName && (
                                <IconComponent
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                              {item.name}
                            </button>
                          );
                        }
                      }}
                    </Menu.Item>
                  );
                })}
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
