// http와 express를 쓰기 위해서 가져와서 선언하고
var http = require("http");
var express = require("express");

//express객체를 app이라는 변수로 선언한다.

var app = express();

app.set("port", process.env.PORT || 3000);

// 1차 미들웨어를 먼저 선언하고 그 곳에 요청한 유저의 이름을 마이크라고 지정하고
// 다음 미들웨어로 넘겨준다.
app.use((req, res, next) => {
  console.log("1차 미들웨어 호출!!");
  //요청 헤더에 User-Agent를 추가하고
  // 파라미터의 네임은 요청받은 쿼리의 이름으로

  var userAgent = req.header("User-Agent");
  var paramName = req.query.name;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf-8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>User-Agent : " + userAgent + "</p></div>");
  res.write("<div><p>Param name : " + paramName + "</p></div>");
  res.end();
});

// 다음 2차미들웨어는 서버의 상태가 정상이면 헤더를 설정하고
// h1태그로 서버에서 어떠한 유저가 그 결과를 응답했는지 보여준다
app.use("/", (req, res, next) => {
  console.log("2차 미들웨어 호출");

  // 200 = 정상이면 ->
  res.writeHead("200", { "Content-Type": "text/html;charset=utf-8" });
  res.end("<h1>Express 서버에서 " + req.user + "가 응답한 결과를 보여줌</h1>");
});

// 서버는 express객체를 이용해서 실행한다.
var server = http.createServer(app).listen(app.get("port"), () => {
  console.log("익스프레스로 웹 서버를 실행함 :" + app.get("port"));
});
