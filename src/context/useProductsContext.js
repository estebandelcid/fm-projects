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
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  const updateProductsStatus = async (IDpedido, newStatus) => {
    const token = storedValue;

    try {
      const response = await fetch(
        `http://corte.fymmx.com/plantillas/changeStatus?IDpedido=${IDpedido}&status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setProducts((prevProducts) => prevProducts.map((product) => 
      product.IDpedido === IDpedido ? {... product, status: newStatus } : product
      )
    );
    } catch (error) {
      console.error("Error changing status: ", error);
    }
  };
    useEffect(() => {
    setFilteredProducts(products)
  },[products]);
  const handleSearch = (searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.IDpedido.toString().toLowerCase().includes(lowercasedSearchTerm) ||
          product.status.toLowerCase().includes(lowercasedSearchTerm) ||
          product.FechaEntrega.toLowerCase().includes(lowercasedSearchTerm) ||
          product.PlantaDestino.toLowerCase().includes(lowercasedSearchTerm) ||
          product.NumeroPiezas.toLowerCase().includes(lowercasedSearchTerm) ||
          product.TieneOrden.toString().toLowerCase().includes(lowercasedSearchTerm) ||
          product.OrdenCompra.toLowerCase().includes(lowercasedSearchTerm) ||
          product.Material.toLowerCase().includes(lowercasedSearchTerm) ||
          product.Alto.toString().toLowerCase().includes(lowercasedSearchTerm) ||
          product.Largo.toString().toLowerCase().includes(lowercasedSearchTerm) ||
          product.NombreArchivo.toLowerCase().includes(lowercasedSearchTerm) ||
          product.IncluyeTope.toString().toLowerCase().includes(lowercasedSearchTerm) ||
          product.CantidadTopes.toString().toLowerCase().includes(lowercasedSearchTerm) ||
          product.FechaSolicitud.toLowerCase().includes(lowercasedSearchTerm)
        )
      );
    }
  };
  const filterProducts = (filters) => {
    let filteredProducts = [...products];
console.log(filters, 'lo que llega')
    Object.keys(filters).forEach((key) => {
        filteredProducts = filteredProducts.filter(
            (product) => product[key] === filters[key]
        );
    });
    return filteredProducts;
  };

  const updateFilteredProducts = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  const clearFilters = () => {
    setFilteredProducts(products);
  };
  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        error,
        setProducts,
        updateProductsStatus,
        handleSearch,
        filterProducts,
        updateFilteredProducts,
        clearFilters
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
