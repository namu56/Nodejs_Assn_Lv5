const { Users, Posts, Comments } = require("../models");

class CommentRepository {
  findOnePost = async (postId) => {
    const post = await Posts.findByPk(postId);

    return post;
  };

  createComment = async (userId, postId, comment) => {
    const createCommentData = await Comments.create({
      UserId: userId,
      PostId: postId,
      comment,
    });
    return createCommentData;
  };

  findAllComment = async () => {
    const allComment = await Comments.findAll({
      attributes: ["commentId", "UserId", "comment", "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return allComment;
  };

  findOneComment = async (commentId) => {
    const commentOfPost = await Comments.findOne({ where: { commentId } });

    return commentOfPost;
  };

  updateComment = async (comment, commentId) => {
    const updateCommentData = await Comments.update(
      { comment },
      { where: { commentId } }
    );

    return updateCommentData;
  };

  deleteComment = async (commentId) => {
    const deleteCommentData = await Comments.destroy({ where: { commentId } });

    return deleteCommentData;
  };
}

module.exports = CommentRepository;
