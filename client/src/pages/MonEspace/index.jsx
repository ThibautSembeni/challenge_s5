import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Sidebar from "@/components/molecules/Sidebar/index.jsx";
import { useLocation } from "react-router-dom";
import { Icon } from "@/components/atoms/Icons/_index.jsx";
import MyPets from "@/pages/MonEspace/mes-animaux/index.jsx";

const navigation = [
  { name: "Dashboard", href: "/mon-espace", icon: HomeIcon, current: true },
  {
    name: "Mes animaux",
    href: "/mon-espace/mes-animaux",
    icon: () => <Icon icon="pets" />,
    current: false,
  },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];
export default function MonEspace() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // use location of react router dom
  const location = useLocation();

  return (
    <>
      <div>
        <Sidebar
          navigation={navigation}
          topBarDisplay={true}
          topBarUserNavigation={userNavigation}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        >
          {location.pathname === "/mon-espace" && <h1>bonjour</h1>}
          {location.pathname === "/mon-espace/mes-animaux" && <MyPets />}
        </Sidebar>
      </div>
    </>
  );
}
