import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabaseClient";
import Spinner from "../components/ui/Spinner";
import { UserAuth } from "./AuthProvider";

const CartContext = createContext();

function CartProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const { userData } = UserAuth();

  const getSessionId = () => {
    let sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID(); // generates unique ID
      localStorage.setItem("session_id", sessionId);
    }
    return sessionId;
  };

  async function addToCart({ product }) {
    try {
      const newProduct = {
        product_id: product.id,
        name: product.name,
        name_fa: product.name_fa,
        price: product.price,
        img: product.img,
        overview: product.overview,
        overview_fa: product.overview_fa,
        quantity: 1,
      };
      if (userData && userData.id) {
        newProduct.user_id = userData.id;
      } else {
        newProduct.session_id = getSessionId();
      }
      const { data } = await supabase
        .from("cart")
        .insert([newProduct])
        .select("*");
      console.log(data);
      (cartItems && cartItems.length) > 0
        ? setCartItems((prev) => [...prev, ...(data ?? [])])
        : setCartItems([...data]);
    } catch (error) {
      throw new Error(error);
    }
  }
  async function deleteItem(id) {
    try {
      await supabase.from("cart").delete().eq("product_id", id);
      setCartItems((prev) => prev.filter((item) => item.product_id !== id));
    } catch (error) {
      throw new Error(error);
    }
  }
  const getCart = useCallback(async () => {
    const filter =
      userData?.length !== 0
        ? { user_id: userData?.id }
        : { session_id: getSessionId() };
    try {
      const { data } = await supabase.from("cart").select().match(filter);
      setCartItems(data || []);
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
