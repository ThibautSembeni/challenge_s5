import { useRef, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

const SIZES = ["s", "m", "l"];

export default function TextInput({
  className,
  name = "defaultName",
  label = "text",
  required = true,
  size = "s",
  isEmptyMessage = "Ce champ est obligatoire",
  value = "",
  onChange = (e) => {},
  onBlur = (e) => {},
  onFocus = (e) => {},
  disabled = false,
  pattern,
  minLength,
  maxLength,
  withIcon = false,
}) {
  const [beenFocused, setBeenFocused] = useState(false);
  const inputRef = useRef();

  const handleBlur = () => {
    if (value === "") setBeenFocused(true);
  };

  const handleSize = () => {
    switch (size) {
      case "s":
        return "px-2.5 pb-2 pt-3";
      case "m":
        return "px-3 pb-2 pt-4";
      case "l":
        return "px-4 pb-3 pt-4";
      default:
        return "px-2.5 pb-2 pt-3";
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        maxLength={maxLength}
        minLength={minLength}
        type="text"
        name={name}
        id={name}
        className={`block px-2.5 pb-1.5 pt-3 w-full text-sm text-black bg-transparent rounded-lg border border-1 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
          required && value === "" ? "bg-red-500" : "bg-green-500"
        }
        ${required && beenFocused && value === "" && "border-red-500"}
        ${handleSize()}
        ${disabled && "bg-gray-200"}
        ${className}`}
        defaultValue={value}
        onChange={onChange}
        onBlur={() => {
          handleBlur();
          onBlur();
        }}
        onFocus={onFocus}
        placeholder=" "
        disabled={disabled}
        // pattern={pattern}
      />
      <label
        htmlFor={name}
        className={`absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 ${
          required && beenFocused && value === ""
            ? "peer-placeholder-shown:top-[30%]"
            : "peer-placeholder-shown:top-1/2"
        } peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${
          disabled && "bg-gray-200"
        }`}
      >
        {label} {required && "*"}
      </label>

      {required && beenFocused && value === "" && (
        <p className="text-red-500 text-sm mt-2">{isEmptyMessage}</p>
      )}
      {withIcon && beenFocused && value !== "" && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              required && value === "" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {required && value !== "" && (
              <CheckCircleIcon className="text-white" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

TextInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  label: PropTypes.string,
  required: PropTypes.bool,
  isEmptyMessage: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  withIcon: PropTypes.bool,
};

TextInput.defaultProps = {
  name: "defaultName",
  size: "s",
  label: "text",
  required: true,
  isEmptyMessage: "Ce champ est obligatoire",
  disabled: false,
  withIcon: false,
};
