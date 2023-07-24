export const calculate_count_product = (state, id) => {
  const count_product = state.productInCart.filter((item) => item.id === id);

  if (count_product.length) {
    return count_product[0].count;
  } else {
    return 0;
  }
};
