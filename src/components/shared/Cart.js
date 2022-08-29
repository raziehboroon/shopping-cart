import styles from "./Cart.module.css";
import React from "react";
import trashIcon from "../../assets/icons/trash.svg";
import { shorten } from "../../helper/functions";
import { useDispatch } from "react-redux";

import {
  removeItem,
  decreaseItem,
  increaseItem,
} from "../../features/cart/cartSlice";

const Cart = (props) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <img
        src={props.image}
        alt={props.title}
        className={styles.productImage}
      />
      <div className={styles.data}>
        <h3>{shorten(props.title)}</h3>
        <p>{props.price} $</p>
      </div>
      <div>
        <span className={styles.quantity}>{props.quantity}</span>
      </div>
      <div className={styles.buttonContainer}>
        {props.quantity === 1 && (
          <button onClick={() => dispatch(removeItem(props))}>
            <img src={trashIcon} alt="bin" />
          </button>
        )}
        {props.quantity > 1 && (
          <button onClick={() => dispatch(decreaseItem(props))}>-</button>
        )}

        <button onClick={() => dispatch(increaseItem(props))}>+</button>
      </div>
    </div>
  );
};

export default Cart;
