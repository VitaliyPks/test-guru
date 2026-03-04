import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./providers/ProtectedRoute";
import { ReduxProvider } from "./providers/ReduxProvider";

import { ProductsPage } from "@pages/products-page";
import { LoginPage } from "@pages/login-page";

import { checkAuth } from "@features/login";

import { store } from "@shared/redux";

import "./styles/index.scss";
import { ToastContainer } from "@entities/toast";

const AppContent: React.FC = () => {
  useEffect(() => {
    store.dispatch(checkAuth());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/products" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

const App = () => {
  return (
    <ReduxProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ReduxProvider>
  );
};
export default App;
