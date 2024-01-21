import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Access unauthorized",
    });
  }

  jwt.verify(token, "xyz123", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Access unauthorized",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

export default isAuth;
