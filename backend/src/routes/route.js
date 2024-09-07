import express from "express";
const router = express.Router();

import {
  getProducts,
  storeProduct,
  updateProduct,
  deleteProduct,
  showProduct,
} from "../controllers/ProductController.js";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/AuthController.js";
import {
  deleteLikes,
  getLikes,
  storeLikes,
} from "../controllers/LikesController.js";
import {
  changeQty,
  deleteCartItem,
  getCart,
  getUserCart,
  storeCart,
} from "../controllers/CartController.js";
import { getUsers } from "../controllers/UsersController.js";

// auth route
router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.get("/logout", logout);

// user route
router.get("/users", getUsers);

// products route
router.get("/products", getProducts);
router.get("/product", showProduct);
router.post("/product", storeProduct);
router.put("/product", updateProduct);
router.delete("/product", deleteProduct);

// likes route
router.get("/likes", getLikes);
router.post("/likes", storeLikes);
router.delete("/likes", deleteLikes);

// cart route
router.get("/cart", getCart);
router.post("/cart/user", getUserCart);
router.post("/cart", storeCart);
router.delete("/cart-item", deleteCartItem);

// quantity handle route
router.post("/qty", changeQty);

export default router;
