const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");
const authMiddleware = require("../middlewares/auth-middleware");
const postsController = new PostsController();

// 게시글 작성 API
router.post("/", authMiddleware, postsController.createPost);

// 게시글 목록 조회 API
router.get("/", postsController.getPosts);

// 게시글 상세 조회 API
router.get("/:postId", postsController.targetPost);

// 게시글 수정 API
router.put("/:postId", authMiddleware, postsController.updatePost);

// 게시글 삭제 API
router.delete("/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
