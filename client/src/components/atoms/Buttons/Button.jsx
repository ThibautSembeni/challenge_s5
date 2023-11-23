import { Icon } from "../Icons/Icon";
import { FontSize, IconName } from "@/components/atoms/_type.jsx";
import PropTypes from "prop-types";

const colorButton = ["black", "orange", "green", "red", "blue"];
const styledButton = ["filled", "bordered"];
const size = ["s", "m"];
const weight = ["book", "medium", "black"];
const type = ["primary", "secondary", "tertiary"];

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(type),
  styled: PropTypes.oneOf(styledButton),
  color: PropTypes.oneOf(colorButton),
  size: PropTypes.oneOf(size),
  weight: PropTypes.oneOf(weight),
  fontSize: PropTypes.oneOf(FontSize),
  onClick: PropTypes.func,
  leftIcon: PropTypes.oneOf(IconName),
  rightIcon: PropTypes.oneOf(IconName),
  iconClass: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: "primary",
  styled: "filled",
  color: "orange",
  size: "m",
  weight: "medium",
  fontSize: "14",
};
export function Button({
  children,
  type = "primary",
  styled = "filled",
  color = "orange",
  size = "m",
  weight = "medium",
  fontSize = "14",
  onClick,
  leftIcon,
  rightIcon,
  className,
  iconClass,
  href,
  id,
  disabled = false,
}) {
  const handleColor = () => {
    const colorMap = {
      black: {
        filled: "bg-black text-white dark:bg-white dark:text-black",
        bordered:
          "bg-transparent text-black border border-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black  dark:text-white dark:border-white ",
      },
      orange: {
        filled: "bg-orange text-white",
        bordered:
          "bg-transparent text-orange border border-orange hover:bg-orange hover:text-white duration-150",
      },
      green: {
        filled: "bg-green text-white",
        bordered:
          "bg-transparent text-green border border-green hover:bg-green hover:text-white duration-150",
      },
      red: {
        filled: "bg-red text-white",
        bordered:
          "bg-transparent text-red border border-red hover:bg-red hover:text-white duration-150",
      },
      blue: {
        filled: "bg-blue-500 text-white",
        bordered:
          "bg-transparent text-blue border border-blue-500 hover:bg-blue-600 hover:text-white duration-150",
      },
      disabled: {
        filled: "bg-gray-cool-3 text-black",
        bordered:
          "bg-transparent text-red border border-red hover:bg-red hover:text-white duration-150^",
      },
    };

    return colorMap[color][styled];
  };

  const handlePadding = () => {
    return size === "s" ? "py-0.5 px-1.5 rounded" : "py-1.5 px-3 rounded-md";
  };

  const handleWeight = () => {
    const weightMap = {
      book: "font-book",
      medium: "font-medium",
      black: "font-black",
    };
    return weightMap[weight] || "font-medium";
  };

  const handleFontSize = () => {
    const fontSizeMap = {
      12: "text-xs",
      14: "text-sm",
      16: "text-base",
      20: "text-lg",
      24: "text-xl",
    };
    return fontSizeMap[fontSize] || "text-sm";
  };

  const addDisabledMode = () => {
    return disabled && styled === "filled"
      ? "bg-gray-cool-3 text-black"
      : disabled &&
          styled === "bordered" &&
          "bg-transparent text-red border border-red hover:bg-red hover:text-white duration-150";
  };

  return (
    <button
      className={`flex items-center gap-2 min-w-max ${
        disabled ? addDisabledMode() : handleColor()
      } ${handlePadding()} ${handleWeight()} ${handleFontSize()}  ${className}`}
      onClick={onClick}
      id={id}
      disabled={disabled}
    >
      {leftIcon && (
        <Icon
          className={iconClass}
          width={size === "m" ? 20 : 16}
          height={size === "m" ? 20 : 16}
          icon={leftIcon}
        />
      )}
      {children}
      {rightIcon && (
        <Icon
          className={iconClass}
          width={size === "m" ? 20 : 16}
          height={size === "m" ? 20 : 16}
          icon={rightIcon}
        />
      )}
    </button>
  );
}
