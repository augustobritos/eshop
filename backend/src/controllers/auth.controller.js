import pool from "../db.js";
import bcrypt from "bcrypt";
import createAccessToken from "../libs/jwt.js";
import md5 from "md5";

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const gravatar = "https://www.gravatar.com/avatar/" + md5(email);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, encryptedPassword]
    );

    const token = await createAccessToken({ id: result.rows[0].id });

    res.cookie("token", token, {
      //httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 1000,
    });

    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "2305") {
      return res.status(400).json({ message: "The email already exists." });
    }
    next(error);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rowCount === 0) {
    return res.status(400).json({ message: "The email does not exist." });
  }

  const validPassword = await bcrypt.compare(password, result.rows[0].password);

  if (!validPassword) {
    return res.status(400).json({ message: "The password is incorrect." });
  }

  const token = await createAccessToken({ id: result.rows[0].id });

  res.cookie("token", token, {
    //httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 1000,
  });

  return res.json(result.rows[0]);
};

const signOut = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Signed out successfully." });
};

const getProfile = async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.userId,
  ]);
  return res.json(result.rows[0]);
};

export { signUp, signIn, signOut, getProfile };
