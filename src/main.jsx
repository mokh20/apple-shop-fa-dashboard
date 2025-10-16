import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ProductsProvider from "./context/ProductsProvider.jsx";
import App from "./App.jsx";
import "./main.css";
import CartProvider from "./context/CartProvider.jsx";
import { LanguageProvider } from "./context/LanguageProvider.jsx";

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
