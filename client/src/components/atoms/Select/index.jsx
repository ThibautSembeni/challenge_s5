import SecondaryText from "@/components/atoms/Select/secondary-text.jsx";

export default function Select({ type, list = [], selected, label, name }) {
  if (type === "secondary-text") {
    return (
      <SecondaryText
        list={list}
        label={label}
        name={name}
        selected={selected}
      />
    );
  }
}
