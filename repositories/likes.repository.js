const { Likes } = require("../models");
const { Op } = require("sequelize");

class LikeRepository {
  findOneLike = async (userId) => {
    const like = await Likes.findOne({ where: { UserId: userId } });

    return like;
  };

  createLike = async (userId, postId) => {
    const createLikeData = await Likes.create({
      UserId: userId,
      PostId: postId,
    });

    return createLikeData;
  };

  deleteLike = async (userId, postId) => {
    const deleteLikeData = await Likes.destroy({
      where: { [Op.and]: [{ UserId: userId }, { PostId: postId }] },
    });

    return deleteLikeData;
  };
}

module.exports = LikeRepository;
