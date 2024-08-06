import { createContext, useContext } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ productsList: products, children }) => {
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
