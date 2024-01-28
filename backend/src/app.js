// Express framework
import express from "express";

// Routes
import productRoutes from "./router/products.routes.js";
import authRoutes from "./router/auth.routes.js";
import s3Routes from "./router/s3.routes.js";
import paymentRoutes from "./router/payment.routes.js";

// Libraries
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

// Create an Express application
const app = express();

// Middleware for logs
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api/s3", s3Routes);
app.use("/api", paymentRoutes);

// Middleware for error for handling internal server errors
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
