const express = require("express");
const router = express.Router();
const {
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userCRUDController");

const { loginUser, logoutUser } = require("../controllers/userController");

// Login and logout routes (public routes)
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Routes without authentication middleware
router.post("/add", addUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.get("/all-users", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;
