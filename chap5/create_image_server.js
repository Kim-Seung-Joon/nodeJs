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

  const filename = "splash.png";
  fs.readFile(filename, (err, data) => {
    res.writeHead(200, { "content-type": "image/png" });
    res.write(data);
    res.end();
  });
});

server.off("close", () => {
  console.log("서버가 종료됩니다.");
});
