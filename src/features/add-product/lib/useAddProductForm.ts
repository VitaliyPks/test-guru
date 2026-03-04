import { useState } from "react";

import { IAddProductFormData, IAddProductFormErrors } from "../model";
import { INITIAL_FORM_DATA } from "../model";
import { useToast } from "@entities/toast";

export const useAddProductForm = (onSuccess: () => void) => {
  const [formData, setFormData] =
    useState<IAddProductFormData>(INITIAL_FORM_DATA);
  const { success } = useToast();

  const [errors, setErrors] = useState<IAddProductFormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: IAddProductFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Наименование обязательно";
    } else if (formData.title.length < 2) {
      newErrors.title = "Минимум 2 символа";
    }

    if (!formData.price) {
      newErrors.price = "Цена обязательна";
    } else {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        newErrors.price = "Укажите корректную цену";
      }
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Вендор обязателен";
    } else if (formData.brand.length < 2) {
      newErrors.brand = "Минимум 2 символа";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "Артикул обязателен";
    } else if (formData.sku.length < 3) {
      newErrors.sku = "Минимум 3 символа";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof IAddProductFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleClear = (name: keyof IAddProductFormData) => {
    setFormData((prev) => ({ ...prev, [name]: "" }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      brand: "",
      sku: "",
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return false;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    setTimeout(() => {
      setLoading(false);
      resetForm();
      success("Товар успешно добавлен!");
      onSuccess();
    }, 1000);

    return true;
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleClear,
    handleSubmit,
    resetForm,
  };
};
