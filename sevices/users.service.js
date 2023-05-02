const UserRepository = require("../repositories/users.repository");
const jwt = require("jsonwebtoken");

class UserService {
  userRepository = new UserRepository();

  findUser = async (nickname) => {
    const findOneUserData = await this.userRepository.findUser(nickname);

    return findOneUserData;
  };

  createSignup = async (nickname, password) => {
    const createUserData = await this.userRepository.createUser(
      nickname,
      password
    );

    return createUserData;
  };

  loginUser = async (nickname) => {
    const loginUserData = await this.userRepository.findUser(nickname);

    const loginToken = jwt.sign({ userId: loginUserData.userId }, "secret-key");

    return loginToken;
  };
}

module.exports = UserService;
