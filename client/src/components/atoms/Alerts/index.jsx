import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import Success from "@/components/atoms/Alerts/Success.jsx";
import Warning from "@/components/atoms/Alerts/Warning.jsx";
import Error from "@/components/atoms/Alerts/Error.jsx";
import Info from "@/components/atoms/Alerts/Info.jsx";

export default function Alert({ title, type, content, actions, close }) {
  if (type === "success") {
    return <Success title={title} close={close} />;
  } else if (type === "warning") {
    return <Warning title={title} close={close} />;
  } else if (type === "error") {
    return <Error title={title} close={close} />;
  } else if (type === "info") {
    return <Info title={title} />;
  }
}
