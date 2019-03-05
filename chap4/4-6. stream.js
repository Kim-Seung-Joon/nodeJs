var fs = require('fs');

// 읽는 스트림 객체
var infile = fs.createReadStream('./output.txt', {flags: 'r'});
// 쓰는 스트림 객체
var outfile = fs.createWriteStream('./output2.txt',{flags: 'w'});

// infile(읽는 스트림 객체)를 이용해서 파일을 읽고
infile.on('data', (data)=>{
  console.log('읽어 들인 데이터: ',data);
  outfile.write(data);
})

// infile이 끝나면 파읽 읽기를 먼저 종료하고 그 다음 쓰기를 종료한다.
infile.on('end', () =>{
  console.log('파일 읽기 종료.');
  outfile.end(()=>{
    console.log('파일쓰기 종료');
  })
})