import React, { HTMLAttributes } from "react";

import classNames from "classnames";

import "./Button.scss";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  mode?: "error" | "transparent";
  disabled?: boolean;
}

export const Button = ({ children, mode, ...rest }: IButtonProps) => {
  const base = "button";

  return (
    <button
      {...rest}
      className={classNames(base, {
        [`${mode}`]: mode,
        [`${rest.className}`]: rest.className,
      })}
    >
      {children}
    </button>
  );
};
