import { useEffect } from "react";

import { ReactComponent as WarningIcon } from "@shared/assets/icons/alert-circle.svg";
import { ReactComponent as SuccessIcon } from "@shared/assets/icons/check-circle.svg";
import { ReactComponent as CloseIcon } from "@shared/assets/icons/close-icon.svg";
import { ReactComponent as ErrorIcon } from "@shared/assets/icons/x-circle.svg";
import { ReactComponent as InfoIcon } from "@shared/assets/icons/help-circle.svg";

import { removeToast, TToastType } from "../model";

import { useAppDispatch } from "@shared/redux";

import "./Toast.scss";

interface IToastProps {
  id: string;
  message: string;
  type: TToastType;
  duration?: number;
}

export const Toast = ({ id, message, type, duration = 3000 }: IToastProps) => {
  const base = "toast";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast(id));
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, dispatch]);

  const handleClose = () => {
    dispatch(removeToast(id));
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <SuccessIcon />;
      case "error":
        return <ErrorIcon />;
      case "warning":
        return <WarningIcon />;
      case "info":
      default:
        return <InfoIcon />;
    }
  };

  return (
    <div className={`${base} ${base}--${type}`}>
      <div className={`${base}__icon`}>{getIcon()}</div>
      <div className={`${base}__content`}>
        <span className={`${base}__message`}>{message}</span>
      </div>
      <CloseIcon className={`${base}__close`} onClick={handleClose} />
    </div>
  );
};
