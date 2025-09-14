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

  const getProducts = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:3006/productsData");
      setProducts(data);
    } catch (error) {
      console.error("Error :", error);
    }
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
