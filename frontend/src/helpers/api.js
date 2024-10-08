import axios from "axios";

const ApiProducts = {
  get: async () => {
    const data = await axios.get("/products");

    return data;
  },
  show: async (id) => {
    const data = await axios.get(`/product?id=${id}`);
    return data;
  },
  store: async (formData) => {
    const data = await axios.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  update: async (formData, id) => {
    const data = await axios.put("/product?id=" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  delete: async (id) => {
    const data = await axios.delete(`/product?id=${id}`);

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
    // return data?.error ? data.error : data.success;
    return data;
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
  getUserCart: async () => {
    const { data } = await axios.post("/cart/user");
    return data;
  },
  changeQty: async (itemId, qty) => {
    const data = await axios.post("/qty", {
      itemId,
      qty,
    });

    return data;
  },
  store: async (quantity, productId, cartId) => {
    const { data } = await axios.post("/cart", {
      quantity,
      productId,
      cartId,
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
  deleteAllItem: async (cartId) => {
    const data = await axios.delete("/cart-all-item", {
      data: {
        cartId,
      },
    });

    return data;
  },
};

const ApiUsers = {
  getUsers: async () => {
    const data = await axios.get("/users");

    return data;
  },
};

const ApiPayment = {
  pay: async (cartId, userId) => {
    const data = await axios.post("/api/payment/process-transaction", {
      cartId,
      userId,
    });

    return data;
  },
  check: async (cartId, userId, transaction) => {
    const data = await axios.post("/api/payment/payment-success", {
      cartId,
      userId,
      transaction,
    });

    return data;
  },
};

const ApiHistory = {
  get: async () => {
    const data = await axios.get("/history");

    return data;
  },
};

export { ApiProducts, ApiLikes, ApiCarts, ApiUsers, ApiPayment, ApiHistory };
