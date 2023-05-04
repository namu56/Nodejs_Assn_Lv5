const PostService = require("../sevices/posts.service");
const LikeService = require("../sevices/likes.service");

class PostsController {
  postService = new PostService();
  likeService = new LikeService();

  // 게시글 작성 API
  createPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    // 데이터가 정상적으로 전달되지 않는 경우
    if (!title || !content) {
      throw new Error("412, 데이터 형식이 올바르지 않습니다.");
    }

    // title의 형식이 비정상적인 경우
    if (typeof title !== "string") {
      throw new Error("412, 게시글 제목의 형식이 일치하지 않습니다.");
    }

    // content의 형식이 비정상적인 경우
    if (typeof content !== "string") {
      throw new Error("412, 게시글 내용의 형식이 일치하지 않습니다.");
    }

    try {
      await this.postService.createPost(userId, title, content);
      return res.status(201).json({ message: "게시글 작성에 성공하였습니다." });
    } catch (error) {
      console.error(error);
      throw new Error("400, 게시글 작성에 실패하였습니다.");
    }
  };

  // 게시글 전체 조회 API
  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.findAllPost();
      return res.status(200).json({ posts });
    } catch (error) {
      console.error(error);
      throw new Error("400, 게시글 조회에 실패하였습니다.");
    }
  };

  // 게시글 좋아요 목록 조회 API
  getPostsOfLikes = async (req, res, next) => {
    const { userId } = res.locals.user;
    try {
      const posts = await this.postService.findPostsOfLike(userId);
      return res.status(200).json({ posts });
    } catch (error) {
      console.error(error);
      throw new Error("400, 좋아요 게시글 조회에 실패하였습니다.");
    }
  };

  // 게시글 상세 조회 API
  targetPost = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const post = await this.postService.findOnePost(postId);
      return res.status(200).json({ post });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "게시글 조회에 실패하였습니다." });
    }
  };

  // 게시글 수정 API
  updatePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;
    const post = await this.postService.findPostForUpdateOrDelete(
      userId,
      postId
    );

    if (!title || !content) {
      throw new Error("412, 데이터 형식이 올바르지 않습니다.");
    }

    if (typeof title !== "string") {
      throw new Error("412, 게시글 제목의 형식이 일치하지 않습니다.");
    }

    if (typeof content !== "string") {
      throw new Error("412, 게시글 내용의 형식이 일치하지 않습니다.");
    }

    if (!post) {
      throw new Error("404, 게시글이 존재하지 않습니다.");
    }
    if (userId !== post.UserId) {
      throw new Error("403, 게시글의 수정 권한이 존재하지 않습니다.");
    }

    try {
      await this.postService.updatePost(title, content, postId);
      return res.status(200).json({ message: "게시글을 수정하였습니다." });
    } catch (error) {
      console.error(error);
      throw new Error("404, 게시글이 정상적으로 수정되지 않습니다.");
    }
  };

  // 게시글 삭제 API
  deletePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const post = await this.postService.findPostForUpdateOrDelete(
      userId,
      postId
    );

    if (!post) {
      throw new Error("404, 게시글이 존재하지 않습니다.");
    }

    if (userId !== post.UserId) {
      throw new Error("403, 게시글의 삭제 권한이 존재하지 않습니다.");
    }

    try {
      await this.postService.deletePost(postId);
      return res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } catch (error) {
      console.error(error);
      throw new Error("400, 게시글 삭제에 실패하였습니다.");
    }
  };

  // // 게시글 좋아요 API
  // putLike = async (req, res, next) => {
  //   const { userId } = res.locals.user;
  //   const { postId } = req.params;
  //   const post = await this.postService.findOnePost(postId);
  //   const existLike = await this.likeService.findOneLike(userId);

  //   if (!post) {
  //     throw new Error("404, 게시글이 존재하지 않습니다.");
  //   }
  //   try {
  //     if (!existLike) {
  //       await this.likeService.createLike(userId, postId);
  //       await this.postService.incrementLike(postId);
  //       return res
  //         .status(200)
  //         .json({ message: "게시글의 좋아요을 등록하였습니다." });
  //     } else {
  //       await this.likeService.deleteLike(userId, postId);
  //       await this.postService.decrementLike(postId);
  //       return res
  //         .status(200)
  //         .json({ message: "게시글의 좋아요를 취소하였습니다." });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("400, 게시글 좋아요에 실패하였습니다.");
  //   }
  // };
}

module.exports = PostsController;
