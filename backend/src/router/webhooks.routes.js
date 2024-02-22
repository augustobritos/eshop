import Router from "express-promise-router";
import { handlePaymentWebhook } from "../controllers/mercadopago.controller.js";

const router = Router();

// Routes
router.post("/webhooks/mercadopago", handlePaymentWebhook);

export default router;
