import pool from "../db.js";

const getProducts = async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  return res.json(result.rows);
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "The product does not exist.",
    });
  }
  return res.json(result.rows[0]);
};

const createProduct = async (req, res, next) => {
  const { title, description, price } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO products (title, description, price) VALUES ($1, $2, $3) RETURNING *",
      [title, description, price]
    );
    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Already exists a product with that title",
      });
    }
    console.error(error);
    next(error);
  }
};

const updateProduct = async (req, res, product) => {
  const { title, description } = req.body;
  const id = req.params.id;
  const result = await pool.query(
    "UPDATE products SET title = $2, description = $3 WHERE id = $1 RETURNING *",
    [id, title, description]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "The product does not exist.",
    });
  }
  return res.json(result.rowCount[0]);
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "The product does not exist.",
    });
  }
  return res.sendStatus(204);
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
