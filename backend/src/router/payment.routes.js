import Router from "express-promise-router";
import { createPreference } from "../controllers/mercadopago.controller.js";

const router = Router();

router.post("/mp/preference/id", createPreference);

export default router;