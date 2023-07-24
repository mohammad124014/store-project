import React, { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../service/api";

export const ProductsContextProvider = createContext();

const ProductsContext = ({ children }) => {
  const [products, setProducts] = useState([]);

  const { isLoading } = useQuery(["getProducts"], () => getProducts(), {
    onSuccess: (data) => {
      setProducts(data?.data);
    },
  });

  return (
    <ProductsContextProvider.Provider value={{ isLoading, products }}>
      {children}
    </ProductsContextProvider.Provider>
  );
};

export default ProductsContext;
