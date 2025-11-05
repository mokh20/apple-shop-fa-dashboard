import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Dashboard from "../pages/Dashboard";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Navigate to="1" replace /> },
      { path: "products/:id", element: <Product /> },
      { path: "cart", element: <Cart /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "signup", element: <SignUp /> },
      { path: "signin", element: <SignIn /> },
    ],
  },
]);
