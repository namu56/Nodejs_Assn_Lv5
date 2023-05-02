const { Users, Posts } = require("../models");

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

  findOnePost = async (postId) => {
    const targetedPost = await Posts.findOne({
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

    return targetedPost;
  };
}

module.exports = PostRepository;
