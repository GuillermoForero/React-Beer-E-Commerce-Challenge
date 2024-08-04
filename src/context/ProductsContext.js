import { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ productsList, children }) => {
  const [products, setProducts] = useState(productsList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const productsData = window.localStorage.getItem("products-data");
      if (productsData) {
        setProducts(JSON.parse(productsData));
      }
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
