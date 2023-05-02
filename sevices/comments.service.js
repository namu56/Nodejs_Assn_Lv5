const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  findOnePost = async (postId) => {
    const post = await this.commentRepository.findOnePost(postId);

    return post;
  };

  createComment = async (userId, postId, comment) => {
    const createCommentData = await this.commentRepository.createComment(
      userId,
      postId,
      comment
    );

    return createCommentData;
  };

  findAllComment = async () => {
    const allComment = await this.commentRepository.findAllComment();

    return allComment.map((comment) => {
      return {
        commentId: comment.commentId,
        userId: comment.UserId,
        nickname: comment.User.nickname,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  findOneComment = async (commentId) => {
    const commentOfPost = await this.commentRepository.findOneComment(
      commentId
    );
    return commentOfPost;
  };

  updateComment = async (comment, commentId) => {
    const updateCommentData = await this.commentRepository.updateComment(
      comment,
      commentId
    );

    return updateCommentData;
  };

  deleteComment = async (commentId) => {
    const deleteCommentData = await this.commentRepository.deleteComment(
      commentId
    );

    return deleteCommentData;
  };
}

module.exports = CommentService;
