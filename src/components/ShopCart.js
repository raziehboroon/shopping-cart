import styles from "./ShopCart.module.css";
import React from "react";
import Cart from "./shared/Cart";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clear, checkout } from "../features/cart/cartSlice";
const ShopCart = () => {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
              onClick={() => dispatch(clear(state))}
            >
              Clear
            </button>
            <button
              className={styles.checkout}
              onClick={() => dispatch(checkout(state))}
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
