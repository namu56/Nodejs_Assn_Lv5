const PostRepository = require("../repositories/posts.repository");

class PostService {
  postRepository = new PostRepository();

  createPost = async (userId, title, content) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      title,
      content
    );

    return createPostData;
  };

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    return allPost.map((post) => {
      return {
        postId: post.postId,
        userId: post.UserId,
        nickname: post.User.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  findPostsOfLike = async (userId) => {
    const postsOfLike = await this.postRepository.findPostsOfLike(userId);

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

  findOnePost = async (postId) => {
    const targetPost = await this.postRepository.findOnePost(postId);

    return {
      postId: targetPost.postId,
      userId: targetPost.UserId,
      nickname: targetPost.User.nickname,
      title: targetPost.title,
      content: targetPost.content,
      createdAt: targetPost.createdAt,
      updatedAt: targetPost.updatedAt,
    };
  };

  findPostForUpdateAndDelete = async (userId, postId) => {
    const post = await this.postRepository.findPostForUpdateAndDelete(
      userId,
      postId
    );

    return post;
  };

  updatePost = async (title, content, postId) => {
    const updatePostData = await this.postRepository.updatePost(
      title,
      content,
      postId
    );
    return updatePostData;
  };

  deletePost = async (postId) => {
    const deletePostData = await this.postRepository.deletePost(postId);

    return deletePostData;
  };

  incrementLike = async (postId) => {
    const incrementLikeData = await this.postRepository.incrementLike(postId);

    return incrementLikeData;
  };

  decrementLike = async (postId) => {
    const decrementLikeData = await this.postRepository.decrementLike(postId);

    return decrementLikeData;
  };
}

module.exports = PostService;
