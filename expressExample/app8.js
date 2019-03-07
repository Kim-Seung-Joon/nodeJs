var express = require("express");
var http = require("http");
var path = require("path");

var bodyParser = require("body-parser");
var static = require("serve-static");

// express객체 선언
var app = express();

// 포트번호 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 이용한 application/x-www-form-urlencoded를 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// json형식으로 파싱
app.use(bodyParser.json());

// 라우터 사용을 위한 express에 있는 라우터 객체 참조

var router = express.Router();

router.route("/process/login").post((req, res) => {
  console.log("/process/login 라우팅 함수에서 받음");

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf-8" });
  res.write("<h1>서버에서의 로그인 응답</h1>");
  res.write("<div><p>" + paramId + "</p></div>");
  res.write("<div><p>" + paramPassword + "</p></div>");
  res.end();
});

app.use("/", router);

app.use("/public", static(path.join(__dirname, "public")));

// 서버를 실행함!!!!
var server = http.createServer(app).listen(app.get("port"), () => {
  console.log("익스프레스로 웹 서버를 실행함 :" + app.get("port"));
});
