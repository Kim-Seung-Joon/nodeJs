var express = require("express");
var http = require("http");
var path = require("path");

var bodyParser = require("body-parser");
var static = require("serve-static");

// express객체 선언
var app = express();

//오류 처리 핸들러
var expressErrorHandler = require("express-error-handler");

// 쿠키 처리하기
var cookieParser = require("cookie-parser");

// 포트번호 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 이용한 application/x-www-form-urlencoded를 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// json형식으로 파싱
app.use(bodyParser.json());

// 쿠키파서 사용하기
app.use(cookieParser());

// 라우터 사용을 위한 express에 있는 라우터 객체 참조

var router = express.Router();

router.route("/process/showCookie").get((req, res) => {
  console.log("/process/showCookie 호출됨");

  res.send(req.cookies);
});

router.route("/process/setUserCookie").get((req, res) => {
  console.log("/process/setUserCookie 호출됨");

  // 쿠키 설정하기
  res.cookie("user", {
    id: "mike",
    name: "왕건",
    authorized: true
  });

  res.redirect("/process/showCookie");
});

// app.all("*", (req, res) => {
//   res.status(404).send("<h1>Error- 페이지를 찾을 수 없습니다.</h1>");
// });

app.use("/", router);

app.use("/public", static(path.join(__dirname, "public")));

var errorHandler = expressErrorHandler({
  static: {
    "404": "./public/404.html"
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// 서버를 실행함!!!!
var server = http.createServer(app).listen(app.get("port"), () => {
  console.log("익스프레스로 웹 서버를 실행함 :" + app.get("port"));
});
