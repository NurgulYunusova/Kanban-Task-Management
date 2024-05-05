const express = require("express");
const { userController } = require("../controllers/UserController.js");
const { protect } = require("../middleware/authMidlleware.js");

const userRoutes = express.Router();

userRoutes.get("/profile", protect, userController.getUserProfile);
userRoutes.post("/register", userController.registerUser);
userRoutes.post("/confirm", userController.confirmUser);
userRoutes.post("/login", userController.loginUser);
// userRoutes.post("/forgotPassword", userController.forgotPassword);
// userRoutes.post("/changePassword", userController.changePassword);
// userRoutes.put("/profile/:id", userController.updateUserProfile);

module.exports = {
  userRoutes,
};
