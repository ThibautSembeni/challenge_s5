import React from "react";
import PropTypes from "prop-types";
import { FontSize } from "@/components/atoms/_type.jsx";

const colorButton = ["black", "orange", "green", "red"];
const styledButton = ["filled", "bordered"];
const size = ["s", "m"];
const weight = ["book", "medium", "black"];

Link.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func,
  asButton: PropTypes.bool,
  colorButton: PropTypes.oneOf(colorButton),
  styledButton: PropTypes.oneOf(styledButton),
  size: PropTypes.oneOf(size),
  weight: PropTypes.oneOf(weight),
  fontSize: PropTypes.oneOf(FontSize),
  disabled: PropTypes.bool,
};

Link.defaultProps = {
  target: "_blank",
  rel: "noopener noreferrer",
  asButton: false,
  colorButton: "orange",
  styledButton: "filled",
  size: "m",
  weight: "medium",
  fontSize: "14",
  disabled: false,
};

export function Link({
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
  children,
  onClick,
  asButton = false,
  colorButton = "orange",
  styledButton = "filled",
  size = "m",
  weight = "medium",
  fontSize = "14",
  disabled = false,
}) {
  const handleColor = () => {
    const colorMap = {
      black: {
        filled: "bg-black text-white dark:bg-white dark:text-black ",
        bordered:
          "bg-transparent text-black border border-black dark:text-white dark:border-white ",
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
        filled: "bg-blue text-white",
        bordered:
          "bg-transparent text-blue border border-blue hover:bg-blue hover:text-white duration-150",
      },
    };

    return colorMap[colorButton][styledButton];
  };

  const handlePadding = () => {
    return size === "s" ? "py-0.5 px-1.5 rounded" : "py-1.5 px-3 rounded-md";
  };
  const handleDisable = () => {
    return "disabled";
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
  return (
    <a
      href={disabled ? undefined : href}
      role={disabled ? "link" : undefined}
      target={target}
      rel={rel}
      className={`${className} ${asButton && handleColor()} ${
        asButton && handlePadding()
      } ${asButton && handleWeight()} ${asButton && handleFontSize()} ${
        disabled && handleDisable()
      }`}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
    </a>
  );
}
