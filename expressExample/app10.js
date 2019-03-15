var express = require("express");
var http = require("http");
var path = require("path");

var bodyParser = require("body-parser");
var static = require("serve-static");

// express객체 선언
var app = express();

//오류 처리 핸들러
var expressErrorHandler = require("express-error-handler");

// 포트번호 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 이용한 application/x-www-form-urlencoded를 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// json형식으로 파싱
app.use(bodyParser.json());

// 라우터 사용을 위한 express에 있는 라우터 객체 참조

var router = express.Router();

router.route("/process/users/:id").get((req, res) => {
  console.log("/process/users/:id 처리함");

  var paramId = req.params.id;

  console.log("/process/users와 토큰 %s를 이용해 처리함.", paramId);

  res.writeHead("200", { "Content-Type": "text/html;charset=utf-8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.end();
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
