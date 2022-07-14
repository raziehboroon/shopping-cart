import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/";
const getProducts = async (name) => {
  const response = await axios.get(`${BASE_URL}${name}`);
  return response.data;
};

export { getProducts };
