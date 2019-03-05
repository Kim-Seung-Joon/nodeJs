//  버퍼를 이용한 객체를 생성하고
var output = "안녕 1!";
var buffer1 = new Buffer(10);
var len = buffer1.write(output, "utf8");
console.log("첫 번째 버퍼의 문자열 : %s", buffer1.toString());

// 그 버퍼를 이용해서 2번 객체를 생성합니다.!!
var buffer2 = new Buffer("안녕 2!", "utf8");
console.log("두 번째 버퍼의 문자열 : %s", buffer2.toString());

// 그 객체의 타입을 확인하는 과정
console.log("버퍼 객체 타입: %s", Buffer.isBuffer(buffer1));

// 버퍼 객체에 들어있는 문자열 데이터를 문자열 변수로 생성
var byteLen = Buffer.byteLength(output);
var str1 = buffer1.toString("utf8", 0, byteLen);
var str2 = buffer2.toString("utf8");

//1번객체의 내용을 2번객체로 복사
buffer1.copy(buffer2, 0, 0, len);
console.log("두 번째 버퍼에 복사한 후의 문자열 : %s", buffer2.toString());

// 2개의 버퍼를 결함(concat)
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("버퍼1+버퍼2는 : ", buffer3.toString("utf8"));
