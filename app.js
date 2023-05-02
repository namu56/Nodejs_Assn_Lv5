express = require("express");
const app = express(); // HTTP 요청 및 응답에 대한 기능을 제공하는  Express 모듈을 호출하여 애플리케이션 객체를 반환
const port = 3000;

const cookieParser = require("cookie-parser");
const router = require("./routes");

app.use(express.json());
app.use(cookieParser());
app.use("/", router);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요");
});
