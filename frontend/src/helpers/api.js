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
  store: async (productId, userId) => {
    const { data } = await axios.post("/likes", {
      productId,
      userId,
    });
    return data?.error ? data.error : data.success;
  },
  deleteLike: async (itemId) => {
    const data = await axios.delete("/likes", {
      data: {
        itemId,
      },
    });

    return data;
  },
};

const ApiCarts = {
  get: async () => {
    const data = await axios.get("/cart");

    return data;
  },
  changeQty: async (itemId, qty) => {
    const data = await axios.post("/qty", {
      itemId,
      qty,
    });

    return data;
  },
  deleteCart: async (itemId) => {
    const data = await axios.delete("/cart-item", {
      data: {
        itemId,
      },
    });

    return data;
  },
};

export { ApiProducts, ApiLikes, ApiCarts };
