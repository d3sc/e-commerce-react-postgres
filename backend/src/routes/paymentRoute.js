import express from "express";
import { processTransaction } from "../controllers/PaymentController.js";

const router = express.Router();

router.post("/process-transaction", processTransaction);

export default router;
