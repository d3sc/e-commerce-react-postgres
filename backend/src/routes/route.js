import express from "express";
const router = express.Router();

import {
  getProducts,
  storeProduct,
  updateProduct,
  deleteProduct,
  showProducts,
} from "../controllers/ProductController.js";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/AuthController.js";

// auth route
router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.get("/logout", logout);

// products route
router.get("/products", getProducts);
router.get("/product", showProducts);
router.post("/product", storeProduct);
router.put("/product", updateProduct);
router.delete("/product", deleteProduct);

export default router;
