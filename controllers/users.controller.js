const UserService = require("../sevices/users.service.js");

class UsersController {
  userService = new UserService();

  createSignup = async (req, res, next) => {
    const { nickname, password, confirm } = req.body;

    try {
      // 닉네임 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성하기(3글자 이상)
      const nickNameRegex = /^[a-zA-Z0-9]{3,}$/;
      if (!nickNameRegex.test(nickname)) {
        throw new Error("412, 닉네임 형식이 일치하지 않습니다.");
      }

      // 닉네임 4자리 이상, 닉네임과 같은 값이 포함됬을 떄
      if (password.length < 4 || password.includes(nickname)) {
        throw new Error("412, 패스워드 형식이 일치하지 않습니다.");
      }

      // 비밀번호 일치
      if (password !== confirm) {
        throw new Error("412, 패스워드가 일치하지 않습니다.");
      }

      const isExistUser = await this.userService.findUser(nickname);
      // 닉네임 중복 확인
      if (isExistUser) {
        throw new Error("412, 중복된 닉네임입니다.");
      }

      await this.userService.createSignup(nickname, password);
      res.status(201).json({ message: "회원 가입에 성공하였습니다." });
    } catch (error) {
      console.error(error);
      throw new Error("400, 요청한 데이터 형식이 올바르지 않습니다.");
    }
  };

  loginUser = async (req, res, next) => {
    const { nickname, password } = req.body;

    try {
      const isExistUser = await this.userService.findUser(nickname);

      // DB에 존재하지 않고, 패스워드가 틀리다면
      if (!isExistUser || isExistUser.password !== password) {
        throw new Error("412, 닉네임 또는 패스워드를 확인해주세요.");
      }
      const loginToken = await this.userService.loginUser(nickname);
      res.cookie("Authorization", `Bearer ${loginToken}`);
      return res.status(200).json({ loginToken });
    } catch (error) {
      console.error(error);
      throw new Error("400, 로그인에 실패하였습니다.");
    }
  };
}

module.exports = UsersController;
