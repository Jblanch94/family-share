import { ReactNode } from "react";

interface ButtonProps {
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
  type?: "submit" | "button" | "reset" | undefined;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const Button = ({
  variant = "contained",
  color = "primary",
  type = "button",
  size = "medium",
  fullWidth = false,
  disabled = false,
  onClick,
  children,
}: ButtonProps): JSX.Element => {
  const disabledClasses = `${disabled ? "bg-disabled cursor-not-allowed" : ""}`;
  const classes = `bold ${
    fullWidth ? "w-full" : undefined
  } rounded text-white hover:opacity-80`;
  const getColorClasses = (): string => {
    if (variant === "contained" && color === "primary") {
      return "bg-blue-600";
    } else if (variant === "contained" && color === "secondary") {
      return "bg-orange-600";
    } else if (variant === "outlined" && color === "primary") {
      return "bg-white border-blue-600 border text-blue-600";
    } else if (variant === "outlined" && color === "secondary") {
      return "bg-white border-orange-600 border text-orange-600";
    }

    return "";
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case "small":
        return "text-base py-1 px-2.5";
      case "medium":
        return "text-lg py-1.5 px-4";
      case "large":
        return "text-xl py-2 px-5";
      default:
        return "";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${classes} ${disabledClasses} ${getColorClasses()} ${getSizeClasses()}`}>
      {children}
    </button>
  );
};

export default Button;
