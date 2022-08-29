import styles from "./Navbar.module.css";
import React from "react";
import { Link } from "react-router-dom";
import shoppingcart from "../../assets/icons/shopping-cart-1985.svg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const state = useSelector((state) => state.cart);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <Link to="/products" className={styles.productLink}>
          products
        </Link>
        <div className={styles.iconContainer}>
          <Link to="/cart">
            <img
              src={shoppingcart}
              alt="shopping icon"
              style={{ width: "40px" }}
            />
          </Link>
          <span>{state.itemCounter}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
