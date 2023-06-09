const { Users, Posts } = require("../models");
const { Op } = require("sequelize");

// 게시글 생성
class PostRepository {
  createPost = async (userId, title, content) => {
    const createPostData = await Posts.create({
      UserId: userId,
      title,
      content,
    });

    return createPostData;
  };

  // 모든 게시글 찾기
  findAllPost = async () => {
    const allPost = await Posts.findAll({
      attributes: ["postId", "UserId", "title", "createdAt", "updatedAt"],
      // Users 테이블과 연결하여 nickname 컬럼 가져오기
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

  // postId에 맞는 게시글 찾기
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
  // update하거나 delete할 post 찾기
  findPostForUpdateOrDelete = async (userId, postId) => {
    const post = await Posts.findOne({
      where: { [Op.and]: [{ UserId: userId }, { postId }] },
    });

    return post;
  };
  // 업데이트 하기
  updatePost = async (title, content, postId) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postId } }
    );
    return updatePostData;
  };
  // 삭제하기
  deletePost = async (postId) => {
    const deletePostData = await Posts.destroy({ where: { postId } });

    return deletePostData;
  };
}

module.exports = PostRepository;
