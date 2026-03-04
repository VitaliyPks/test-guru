import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { clearError, IFormErrors, saveToken } from "../model";
import { loginThunk } from "../model/authThunk";

import { useAppDispatch, useAppSelector } from "@shared/redux";
import { useToast } from "@entities/toast";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState<IFormErrors>({});

  const validate = (): boolean => {
    const newErrors: IFormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Логин обязателен для заполнения";
    } else if (formData.username.length < 3) {
      newErrors.username = "Логин должен содержать не менее 3 символов";
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен для заполнения";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    dispatch(clearError());

    if (!validate()) {
      return;
    }

    const result = await dispatch(
      loginThunk({
        username: formData.username,
        password: formData.password,
        expiresInMins: 30,
      }),
    );

    if (loginThunk.fulfilled.match(result)) {
      dispatch(
        saveToken({
          token: result.payload.accessToken,
          remember: formData.remember,
        }),
      );

      success("Успешный вход!");

      setTimeout(() => {
        navigate("/products");
      }, 300);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof IFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return {
    error,
    loading,
    handleSubmit,
    handleChange,
    formData,
    errors,
  };
};
