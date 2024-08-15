import axios from "axios";

const ApiProducts = {
  get: async () => {
    const data = await axios.get("/products");

    return data;
  },
};

const ApiLikes = {
  get: async () => {
    const data = await axios.get("/likes");

    return data;
  },
};

const ApiCarts = {
  get: async () => {
    const data = await axios.get("/cart");

    return data;
  },
};

export { ApiProducts, ApiLikes, ApiCarts };
