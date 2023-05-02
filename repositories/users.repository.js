const { Users } = require("../models");

class UserRepository {
  findUser = async (nickname) => {
    const findOneUserData = await Users.findOne({ where: { nickname } });

    return findOneUserData;
  };

  createUser = async (nickname, password) => {
    const createUserData = await Users.create({
      nickname,
      password,
    });

    return createUserData;
  };

  loginUser = async (nickname) => {
    const loginUserData = await Users.findOne({ where: { nickname } });

    return loginUserData;
  };
}

module.exports = UserRepository;
