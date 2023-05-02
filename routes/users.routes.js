const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

router.post("/signup", usersController.createSignup);
router.post("/login", usersController.loginUser);

module.exports = router;
