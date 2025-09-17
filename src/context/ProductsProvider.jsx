import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const api = axios.create({
    baseURL: `${SUPABASE_URL}/rest/v1`,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  const getProducts = useCallback(async () => {
    const { data } = await api.get("/productsData?select=*");
    setProducts(data);
  }, []);

  // const getProducts = useCallback(async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:3006/productsData");
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error :", error);
  //   }
  // }, []);
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
