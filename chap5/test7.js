var http = require('http');

var options = {
  host: 'www.google.com',
  port: 80,
  path: '/'
}

// http의 get방식으로 데이터를 받고 그 데이터를 받은 결과를 res에 처리하는 과정
var req  = http.get(options, (res)=>{

  //응답 처리 과정
  var resData = '';
  res.on('data', (chunk)=>{
    resData += chunk;
  });

  res.on('end', ()=>{
    console.log(resData);
  });
});

req.on('error', err=>{
  console.log('오류 발생 :' +err.message);
})