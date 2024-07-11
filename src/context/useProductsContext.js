"use client"
import useLocalStorage from "@/hooks/useLocalStorage";
import { authKey } from "@/lib/constants";

const { createContext, useContext, useState, useEffect } = require("react");

const ProductsContext = createContext();

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
const API_DATA = "http://corte.fymmx.com/plantillas/getData";
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [storedValue] = useLocalStorage(authKey);

  useEffect(() => {
    const fetchData = async () => {
      const token = storedValue;
      try {
        const response = await fetch(API_DATA, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storedValue]);
  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
