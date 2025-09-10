import axios from "axios";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  async function addToCart({ product }) {
    try {
      const newProduct = {
        name: product.name,
        price: product.price,
        img: product.img,
        category: "cart",
        overview:
          "The PopSockets MagSafe Grip for iPhone magnetically snaps on and off your phone so you can easily swap between PopSockets MagSafe accessories. Comes with a magnetic adapter ring that makes any case MagSafe compatible",
        quantity: 1,
      };
      await axios.post("http://localhost:3006/productsData", newProduct);
      setCartItems((prev) => [...prev, newProduct]);
    } catch (error) {
      throw new Error(error);
    }
  }
  async function deleteItem(id) {
    try {
      await axios.delete(`http://localhost:3006/productsData/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id != id));
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <CartContext.Provider
      value={{ addToCart, deleteItem, cartItems, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("context data not found");
  }
  return context;
}
export default CartProvider;
