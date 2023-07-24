import React, { useContext } from "react";
import styles from "./DetailCart.module.css";
import theme_main from "../../Theme";
import { ThemeContextProvider } from "../../context/ThemeContext";
import { titleShortener } from "../../helper/TitleShortener";
import { CartContextProvider } from "../../context/CartContext";
import { calculate_count_product } from "../../helper/calculate_count_product";
import ButtonCart from "./ButtonCart";

const DetailCart = ({ product }) => {
  const { mode } = useContext(ThemeContextProvider);
  const { state, dispatch } = useContext(CartContextProvider);

  return (
    <div
      className={styles.container}
      style={{
        // boxShadow: `0 0 10px 0 ${mode === "light" ? "#1A1A1A" : "#454545"}`,
        border: "1px solid grey",
        background: `${mode === "light" ? "#fff" : theme_main[mode].secondary}`,
        color: theme_main[mode].primary,
      }}
    >
      <img src={product.image} alt="img product" />
      <div className={styles.detailProduct}>
        <p className={styles.title}>{titleShortener(product.title)}</p>
        <p>{product.price} $</p>
      </div>
      {/* <div>
        <p>{product.count}</p>
      </div> */}
      <div className={styles.buttons}>
        <ButtonCart
          content={"fa-solid fa-plus"}
          handler={() => dispatch({ payload: product, type: "INCREASE" })}
        />
        <span
          style={{
            // color: theme_main[mode].primary,
            color: '#C2185B',
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
    </div>
  );
};

export default DetailCart;
