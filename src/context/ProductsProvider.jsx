import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabaseClient";

const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    const { data } = await supabase.from("productsData").select("*");
    setProducts(data);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <ProductsContext.Provider value={{ products, getProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("context data not found");
  }
  return context;
}

export default ProductsProvider;
