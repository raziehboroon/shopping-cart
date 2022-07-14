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
    <div>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Category: {category}</p>
        <div>
          <span>{price}$</span>
          <br />
          <Link to="/products">back to store</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
