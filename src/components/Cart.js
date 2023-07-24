import React, { useContext } from "react";
import DetailCart from "./shared/DetailCart";
import styles from "./Cart.module.css";
import { CartContextProvider } from "../context/CartContext";
import { ThemeContextProvider } from "../context/ThemeContext";
import theme_main from "../Theme";
import ButtonCart from "./shared/ButtonCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContextProvider);
  const { state, dispatch } = useContext(CartContextProvider);
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {state.productInCart.map((product) => (
          <DetailCart product={product} key={product.id} />
        ))}
      </div>

      <div
        className={styles.checkStatusBasket}
        style={{ color: theme_main[mode].primary }}
      >
        {state.checkout ? (
          <div className={styles.checkout}>
            <h4 style={{color:"#C2185B"}}>Check out successfully</h4>
            <ButtonCart
              content={"Buy more"}
              type={"text"}
              handler={() => navigate("/products")}
            />
          </div>
        ) : !state.productInCart.length ? (
          <div className={styles.clear}>
            <h4 style={{color:"#C2185B"}}>Want to Buy ?</h4>
            <ButtonCart
              content={"go to shop"}
              type={"text"}
              handler={() => navigate("/products")}
            />
          </div>
        ) : (
          <div
            className={styles.Bill}
            style={{
              // boxShadow: `0 0 10px 0 ${
              //   mode === "light" ? "#1A1A1A" : "#454545"
              // }`,
              border:'1px solid grey',
              background: `${
                mode === "light" ? "#fff" : theme_main[mode].secondary
              }`,
              color: theme_main[mode].primary,
            }}
          >
            <p>Total products : {state.totalCount}</p>
            <p>Total payments : {state.totalPrice.toFixed(2)} $</p>
            <div>
              <button
                className={styles.clearBtn}
                style={{ color: "#C2185B"
                  // theme_main[mode].primary
                }}
                onClick={() => dispatch({ type: "CLEAR" })}
              >
                clear
              </button>
              <ButtonCart
                content={"checkout"}
                type={"text"}
                handler={() => dispatch({ type: "CHECKOUT" })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
