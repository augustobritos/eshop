import accessSecret from "../utils/secret.js";

export const getSecret = async (req, res, next) => {
  try {
    const secret = await accessSecret();
    res.send(secret);
  } catch (error) {
    console.error("Error accediendo a los datos:", err);
    next(error);
  }
};
