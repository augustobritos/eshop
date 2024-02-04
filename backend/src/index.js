import app from "./app.js";

// GCF - Entry Point
export const myShop = (req, res) => {
  app(req, res);
  console.log("New Request has been received.");
};
