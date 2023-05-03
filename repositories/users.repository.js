const { Users } = require("../models");

class UserRepository {
  // 이미 nickname이 있는 모든 유저 찾기
  findUser = async (nickname) => {
    const findOneUserData = await Users.findOne({ where: { nickname } });

    return findOneUserData;
  };

  // 유저 생성
  createUser = async (nickname, password) => {
    const createUserData = await Users.create({
      nickname,
      password,
    });

    return createUserData;
  };
}

module.exports = UserRepository;
