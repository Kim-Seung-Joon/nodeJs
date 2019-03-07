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

app.use("/public", static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("첫 번째 미들웨어에서 요청을 처리함.");

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf-8" });
  res.write("<h1>express 서버의 응답결과 입니다</h1>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.write("<div><p>Param Password: " + paramPassword + "</p></div>");
  res.end();
});

// 서버를 실행함!!!!
var server = http.createServer(app).listen(app.get("port"), () => {
  console.log("익스프레스로 웹 서버를 실행함 :" + app.get("port"));
});
