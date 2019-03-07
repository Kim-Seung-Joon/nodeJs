var http = require("http");
var server = http.createServer();

var host = "192.168.0.12";
var port = 3000;

// 이렇게 하면 3000번 포트를 쓰는 서버가 열리게 되는 것!!!
server.listen(port, host, "50000", () => {
  console.log("웹 서버가 시작되었습니다. :%d %s", port, host);
});
