import express from "express";
import {
  paymentSuccess,
  processTransaction,
} from "../controllers/PaymentController.js";

const router = express.Router();

router.post("/process-transaction", processTransaction);
router.post("/payment-success", paymentSuccess);

export default router;
