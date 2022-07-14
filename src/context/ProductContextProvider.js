import React, { useState, useEffect } from "react";
import { getProducts } from "../services/api";

export const ProductsContext = React.createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getProducts("products");
      setProducts(data);
    };

    getData();
  }, []);
  return (
    <ProductsContext.Provider value={products}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductContextProvider;
