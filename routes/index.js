const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes.js");
const postsRouter = require("./posts.routes.js");
const commentsRouter = require("./comments.routes.js");
// /signup 경로로 들어온 모든 요청에 대해서 signupRouter 객체를 사용하여
// 처리하도록 미들웨어를 등록하는 역할을 한다.
router.use("/users", usersRouter);

router.use("/posts", postsRouter);

router.use("/posts/:postId/comments", commentsRouter);

module.exports = router;
