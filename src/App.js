import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import Shop from "./components/Shop";
import ProductsContext from "./context/ProductsContext";
import Navbar from "./components/shared/Navbar";
import ThemeContext from "./context/ThemeContext";
import Cart from "./components/Cart";
import DetailsProduct from "./components/DetailsProduct";
import CartContext from "./context/CartContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductsContext>
        <CartContext>
          <ThemeContext>
            <Navbar />
            <Routes>
              <Route path="/products" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<DetailsProduct />} />
              <Route path="/*" element={<Navigate to="/products" />} />
            </Routes>
          </ThemeContext>
        </CartContext>
      </ProductsContext>
    </QueryClientProvider>
  );
}

export default App;
