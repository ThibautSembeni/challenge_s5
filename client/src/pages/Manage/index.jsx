import { Fragment, useState } from "react";
import { CalendarIcon, HomeIcon } from "@heroicons/react/24/outline";

import Sidebar from "@/components/molecules/Sidebar/index.jsx";
import { useLocation } from "react-router-dom";
import Calendar from "@/components/molecules/Calendar/index.jsx";

const navigation = [
  { name: "Dashboard", href: "/manage", icon: HomeIcon, current: true },
  {
    name: "Calendar",
    href: "/manage/calendar",
    icon: CalendarIcon,
    current: false,
  },
];

const userNavigation = [{ name: "Sign out", href: "/logout" }];
export default function Manage({ type = "dashboard" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
          {type === "dashboard" && "Dashboard"}
          {type === "calendar" && <Calendar view={"day"} />}
        </Sidebar>
      </div>
    </>
  );
}
