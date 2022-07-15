import styles from "./ShopCart.module.css";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";
import Cart from "./shared/Cart";
import { Link } from "react-router-dom";

const ShopCart = () => {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div className={styles.cartContainer}>
        {state.selectedItems.map((item) => (
          <Cart key={item.id} {...item} />
        ))}
      </div>

      {state.itemCounter > 0 && (
        <div className={styles.payments}>
          <p>Total Items: {state.itemCounter}</p>
          <p>Total payment: {state.total}</p>

          <div className={styles.buttonContainer}>
            <button
              className={styles.clear}
              onClick={() => dispatch({ type: "CLEAR", state: state })}
            >
              Clear
            </button>
            <button
              className={styles.checkout}
              onClick={() => dispatch({ type: "CHECKOUT", state: state })}
            >
              checkout
            </button>
          </div>
        </div>
      )}

      {state.checkout && (
        <div className={styles.complete}>
          <h3>checkout successfully!</h3>
          <Link to="/product">buy more</Link>
        </div>
      )}
      {!state.checkout && state.itemCounter === 0 && (
        <div className={styles.complete}>
          <h3>dwant to buy more?</h3>
          <Link to="/product">Go to Shop </Link>{" "}
        </div>
      )}
    </div>
  );
};

export default ShopCart;
