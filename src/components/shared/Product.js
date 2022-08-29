import styles from "./Product.module.css";
import React from "react";
import { shorten, isInCart, quantityCount } from "../../helper/functions";
import { Link } from "react-router-dom";
import trashIcon from "../../assets/icons/trash.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  decreaseItem,
  increaseItem,
  addItem,
} from "../../features/cart/cartSlice";

const Product = ({ productData }) => {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <img
        src={productData.image}
        alt={productData.title}
        style={{ width: "200px" }}
        className={styles.cardImage}
      />
      <h3>{shorten(productData.title)}</h3>
      <p>{productData.price} $</p>
      <div className={styles.linkContainer}>
        <Link to={`/products/${productData.id}`}>details</Link>
        <div className={styles.buttonContainer}>
          {quantityCount(productData.id, cartState) === 1 && (
            <button
              className={styles.smallButton}
              onClick={() => dispatch(removeItem(productData))}
            >
              <img src={trashIcon} alt="bin" />
            </button>
          )}
          {quantityCount(productData.id, cartState) > 1 && (
            <button
              className={styles.smallButton}
              onClick={() => dispatch(decreaseItem(productData))}
            >
              -
            </button>
          )}
          {quantityCount(productData.id, cartState) > 0 && (
            <span className={styles.counter}>
              {quantityCount(productData.id, cartState)}
            </span>
          )}
          {isInCart(productData.id, cartState) ? (
            <button
              className={styles.smallButton}
              onClick={() => dispatch(increaseItem(productData))}
            >
              +
            </button>
          ) : (
            <button onClick={() => dispatch(addItem(productData))}>
              add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
