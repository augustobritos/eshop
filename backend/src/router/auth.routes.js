import Router from "express-promise-router";
import {
  signUp,
  signIn,
  signOut,
  getProfile,
} from "../controllers/auth.controller.js";
import isAuth from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { signUpSchema, signInSchema } from "../schemas/auth.schema.js";

const router = Router();

// Routes
router.post("/signup", validateSchema(signUpSchema), signUp);

router.post("/signin", validateSchema(signInSchema), signIn);

router.post("/signout", signOut);

router.get("/profile", isAuth, getProfile);

export default router;
