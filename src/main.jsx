import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import ProductsProvider from "./context/ProductsProvider.jsx";
import CartProvider from "./context/CartProvider.jsx";
import { LanguageProvider } from "./context/LanguageProvider.jsx";
import "./components/i18n.js";
import "./main.css";
import { router } from "./routes/router.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>
);
