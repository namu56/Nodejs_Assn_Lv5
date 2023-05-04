const LikeService = require("../repositories/likes.repository");

class LikesController {
  likeService = new LikeService();

  // 로그인한 회원이 좋아요 up, down
  putLike = async (req, res, next) => {
    const { userId } = res.locals.user;

    const { postId } = req.params;
    // 1. 게시글이 존재하는지 확인
    const existPost = await this.likeService.findOnePost(postId);

    // 2. 로그인한 회원이 좋아요를 눌렀는지 확인
    const existLike = await this.likeService.findOneLike(userId, postId);
    // 3.좋아요를 누를 게시글이 존재하지 않는 경우
    if (!existPost) {
      throw new Error("게시글이 존재하지 않습니다.");
    }
    try {
      // 3. 로그인한 회원이 좋아요를 누르지 않은 경우
      if (!existLike) {
        await this.likeService.createLike(userId, postId);

        await this.likeService.incrementLike(postId);
        return res
          .status(200)
          .json({ message: "게시글의 좋아요을 등록하였습니다." });
      } else {
        await this.likeService.deleteLike(userId, postId);
        await this.likeService.decrementLike(postId);
        return res
          .status(200)
          .json({ message: "게시글의 좋아요를 취소하였습니다." });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ message: "게시글 좋아요에 실패하였습니다." });
    }
  };

  // 로그인한 회원이 좋아요한 글 전체 조회
  getPostsOfLike = async (req, res, next) => {
    const { userId } = res.locals.user;
    try {
      const posts = await this.likeService.findPostsOfLike(userId);
      return res.status(200).json({ posts });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ message: "좋아요 게시글 조회에 실패하였습니다." });
    }
  };
}

module.exports = LikesController;
