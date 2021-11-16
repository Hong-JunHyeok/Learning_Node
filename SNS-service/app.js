const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const passportConfig = require("./passport");
const { sequelize } = require("./models");

require("dotenv").config();

const app = express();
sequelize.sync();
passportConfig(passport);

app.set("views", path.join(__dirname, "views")); // 뷰 템플릿들이 정의되어 있는 폴더의 절대주소를 명시함.
app.set("view engine", "pug"); // view engine을 pug로 사용함.
app.set("port", process.env.PORT || 8001); // 기본 포트를 8001로 설정함.

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public"))); // static폴더를 express.static에 명시함
app.use(express.json()); // JSON형식의 데이터를 받음
app.use(express.urlencoded({ extended: false })); // URL을 인코딩함.
app.use(cookieParser(process.env.COOKIE_SECRET)); // req에 cookie string을 JSON으로 변환함.
app.use(
  session({
    // 세션 관리용 미들웨어, 클라이언트에 쿠키를 보냄.
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");

app.use("/", pageRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  // 라우트를 찾지 못했을 때 실행되는 미들웨어.
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  //! 에러 핸들러
  res.status(error.status | 500);
  res.render("error", {
    message: error.message,
    error: req.app.get("env") === "development" ? error : {},
  });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port") + "번 포트에서 대기중...");
});
