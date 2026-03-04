import { useState } from "react";

import { ReactComponent as UserIcon } from "@shared/assets/icons/user-icon.svg";
import { ReactComponent as LockIcon } from "@shared/assets/icons/lock-icon.svg";
import { ReactComponent as EyeIcon } from "@shared/assets/icons/eye-off-icon.svg";
import { Button, Input } from "@shared/ui";
import { CheckBox } from "@shared/ui/check-box";
import LogoImage from "@shared/assets/img/logo.png";

import { useLoginForm } from "../lib";

import "./LoginForm.scss";

export const LoginForm = () => {
  const base = "login-form";
  const [showPassword, setShowPassword] = useState(false);

  const { error, errors, loading, handleSubmit, handleChange, formData } =
    useLoginForm();

  return (
    <div className={base}>
      <div className={`${base}__border`}>
        <div className={`${base}__container`}>
          <img className={`${base}__logo`} src={LogoImage} alt="logo-image" />

          <div className={`${base}__header`}>
            <h1 className={`${base}__title`}>Добро пожаловать!</h1>
            <span className={`${base}__subtitle`}>
              Пожалуйста, авторизуйтесь
            </span>
          </div>

          <form onSubmit={handleSubmit} className={`${base}__form`}>
            <div className={`${base}__field`}>
              <label className={`${base}__label`} htmlFor="username">
                Логин
              </label>
              <div className={`${base}__input-wrapper`}>
                <Input
                  name="username"
                  leftIcon={<UserIcon />}
                  value={formData.username}
                  placeholder="Введите логин"
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              {(errors.username || error) && (
                <span className={`${base}__error-text`}>
                  {errors.username ?? error}
                </span>
              )}
            </div>

            <div className={`${base}__field`}>
              <label className={`${base}__label`} htmlFor="password">
                Пароль
              </label>
              <div className={`${base}__input-wrapper`}>
                <Input
                  name="password"
                  leftIcon={<LockIcon />}
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  placeholder="Введите пароль"
                  disabled={loading}
                  onChange={handleChange}
                  rightIcon={
                    <EyeIcon
                      className={`${base}__icon-pass`}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  }
                />
              </div>
              {errors.password && (
                <span className={`${base}__error-text`}>{errors.password}</span>
              )}
            </div>

            <div className={`${base}__remember`}>
              <CheckBox
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                disabled={loading}
              />
              <label htmlFor="remember" className={`${base}__remember-label`}>
                Запомнить данные
              </label>
            </div>
            <Button
              type="submit"
              className={`${base}__submit`}
              disabled={loading}
            >
              {loading ? "Вход..." : "Войти"}
            </Button>

            <div className={`${base}__divider`}>
              <span>или</span>
            </div>
            <span className={`${base}__register`}>
              Нет аккаунта?
              <Button
                type="button"
                className={`${base}__link`}
                disabled={loading}
              >
                Создать
              </Button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
