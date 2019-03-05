function add(a, b, callback) {
  let result = a + b;
  callback(result);

  var history = () => {
    return a + "+" + b + "=" + result;
  };
  return history;
}

//일반적인 선언 방법
add(10, 10, function(result) {
  console.log("파라미터로 전달된 콜백 함수 호출됨.");
  console.log("10,10을 받아서 더하기를 한 결과는? ", result);
});

// 화살표 함수로 사용하기!
add(20, 20, result => {
  console.log("화살표로 2020하기");
  console.log("2020의 결과는 : ", result);
});

// history를 사용한 결과
var add_history = add(10, 10, result => {
  console.log("히스토리된 결과 출력하기");
  console.log("1010히스토리의 결과는? : ", result);
});

console.log("add_history의 결과 : " + add_history());
