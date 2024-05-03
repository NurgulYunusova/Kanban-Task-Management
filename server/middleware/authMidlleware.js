const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

// User must be authenticated
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    throw new Error("saddas");
  }
};

module.exports = {
  protect,
};
