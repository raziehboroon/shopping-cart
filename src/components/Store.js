import React from "react";
import Product from "./shared/Product";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductContextProvider";

const Store = () => {
  const products = useContext(ProductsContext);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {products.map((item) => (
        <Product key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Store;
