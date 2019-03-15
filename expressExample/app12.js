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
// 세션 처리하기
var expressSession = require("express-session");

// 포트번호 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 이용한 application/x-www-form-urlencoded를 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// json형식으로 파싱
app.use(bodyParser.json());

// 쿠키파서 사용하기
app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true
  })
);

// 라우터 사용을 위한 express에 있는 라우터 객체 참조

var router = express.Router();

router.route("/process/product").get((req, res) => {
  console.log("/process/product 호출됨");

  if (req.session.user) {
    res.redirect("/public/product.html");
  } else {
    res.redirect("/public/login2.html");
  }
});

router.route("/process/login").post((req, res) => {
  console.log("/process/login 호출됨.");

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  if (req.session.user) {
    console.log("로그인 상태이므로 상품 페이지로 이동합니다.");

    res.redirect("/public/product.html");
  } else {
    // 세션 저장

    req.session.user = {
      id: paramId,
      name: "왕건",
      authorized: true
    };
  }

  res.writeHead("200", { "Content-Type": "text/html;charset=utf-8" });
  res.write("<h1>로그인 성공</h1>");
  res.write("<div><p>Param id: " + paramId + "</p></div>");
  res.write("<div><p>Param Password : " + paramPassword + "</p></div>");
  res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
  res.end();
});

router.route("/process/logout").get((req, res) => {
  console.log("/process/logout 호출됨.");

  if (req.session.user) {
    //로그인 된 상태

    console.log("로그아웃합니다.");

    req.session.destroy(err => {
      if (err) {
        throw err;
      }
      console.log("세션을 삭제하고 로그아웃됩니다");
      res.redirect("/public/login2.html");
    });
  } else {
    console.log("아직 로그인 되지 않았습니다.");
    res.redirect("/public/login2.html");
  }
});

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
