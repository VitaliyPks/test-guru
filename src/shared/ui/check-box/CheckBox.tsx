import React from "react";

import "./CheckBox.scss";

interface ICheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

export const CheckBox = ({ checked, ...rest }: ICheckBoxProps) => {
  const base = "checkbox";

  return (
    <div className={base}>
      <label>
        <input
          {...rest}
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            rest.onChange(e);
          }}
        />
        <span></span>
      </label>
    </div>
  );
};
