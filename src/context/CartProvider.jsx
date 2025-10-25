import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabaseClient";
import Spinner from "../components/ui/Spinner";

const CartContext = createContext();

function CartProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  async function addToCart({ product }) {
    console.log(product);
    try {
      const newProduct = {
        name: product.name,
        name_fa: product.name_fa,
        price: product.price,
        id: product.id,
        img: product.img,
        overview: product.overview,
        overview_fa: product.overview_fa,
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
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    getCart();
  }, [getCart]);
  if (isLoading) return <Spinner />;
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
