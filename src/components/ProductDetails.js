import styles from "./ProductDetails.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductContextProvider";

const ProductDetails = () => {
  const products = useContext(ProductsContext);
  const { id } = useParams();

  const product = products[id - 1];
  const { image, title, description, price, category } = product;
  return (
    <div className={styles.container}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.textContainer}>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.category}>
          <span>Category:</span> {category}
        </p>
        <div className={styles.buttonContainer}>
          <span className={styles.price}>{price}$</span>
          <br />
          <Link to="/products">back to store</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
