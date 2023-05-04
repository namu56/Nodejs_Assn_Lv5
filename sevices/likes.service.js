const LikeRepository = require("../repositories/likes.repository");

class LikeService {
  likeRepository = new LikeRepository();

  findOnePost = async (postId) => {
    const existPost = await this.likeRepository.findOnePost(postId);

    return existPost;
  };

  findOneLike = async (userId, postId) => {
    const like = await this.likeRepository.findOneLike(userId);

    return like;
  };

  createLike = async (userId, postId) => {
    const createLikeData = await this.likeRepository.createLike(userId, postId);

    return createLikeData;
  };

  incrementLike = async (postId) => {
    const incrementLikeData = await this.likeRepository.incrementLike(postId);

    return incrementLikeData;
  };

  deleteLike = async (userId, postId) => {
    const deleteLikeData = await this.likeRepository.deleteLike(userId, postId);

    return deleteLikeData;
  };

  decrementLike = async (postId) => {
    const decrementLikeData = await this.likeRepository.decrementLike(postId);

    return decrementLikeData;
  };

  findPostsOfLike = async (userId) => {
    const postsOfLike = await this.likeRepository.findPostsOfLike(userId);

    return postsOfLike.map((post) => {
      return {
        postId: post.postId,
        userId: post.UserId,
        nickname: post.User.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes,
      };
    });
  };
}

module.exports = LikeService;
