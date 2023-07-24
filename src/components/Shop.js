import React, { useContext } from "react";
import { ProductsContextProvider } from "../context/ProductsContext";
import CartProduct from "./shared/CartProduct";
import spinner from "../assets/gif/spinner.gif";

const Shop = () => {
  const { isLoading, products } = useContext(ProductsContextProvider);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: "50px auto",
        width: "90%",
        gap: "32px",
      }}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            alignItems: "center",
          }}
        >
          <img
            src={spinner}
            alt="spinner"
            style={{ margin: "auto", width: "100px" }}
          />
          <h3 style={{ marginTop: "15px" }}>Loading ...</h3>
        </div>
      ) : (
        products.map(
          (product) => (
            <CartProduct
              key={product.id}
              product={product}
              style={{ margin: "10px" }}
            />
          )
          // )
        )
      )}
    </div>
  );
};

export default Shop;
