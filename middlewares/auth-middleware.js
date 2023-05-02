const jwt = require("jsonwebtoken");
const { Users } = require("../models");

// 사용자 검증 미들웨어

module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  const [authType, authToken] = (Authorization ?? "").split(" ");

  // authType === Bearer, authToken 검증
  if (authType !== "Bearer" || !authToken) {
    throw new Error("400, 로그인이 필요한 기능입니다.");
  }

  try {
    const { userId } = jwt.verify(authToken, "secret-key");
    const user = await Users.findByPk(userId);
    res.locals.user = user;
    next();
  } catch (error) {
    console.error(error);
    throw new Error("400, 전달된 쿠키에서 오류가 발생하였습니다.");
  }
};
