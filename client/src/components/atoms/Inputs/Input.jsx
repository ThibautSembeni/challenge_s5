import PropTypes from "prop-types";
import TextInput from "@/components/atoms/Inputs/Text.jsx";
import EmailInput from "@/components/atoms/Inputs/Email.jsx";
import TelephoneInput from "@/components/atoms/Inputs/Telephone.jsx";

export default function Input({ type, ...props }) {
  switch (type) {
    case "text":
      return <TextInput {...props} />;
    case "email":
      return <EmailInput {...props} />;
    case "tel":
      return <TelephoneInput {...props} />;
    default:
      return <TextInput {...props} />;
  }
}

Input.propTypes = {
  type: PropTypes.string,
};
