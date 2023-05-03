const { Users, Posts, Comments } = require("../models");

class CommentRepository {
  // postId에 해당하는 게시물 찾기
  findOnePost = async (postId) => {
    const post = await Posts.findByPk(postId);

    return post;
  };

  // 댓글 생성
  createComment = async (userId, postId, comment) => {
    const createCommentData = await Comments.create({
      UserId: userId,
      PostId: postId,
      comment,
    });
    return createCommentData;
  };

  // 모든 댓글 찾기
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
