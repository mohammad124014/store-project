import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneProduct } from "../service/api";
import { useQuery } from "@tanstack/react-query";
import spinner from "../assets/gif/spinner.gif";
import styles from "./DetailsProduct.module.css";
import theme_main from "../Theme";
import { ThemeContextProvider } from "../context/ThemeContext";
import ButtonCart from "./shared/ButtonCart";

const DetailsProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { mode } = useContext(ThemeContextProvider);

  const { isLoading } = useQuery(["getOneProduct"], () => getOneProduct(id), {
    onSuccess: (data) => {
      setProduct(data?.data);
    },
  });

  return (
    <>
      {isLoading ? (
        <div className={styles.spinner}>
          <img src={spinner} alt="spinner" />
          <h3>Loading ...</h3>
        </div>
      ) : (
        <div
          className={styles.container}
          style={{
            background: mode === "light" ? "#fff" : theme_main[mode].secondary,
            color: theme_main[mode].primary,
          }}
        >
          <img src={product.image} alt="image_product" />
          <div className={styles.describtion}>
            <h2>{product.title}</h2>
            <p className={styles.desc}>{product.description}</p>
            <p className={styles.category}>category : {product.category}</p>
            <div>
              <p className={styles.price}>{product.price} $</p>
              <ButtonCart
                content={"back to shop"}
                type={"text"}
                handler={() => navigate("/products")}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsProduct;
