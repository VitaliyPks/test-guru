import React, { ReactNode } from "react";
import classNames from "classnames";

import { ReactComponent as CloseIcon } from "@shared/assets/icons/close-icon.svg";

import "./Input.scss";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  clearValue?: () => void;
};

export const Input = ({
  value,
  leftIcon,
  rightIcon,
  clearValue,
  ...rest
}: TInputProps) => {
  const base = "input";

  return (
    <div className={base}>
      <div className={`${base}__container`}>
        {!!leftIcon && (
          <span className={`${base}__icon ${base}__icon-left`}>{leftIcon}</span>
        )}
        <input
          {...rest}
          placeholder={rest.placeholder || "Введите текст"}
          value={value ?? ""}
          onChange={(e) => {
            rest.onChange && rest.onChange(e);
          }}
          className={classNames(`${base}__input`, {
            leftIcon,
            rightIcon,
          })}
        />
        {(!!rightIcon || (!!clearValue && !!value?.length)) && (
          <span
            onClick={() => {
              !!clearValue && clearValue();
            }}
            className={`${base}__icon ${base}__icon-right`}
          >
            {clearValue ? <CloseIcon /> : rightIcon}
          </span>
        )}
      </div>
    </div>
  );
};
