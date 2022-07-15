import styles from "./Cart.module.css";
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContextProvider";
import trashIcon from "../../assets/icons/trash.svg";
import { shorten } from "../../helper/functions";

const Cart = (props) => {
  console.log(props);
  const { dispatch } = useContext(CartContext);
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
          <button
            onClick={() => dispatch({ type: "REMOVE_ITEM", payload: props })}
          >
            <img src={trashIcon} alt="bin" />
          </button>
        )}
        {props.quantity > 1 && (
          <button
            onClick={() => dispatch({ type: "DECREASE", payload: props })}
          >
            -
          </button>
        )}

        <button onClick={() => dispatch({ type: "INCREASE", payload: props })}>
          +
        </button>
      </div>
    </div>
  );
};

export default Cart;
