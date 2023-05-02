const PostService = require("../sevices/posts.service");

class PostsController {
  postService = new PostService();

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
      const createPostData = await this.postService.createPost(
        userId,
        title,
        content
      );
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

  // 게시글 상세 조회 API
  targetedPost = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const post = await this.postService.findOnePost(postId);
      return res.status(200).json({ post });
    } catch (error) {
      console.error(error);
      throw new Error("400, 게시글 조회에 실패하였습니다.");
    }
  };
}

module.exports = PostsController;
