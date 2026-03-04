import React, { useEffect } from "react";

import { ReactComponent as CloseIcon } from "@shared/assets/icons/close-icon.svg";

import "./Modal.scss";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: IModalProps) => {
  const base = "modal";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={base} onClick={onClose}>
      <div className={`${base}__modal`} onClick={(e) => e.stopPropagation()}>
        <div className={`${base}__header`}>
          <h3 className={`${base}__title`}>{title}</h3>
          <CloseIcon className={`${base}__icon-close`} onClick={onClose} />
        </div>
        <div className={`${base}__body`}>{children}</div>
      </div>
    </div>
  );
};
