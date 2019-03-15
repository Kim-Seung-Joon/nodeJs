var express = require("express");
var http = require("http");
var path = require("path");

var bodyParser = require("body-parser");
var static = require("serve-static");

var expressErrorHandler = require("express-error-handler");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");

// 파일 업로드용 미들웨어
var fs = require("fs");
var multer = require("multer");

// express 실행
var app = express();

// CORS
var cors = require("cors");

// localhost 3000번째 포트로 열겠다
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));
app.use("/uploads", static(path.join(__dirname, "uploads")));

//cookie-parser
app.use(cookieParser());

// 세션 설정
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true
  })
);

// cors
app.use(cors());

//multer미들웨어 사용
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname + Date.now());
  }
});

//업로드 파일크기 제한
var upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024
  }
});

var router = express.Router();

router.route("/process/save").post(upload.array("photo", 1), (req, res) => {
  console.log("/process/save 호출됨");

  try {
    var files = req.files;

    var paramAuth = req.body.author;
    var paramDate = req.body.date;
    var paramContents = req.body.contents;

    console.log("작성자 : " + paramAuth);
    console.log("날짜 : " + paramDate);
    console.log("내용 : " + paramContents);

    console.dir("#==== 업로드된 첫번째 파일 정보");
    console.dir(req.files[0]);
    console.dir("#====#");

    // 현재의 파일 정보를 저장할 변수 선언
    var originalname = "",
      filename = "",
      mimetype = "",
      size = 0;

    if (Array.isArray(files)) {
      console.log("배열에 들어가 있는 파일의 갯수 : %d", files.length);

      for (var index = 0; index < files.length; index++) {
        originalname = files[index].originalname;
        filename = files[index].filename;
        mimetype = files[index].mimetype;
        size = files[index].size;
      }
    } else {
      // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
      console.log("파일 갯수 : 1 ");

      originalname = files[index].originalname;
      filename = files[index].name;
      mimetype = files[index].mimetype;
      size = files[index].size;
    }

    console.log(
      "현재 파일 정보 : " +
        originalname +
        ", " +
        filename +
        ", " +
        mimetype +
        ", " +
        size
    );

    // 응답
    res.writeHead("200", {
      "Content-type": "text/html;charset=utf-8"
    });
    res.write("<h2>메모가 저장되었습니다.</h2>");
    res.write("<h3>서버에 저장된 사진</h3>");
    res.write('<img src="/uploads/"' + filename + '"width=200px>');
    res.write(
      '<div><input type="button" value="다시 작성" onclick="javascript:history.back()"></div>'
    );
    res.end();
  } catch (err) {
    console.dir(err.stack);

    res.writeHead("400", { "Content-Type": "text/html;charset=utf-8" });
    res.write("<div>오류 발생!!</div>");
    res.end();
  }
});

// router.route("/process/save").post((req, res) => {
//   console.log("/process/save호출");

//   try {
//     var paramAuth = req.body.author;
//     var paramDate = req.body.date;
//     var paramContents = req.body.contents;

//     console.log("작성자 : " + paramAuth);
//     console.log("날짜 : " + paramDate);
//     console.log("내용 : " + paramContents);

//     res.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
//     res.write("<div><p>메모가 잘 저장됨</p></div>");
//     res.write(
//       '<div><input type="button" value="메모 작성으로 돌아가기"></div>'
//     );
//     res.end();
//   } catch (err) {
//     console.dir(err.stack);

//     res.writeHead(400, { "Content-type": "text/html;charset=utf-8" });
//     res.write("<div><p>메모 저장 페이지 에러</p></div>");
//     res.end();
//   }
// });

app.use("/", router);

var errorHandler = expressErrorHandler({
  static: {
    "404": "./public/404.html"
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get("port"), () => {
  console.log(
    "웹 서버 시작 %s -> %s",
    server.address().address,
    server.address().port
  );
});
