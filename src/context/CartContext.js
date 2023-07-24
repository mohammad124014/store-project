import React, { createContext, useReducer } from "react";

const initialState = {
  productInCart: [],
  totalPrice: 0,
  totalCount: 0,
  checkout: false,
};

const calculate_all_count = (list_product) => {
  const sum_count_product = list_product.reduce(
    (sum, item) => sum + item.count,
    0
  );
  return sum_count_product;
};

const calculate_all_price = (list_product) => {
  const sum_price_product = list_product.reduce(
    (sum, item) => sum + item.count * item.price,
    0
  );
  return sum_price_product;
};

const handler = (state, action) => {
  switch (action.type) {
    case "ADD":
      const product_in_add = { ...action.payload, count: 1 };

      const newListProductInCart_add = [product_in_add, ...state.productInCart];
      const count_in_add = calculate_all_count(newListProductInCart_add);
      const price_in_add = calculate_all_price(newListProductInCart_add);
      return {
        ...state,
        productInCart: [...newListProductInCart_add],
        totalCount: count_in_add,
        totalPrice: price_in_add,
        checkout: false,
      };

    case "INCREASE":
      const new_list_product_in_inc = state.productInCart.map(
        (product, index) => {
          if (product.id === action.payload.id) {
            const x = { ...product, count: product.count + 1 };
            return x;
          }

          return product;
        }
      );

      const count_in_increase = calculate_all_count(new_list_product_in_inc);
      const price_in_increase = calculate_all_price(new_list_product_in_inc);

      return {
        ...state,
        productInCart: [...new_list_product_in_inc],
        totalCount: count_in_increase,
        totalPrice: price_in_increase,
        checkout: false,
      };

    case "DECREASE":
      const new_list_product_in_dec = state.productInCart.map((product) => {
        if (product.id === action.payload.id) {
          const x = { ...product, count: product.count - 1 };
          return x;
        }

        return product;
      });
      const count_in_decrease = calculate_all_count(new_list_product_in_dec);
      const price_in_decrease = calculate_all_price(new_list_product_in_dec);

      return {
        ...state,
        productInCart: [...new_list_product_in_dec],
        totalCount: count_in_decrease,
        totalPrice: price_in_decrease,
      };

    case "REMOVE":
      const list_products_in_remove = state.productInCart.filter(
        (product) => product.id !== action.payload.id
      );

      const count_in_remove = calculate_all_count(list_products_in_remove);
      const price_in_remove = calculate_all_price(list_products_in_remove);

      return {
        ...state,
        productInCart: [...list_products_in_remove],
        totalCount: count_in_remove,
        totalPrice: price_in_remove,
      };

    case "CHECKOUT":
      return {
        productInCart: [],
        totalPrice: 0,
        totalCount: 0,
        checkout: true,
      };

    case "CLEAR":
      return {
        productInCart: [],
        totalPrice: 0,
        totalCount: 0,
        checkout: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export const CartContextProvider = createContext();

const CartContext = ({ children }) => {
  const [state, dispatch] = useReducer(handler, initialState);
  return (
    <CartContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </CartContextProvider.Provider>
  );
};

export default CartContext;
