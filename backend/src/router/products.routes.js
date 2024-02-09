import Router from "express-promise-router";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock
} from "../controllers/products.controller.js";
import isAuth from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../schemas/products.schema.js";

const router = Router();

// Routes
router.get("/products", getProducts);

router.get("/products/:id", getProductById);

router.post("/products", isAuth, validateSchema(createProductSchema), createProduct);

router.put("/products/:id", isAuth, validateSchema(updateProductSchema), updateProduct);

router.delete("/product/:id", isAuth, deleteProduct);

router.put("/products/update/stock", updateStock);

export default router;
