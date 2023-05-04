const { Users, Posts, Likes } = require("../models");
const { Op } = require("sequelize");

class LikeRepository {
  findOnePost = async (postId) => {
    const existPost = await Posts.findByPk(postId);

    return existPost;
  };

  findOneLike = async (userId, postId) => {
    const like = await Likes.findOne({
      where: { UserId: userId, PostId: postId },
    });

    return like;
  };

  // 로그인한 회원이 좋아요 누르면 Likes 테이블 생성
  createLike = async (userId, postId) => {
    const createLikeData = await Likes.create({
      UserId: userId,
      PostId: postId,
    });

    return createLikeData;
  };

  // Posts 테이블에서 likes 컬럼 값 증가
  incrementLike = async (postId) => {
    const incrementLikeData = await Posts.increment("likes", {
      where: { postId },
    });

    return incrementLikeData;
  };

  // 로그인한 회원이 좋아요 누르면 Likes 테이블 삭제
  deleteLike = async (userId, postId) => {
    const deleteLikeData = await Likes.destroy({
      where: { [Op.and]: [{ UserId: userId }, { PostId: postId }] },
    });

    return deleteLikeData;
  };

  // Posts 테이블에서 likes 컬럼 값 감소
  decrementLike = async (postId) => {
    const decrementLikeData = await Posts.decrement("likes", {
      where: { postId },
    });

    return decrementLikeData;
  };

  // 로그인 한 회원이 좋아요 누른 게시글 모두 찾기
  findPostsOfLike = async (userId) => {
    const postsOfLike = await Posts.findAll({
      attributes: [
        "postId",
        "UserId",
        "title",
        "likes",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
        // Likes 테이블에서 로그인한 회원이 좋아요를 누른 게시물만 선택하도록 필터링 역할함
        {
          model: Likes,
          attributes: [],
          where: { UserId: userId },
        },
      ],
      order: [["likes", "DESC"]],
    });
    return postsOfLike;
  };
}

module.exports = LikeRepository;
