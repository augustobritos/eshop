import app from "./app.js";

// GCF - Entry Point
export const myShop = () => {
  const PORT = 3000;

  app.listen(PORT);

  console.log("Server on port " + PORT);
};
