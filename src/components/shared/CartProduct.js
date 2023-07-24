import React, { useContext, useEffect, useState } from "react";
import { titleShortener } from "../../helper/TitleShortener";
import styles from "./CartProduct.module.css";
import { ThemeContextProvider } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import theme_main from "../../Theme";
import ButtonCart from "./ButtonCart";
import { CartContextProvider } from "../../context/CartContext";
import { calculate_count_product } from "../../helper/calculate_count_product";

const CartProduct = ({ product }) => {
  const { mode } = useContext(ThemeContextProvider);
  const { state, dispatch } = useContext(CartContextProvider);
  // const [countProduct, setCountProduct] = useState(0);

  // useEffect(() => {
  //   setCountProduct(calculate_count_product(state, product.id));
  // }, [state]);

  return (
    <div
      className={styles.cart}
      style={{
        // boxShadow: `0 0 10px 0 ${mode === "light" ? "#1A1A1A" : "#454545"}`,
        border:'1px solid grey',
        background: `${mode === "light" ? "#fff" : theme_main[mode].secondary}`,
      }}
    >
      <img src={product.image} alt="image_product" />
      <h3 style={{ color: theme_main[mode].primary }}>
        {titleShortener(product.title)}
      </h3>
      <p className={styles.price} style={{ color: theme_main[mode].primary }}>
        {product.price} $
      </p>
      <div className={styles.linksCart}>
        <Link
          to={`/product/${product.id}`}
          style={{ color: '#C2185B'
            // theme_main[mode].primary 
          }}
        >
          details
        </Link>

        {!calculate_count_product(state, product.id) ? (
          <ButtonCart
            content={"add to cart"}
            type="text"
            handler={() => dispatch({ payload: product, type: "ADD" })}
          />
        ) : (
          <div className={styles.buttons}>
            <ButtonCart
              content={"fa-solid fa-plus"}
              handler={() => dispatch({ payload: product, type: "INCREASE" })}
            />
            <span
              style={{
                color: theme_main[mode].primary,
                margin: "0 5px",
                width: "15px",
                textAlign: "center",
              }}
            >
              {calculate_count_product(state, product.id)}
            </span>
            {calculate_count_product(state, product.id) !== 1 && (
              <ButtonCart
                content={"fa-solid fa-minus"}
                handler={() => dispatch({ payload: product, type: "DECREASE" })}
              />
            )}
            {calculate_count_product(state, product.id) === 1 && (
              <ButtonCart
                content={"fas fa-trash"}
                handler={() => dispatch({ payload: product, type: "REMOVE" })}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartProduct;
