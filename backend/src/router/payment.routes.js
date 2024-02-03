import Router from "express-promise-router";
import { createPreference, getMercadoPagoKey } from "../controllers/mercadopago.controller.js";
import { getEnabledPayments, updateEnabledPayments } from "../controllers/auth.controller.js";

const router = Router();

router.post("/mp/preference/id", createPreference);

router.get("/mp/key", getMercadoPagoKey);

router.get("/payments/enabled", getEnabledPayments);

router.put("/payments/update", updateEnabledPayments);

export default router;