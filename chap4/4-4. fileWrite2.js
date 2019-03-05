var fs = require('fs');


// 파일을 열고, 쓰기 모드로 연다
// err이면 오류 처리하고
// buf를 만들어서 그 곳에 안녕이라고 값을 넣어주고
// 그 연 파일에 write를 해서 파일을 닫을때 완료했다고 알려준다.

fs.open('./output.txt','w', (err,fd)=>{
  if(err) throw err;

  var buf = new Buffer('안녕!\n');

  fs.write(fd, buf, 0 ,buf.length, null, (err,written,buffer)=>{
    if(err){
      throw err;
    }
    console.log(err, written, buffer);

    fs.close(fd, ()=>{
      console.log('파일 열고 데이터 쓰고, 파일 닫기까지 완료!!');
    })
  })
})