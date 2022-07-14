import React, { useContext } from "react";
import { shorten, isInCart, quantityCount } from "../../helper/functions";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContextProvider";
import trashIcon from "../../assets/icons/trash.svg";

const Product = (product) => {
  const { state, dispatch } = useContext(CartContext);
  return (
    <div>
      <img src={product.image} alt={product.title} style={{ width: "200px" }} />
      <h3>{shorten(product.title)}</h3>
      <p>{product.price} $</p>
      <div>
        <Link to={`/products/${product.id}`}>details</Link>
        <div>
          {quantityCount(product.id, state) === 1 && (
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: product })
              }
            >
              <img src={trashIcon} alt="bin" />
            </button>
          )}
          {quantityCount(product.id, state) > 1 && (
            <button
              onClick={() => dispatch({ type: "DECREASE", payload: product })}
            >
              -
            </button>
          )}
          {isInCart(product.id, state) ? (
            <button
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
