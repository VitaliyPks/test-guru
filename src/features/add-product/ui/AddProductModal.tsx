import { useEffect } from "react";

import { AddProductForm } from "./AddProductForm";
import { Modal } from "@shared/ui";

interface IAddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProductModal = ({ isOpen, onClose }: IAddProductModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Добавить товар">
      <AddProductForm onSuccess={onClose} onCancel={onClose} />
    </Modal>
  );
};
