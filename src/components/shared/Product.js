import styles from "./Product.module.css";
import React, { useContext } from "react";
import { shorten, isInCart, quantityCount } from "../../helper/functions";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContextProvider";
import trashIcon from "../../assets/icons/trash.svg";

const Product = (product) => {
  const { state, dispatch } = useContext(CartContext);
  return (
    <div className={styles.container}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "200px" }}
        className={styles.cardImage}
      />
      <h3>{shorten(product.title)}</h3>
      <p>{product.price} $</p>
      <div className={styles.linkContainer}>
        <Link to={`/products/${product.id}`}>details</Link>
        <div className={styles.buttonContainer}>
          {quantityCount(product.id, state) === 1 && (
            <button
              className={styles.smallButton}
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: product })
              }
            >
              <img src={trashIcon} alt="bin" />
            </button>
          )}
          {quantityCount(product.id, state) > 1 && (
            <button
              className={styles.smallButton}
              onClick={() => dispatch({ type: "DECREASE", payload: product })}
            >
              -
            </button>
          )}
          {quantityCount(product.id, state) > 0 && (
            <span className={styles.counter}>
              {quantityCount(product.id, state)}
            </span>
          )}
          {isInCart(product.id, state) ? (
            <button
              className={styles.smallButton}
              onClick={() => dispatch({ type: "INCREASE", payload: product })}
            >
              +
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
            >
              add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
