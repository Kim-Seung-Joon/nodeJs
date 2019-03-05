var fs = require("fs");

// output(읽어 들이는 파일)
// output2(파일 쓴 결과)
var inname = "./output.txt";
var outname = "./output2.txt";

// 파일을 읽었을 때, 존재하면, 기존파일을 삭제하고
fs.exists(outname, exist => {
  if (exist) {

    // unlink를 쓰는 이유는 기존에 output2라는 파일이 존재하기 때문에 그 파일을 날리고 합친다.
    fs.unlink(outname, err => {
      if (err) throw err;
      console.log("기존 파일 [" + outname + "] 삭제!!");
    });
  }

  // 스트림형식으로 파일을 읽고 쓰는 객체를 생성한 다음에
  var infile = fs.createReadStream(inname, { flags: "r" });
  var outfile = fs.createWriteStream(outname, { flags: "w" });

  // in + out 즉, 파일을 합쳐준다.

  infile.pipe(outfile);
  console.log("파일 복사 [" + inname + "] -> [" + outname + "]");
});
