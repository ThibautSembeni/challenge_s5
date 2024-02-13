import SecondaryText from "@/components/atoms/Select/secondary-text.jsx";
import PrimaryText from "@/components/atoms/Select/primary-text.jsx";

export default function Select({
  type,
  list = [],
  selected,
  label,
  name,
  ...props
}) {
  if (type === "secondary-text") {
    return (
      <SecondaryText
        list={list}
        label={label}
        name={name}
        selected={selected}
        {...props}
      />
    );
  } else if (type === "primary-text") {
    return (
      <PrimaryText
        list={list}
        label={label}
        name={name}
        selected={selected}
        {...props}
      />
    );
  }
}
