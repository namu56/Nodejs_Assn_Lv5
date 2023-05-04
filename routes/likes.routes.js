const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes.controller");
const likesController = new LikesController();
const authMiddleware = require("../middlewares/auth-middleware");

// 게시글 좋아요 API
router.put("/:postId/like", authMiddleware, likesController.putLike);

// 게시글 좋아요 목록 조회 API
router.get("/like", authMiddleware, likesController.getPostsOfLike);

module.exports = router;
