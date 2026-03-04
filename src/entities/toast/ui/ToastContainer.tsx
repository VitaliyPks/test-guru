import React from "react";

import { useAppSelector } from "@shared/redux";

import { Toast } from "./Toast";

import "./ToastContainer.scss";

export const ToastContainer: React.FC = () => {
  const base = "toast-container";
  const toasts = useAppSelector((state) => state.toast.toasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={base}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
        />
      ))}
    </div>
  );
};
