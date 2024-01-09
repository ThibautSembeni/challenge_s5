import Simple from "@/components/atoms/Navigation/Simple.jsx";
import Panels from "@/components/atoms/Navigation/Panels.jsx";

export default function Navigation({ type, steps = [] }) {
  if (type === "simple") {
    return <Simple steps={steps} />;
  } else if (type === "panels") {
    return <Panels steps={steps} />;
  }
}
