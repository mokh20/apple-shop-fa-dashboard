import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ProductsProvider from "./context/ProductsProvider.jsx";
import App from "./App.jsx";
import CartProvider from "./context/CartProvider.jsx";
import { LanguageProvider } from "./context/LanguageProvider.jsx";
import "./components/i18n.js";
import "./main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </LanguageProvider>
  </StrictMode>
);
