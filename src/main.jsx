import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ProductsProvider from "./context/ProductsProvider.jsx";
import App from "./App.jsx";
import "./main.css";

createRoot(document.getElementById("root")).render(
  <ProductsProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </ProductsProvider>
);
