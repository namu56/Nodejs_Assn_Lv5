const { Users, Posts, Likes } = require("../models");
const { Op } = require("sequelize");
class PostRepository {
  createPost = async (userId, title, content) => {
    const createPostData = await Posts.create({
      UserId: userId,
      title,
      content,
    });

    return createPostData;
  };

  findAllPost = async () => {
    const allPost = await Posts.findAll({
      attributes: ["postId", "UserId", "title", "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return allPost;
  };

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
        {
          model: Likes,
          attributes: [],
          where: { UserId: userId },
        },
      ],
      order: [["likes", "DESC"]],
      where: { UserId: userId },
    });
    return postsOfLike;
  };

  findOnePost = async (postId) => {
    const targetPost = await Posts.findOne({
      attributes: [
        "postId",
        "UserId",
        "title",
        "content",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      where: { postId },
    });

    return targetPost;
  };

  findPostForUpdateAndDelete = async (userId, postId) => {
    const post = await Posts.findOne({
      where: { [Op.and]: [{ UserId: userId }, { postId }] },
    });

    return post;
  };

  updatePost = async (title, content, postId) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postId } }
    );
    return updatePostData;
  };

  deletePost = async (postId) => {
    const deletePostData = await Posts.destroy({ where: { postId } });

    return deletePostData;
  };

  incrementLike = async (postId) => {
    const incrementLikeData = await Posts.increment("likes", {
      where: { postId },
    });

    return incrementLikeData;
  };

  decrementLike = async (postId) => {
    const decrementLikeData = await Posts.decrement("likes", {
      where: { postId },
    });

    return decrementLikeData;
  };
}

module.exports = PostRepository;
