import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "@supabase/supabase-js";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  // API
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  async function addToCart({ product }) {
    try {
      const newProduct = {
        name: product.name,
        price: product.price,
        id: product.id,
        img: product.img,
        overview:
          "The PopSockets MagSafe Grip for iPhone magnetically snaps on and off your phone so you can easily swap between PopSockets MagSafe accessories. Comes with a magnetic adapter ring that makes any case MagSafe compatible",
        quantity: 1,
      };

      const { data } = await supabase
        .from("cart")
        .insert([newProduct])
        .select("*");
      setCartItems((prev) => [...prev, ...data]);
    } catch (error) {
      throw new Error(error);
    }
  }
  async function deleteItem(id) {
    try {
      await supabase.from("cart").delete().eq("id", id);
      setCartItems((prev) => prev.filter((item) => item.id != id));
    } catch (error) {
      throw new Error(error);
    }
  }
  const getCart = useCallback(async () => {
    try {
      const { data } = await supabase.from("cart").select();
      setCartItems(data);
    } catch (error) {
      throw new Error(error);
    }
  }, []);
  useEffect(() => {
    getCart();
  }, [getCart]);
  return (
    <CartContext.Provider value={{ addToCart, deleteItem, cartItems }}>
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
