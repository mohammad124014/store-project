import React, { useContext, useState } from "react";
import styles from "./ButtonCart.module.css";
import { ThemeContextProvider } from "../../context/ThemeContext";
import theme_main from "../../Theme";

const ButtonCart = ({ content, type , handler }) => {
  const [hoverAddButton, setHoverAddButton] = useState(false);
  const { mode } = useContext(ThemeContextProvider);

  return (
    <button
    onClick={() => handler()}
      className={`${styles.addcart} ${styles.buttonCart}`}
      style={{
        border: `1px solid ${theme_main[mode].primary}`,
        color: hoverAddButton
          ? theme_main[mode].secondary
          : theme_main[mode].primary,
        background: hoverAddButton
          ? theme_main[mode].primary
          : theme_main[mode].secondary,
      }}
      onMouseEnter={() => setHoverAddButton(true)}
      onMouseLeave={() => setHoverAddButton(false)}
    >
      {/* <img src={contenet} alt="icon button" /> */}
      {/* {content} */}
      {type === "font_icon" && <i className={content}></i>}
      {type === "text" && content}
    </button>
  );
};

export default ButtonCart;

ButtonCart.defaultProps = {
  type: "font_icon",
};
