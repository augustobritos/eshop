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

// Config
import config from "./config/index.js";

// Create an Express application
const app = express();

// Middleware for logs
app.use(morgan("dev"));
app.use(
  cors({
    origin: config.ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define a route for the root URL
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my Project!" });
});

app.get("/api/ping", async(req, res) => { //doesnt work
  try {
    const response = await pool.query("SELECT NOW()");
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/test", async(req, res) => { //doesnt work
  res.json({ message: "HELLO WORLD" });
});

// Mount routes
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

export const myShop = (req, res) => {
  
  app(req,res);
};


export default app;
