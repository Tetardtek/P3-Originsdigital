const jwt = require("jsonwebtoken");

const secretKey = process.env.APP_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
    return null;
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = verifyToken;
