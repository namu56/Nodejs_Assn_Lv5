const express = require("express");
const router = express.Router({ mergeParams: true });

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();
const authMiddleware = require("../middlewares/auth-middleware");

// 댓글 생성 API
router.post("/", authMiddleware, commentsController.createComment);

// 댓글 목록 조회 API
router.get("/", commentsController.getComments);

// 댓글 수정 API
router.put("/:commentId", authMiddleware, commentsController.updateComment);

// 댓글 삭제 API
router.delete("/:commentId", authMiddleware, commentsController.deleteComment);

module.exports = router;
