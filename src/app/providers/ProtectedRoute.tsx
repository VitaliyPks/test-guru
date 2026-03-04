import { Navigate } from "react-router-dom";
import React from "react";

import { useAppSelector } from "@shared/redux";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
