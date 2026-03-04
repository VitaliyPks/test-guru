import { addToast, removeToast, TToastType } from "../model";

import { useAppDispatch } from "@shared/redux";

export const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = (
    message: string,
    type: TToastType = "info",
    duration?: number,
  ) => {
    dispatch(addToast({ message, type, duration }));
  };

  const hideToast = (id: string) => {
    dispatch(removeToast(id));
  };

  const success = (message: string, duration?: number) => {
    showToast(message, "success", duration);
  };

  const error = (message: string, duration?: number) => {
    showToast(message, "error", duration);
  };

  const info = (message: string, duration?: number) => {
    showToast(message, "info", duration);
  };

  const warning = (message: string, duration?: number) => {
    showToast(message, "warning", duration);
  };

  return {
    showToast,
    hideToast,
    success,
    error,
    info,
    warning,
  };
};
