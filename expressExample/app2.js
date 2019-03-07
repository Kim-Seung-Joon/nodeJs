var express = require("express");
var http = require("http");

var app = express();

app.set("port", process.env.PORT || 3000);

app.use((req, res, next) => {
  console.log("첫 번째의 미들웨어가 호출된다");

  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end("<h1>서버에서 응답 완료한 결과입니다.</h1>");
});

var server = http.createServer(app).listen(app.get("port"), () => {
  console.log("익스프레스로 웹 서버를 실행합니다. : " + app.get("port"));
});
