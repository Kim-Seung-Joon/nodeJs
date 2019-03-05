var fs = require('fs');

fs.open('./output.txt','r',(err, fd)=>{
  if(err) throw err;

  // Buffer은 deprecated(지원하지 않음)관련 issue가 뜨니까 참고!

  var buf = new Buffer(10);
  console.log('버퍼 타입 : %s',Buffer.isBuffer(buf));

  // 파일을 읽고, 오류면 오류처리하고, 읽고 쓰기 관련 하기 
  fs.read(fd, buf, 0 , buf.length, null, (err, bytesRead, buffer) =>{
    if(err) throw err;

    var inStr = buffer.toString('utf-8', 0, bytesRead);
    console.log('파일에서 읽어 온 데이터 : %s',inStr);

    console.log(err, bytesRead, buffer);

    fs.close(fd, () =>{
      console.log('output.txt 파일을 열고 읽기까지 완료!!');
    })
  })

})