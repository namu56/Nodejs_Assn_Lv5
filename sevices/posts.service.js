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

  findOnePost = async (postId) => {
    const targetedPost = await this.postRepository.findOnePost(postId);

    return {
      postId: targetedPost.postId,
      userId: targetedPost.UserId,
      nickname: targetedPost.User.nickname,
      title: targetedPost.title,
      content: targetedPost.content,
      createdAt: targetedPost.createdAt,
      updatedAt: targetedPost.updatedAt,
    };
  };
}

module.exports = PostService;
