import Router from "express-promise-router";
import isAuth from "../middlewares/auth.middleware.js";
import { saveOrder, getOrders, updateOrderStatus, deleteOrder} from "../controllers/orders.controller.js";

const router = Router();

// Routes
router.post("/orders/save", saveOrder);
router.get("/orders", isAuth, getOrders);
router.put("/orders/update/status/:id", isAuth, updateOrderStatus);
router.delete("/orders/delete/:id", isAuth, deleteOrder);

export default router;