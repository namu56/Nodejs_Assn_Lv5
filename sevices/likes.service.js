const LikeRepository = require("../repositories/likes.repository");

class LikeService {
  likeRepository = new LikeRepository();

  findOneLike = async (userId) => {
    const like = await this.likeRepository.findOneLike(userId);

    return like;
  };

  createLike = async (userId, postId) => {
    const createLikeData = await this.likeRepository.createLike(userId, postId);

    return createLikeData;
  };

  deleteLike = async (userId, postId) => {
    const deleteLikeData = await this.likeRepository.deleteLike(userId, postId);

    return deleteLikeData;
  };
}

module.exports = LikeService;
