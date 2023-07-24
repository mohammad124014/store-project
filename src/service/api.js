import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

async function getProducts() {
  const products = await axios.get(`${BASE_URL}/products`);
  return products;
}

async function getOneProduct(id) {
  const product = await axios.get(`${BASE_URL}/products/${id}`);
  return product;
}

export { getProducts, getOneProduct };
