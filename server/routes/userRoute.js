const express = require("express");
const { userController } = require("../controllers/UserController.js");
// const { protect } = require("../middleware/authMiddleware.js");

const userRoutes = express.Router();

// userRoutes.get("/profile", protect, userController.getUserProfile);
userRoutes.post("/register", userController.registerUser);
userRoutes.post("/confirm", userController.confirmUser);
// userRoutes.post("/login", userController.loginUser);
// userRoutes.post("/forgotPassword", userController.forgotPassword);
// userRoutes.post("/changePassword", userController.changePassword);
// userRoutes.put("/profile/:id", userController.updateUserProfile);

// // Admin routes
// userRoutes.get("/", protect, admin, userController.getUsers);
// userRoutes.get("/:id", protect, admin, userController.getUserById);
// userRoutes.put("/:id", protect, admin, userController.updateUser);
// userRoutes.delete("/:id", protect, admin, userController.deleteUser);

module.exports = {
  userRoutes,
};
