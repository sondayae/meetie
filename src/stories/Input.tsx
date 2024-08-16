import React from "react";
import "./input.css";

export interface InputProps {
  id: string;
  name: string;
  primary?: boolean;
  backgroundcolor?: string;
  size?: "small" | "medium" | "large";
  placeholder?: string;
  type?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Input = ({
  primary = false,
  size = "medium",
  placeholder,
  ...props
}: InputProps) => {
  const mode = primary
    ? "storybook-input--primary"
    : "storybook-input--secondary";
  return (
    <>
      <input
        type={props.type ? props.type : "text"}
        placeholder={placeholder}
        className={["storybook-input", `storybook-input--${size}`, mode].join(
          " ",
        )}
        {...props}
      />
    </>
  );
};
