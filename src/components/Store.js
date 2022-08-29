import styles from "./Store.module.css";
import React, { useEffect } from "react";
import Product from "./shared/Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
// import { createLogger } from "redux-logger";

const Store = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);

  useEffect(() => {
    if (!productsState.products.length) dispatch(fetchProducts());
  }, [dispatch, productsState.products.length]);

  return (
    <div className={styles.container}>
      {productsState.loading ? (
        <h1>Loading...</h1>
      ) : productsState.error ? (
        <h1>{productsState.error}</h1>
      ) : (
        productsState.products.map((product) => (
          <Product key={product.id} productData={product} />
        ))
      )}
    </div>
  );
};

export default Store;
