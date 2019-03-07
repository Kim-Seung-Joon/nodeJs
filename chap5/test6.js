const http = require("http");
const fs = require("fs");

const server = http.createServer();

/// 3000번이라는 포트를 열고 웹 서버 연결을 시작함
const port = 3000;
server.listen(port, () => {
  console.log("웹 서버가 시작되었습니다: %d", port);
});

// on이라는 메소드를 사용해서 이벤트 처리가 시작됨을 알려준다.
server.on("connection", socket => {
  let addr = socket.address();
  console.log("클라이언트가 접속했습니다. : %s, %d", addr.address, addr.port);
});

// request요청이 들어오면 클라이언트로부터의 요청임을 확인하고 write를 사용해요 헤더와 html관련 내용을 응답한다.
// end로 끝낸 다음에는 서버를 off한다.
server.on("request", (req, res) => {
  console.log("클라이언트로부터의 요청이 들어옴");

  // 파일 이름을 읽고
  var filename = "splash.png";
  // 스트림형식으로 그 파일을 읽은 다음에 
  var infile = fs.createReadStream(filename, { flags: "r" });
  // infile.pipe(res);

  // 파일의 크기와 현재 크기를 확인 하기 위한 변수
  var filelength = 0;
  var curlength = 0;

  fs.stat(filename, (err, stats) => {
    filelength = stats.size;
  });

  res.writeHead(200, { "Content-Type": "image/png" });

  infile.on("readable", () => {
    var chunk;

    while (null !== (chunk = infile.read())) {
      console.log("읽어 들인 데이터 크기 : %d 바이트", chunk.length);
      curlength += chunk.length;
      res.write(chunk, "utf-8", err => {
        console.log(
          "파일 부분 쓰기 완료 :%d, 파일 크기: %d",
          curlength,
          filelength
        );

        // 현재의 길이가 파일의 길이보다 크거나 같아지면
        // 종료한다.
        if (curlength >= filelength) {
          res.end();
        }
      });
    }
  });
});

// 그 이후에는 서버를 종료
server.off("close", () => {
  console.log("서버가 종료됩니다.");
});
