import { LoginForm } from "@features/login/ui";

import "./LoginPage.scss";

export const LoginPage = () => {
  const base = "login-page";

  return (
    <div className={base}>
      <LoginForm />
    </div>
  );
};
