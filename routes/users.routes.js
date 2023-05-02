const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

// 회원가입 API
router.post("/signup", usersController.createSignup);

// 로그인 API
router.post("/login", usersController.loginUser);

module.exports = router;
