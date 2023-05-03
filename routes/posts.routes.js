const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();
const authMiddleware = require("../middlewares/auth-middleware");

// 게시글 작성 API
router.post("/", authMiddleware, postsController.createPost);

// 게시글 좋아요 API
router.put("/:postId/like", authMiddleware, postsController.putLike);

// 게시글 목록 조회 API
router.get("/", postsController.getPosts);

// // 좋아요 목록 조회 API
// router.get("/like", postsController);

// 게시글 상세 조회 API
router.get("/:postId", postsController.targetPost);

// 게시글 수정 API
router.put("/:postId", authMiddleware, postsController.updatePost);

// 게시글 삭제 API
router.delete("/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
