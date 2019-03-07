var express = require('express');
var http = require('http');


// app = express 서버 객체
var app = express();


// process의 env의 포트번호가 없으면 그냥 3000번을 포트번호로 사용한다.
app.set('port',process.env.PORT || 3000);

var server = http.createServer(app).listen(app.get('port'),()=>{
  console.log('express를 이용한 웹 서버를 실행함 : '+app.get('port'));
});

