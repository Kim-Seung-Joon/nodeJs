var Users = [{ name: "홍길동", age: 20 }, { name: "궁예", age: 45 }];

Users.push({ name: "왕건", age: 60 });

console.log("사용자 수: %d", Users.length);
console.log("첫 번째 사용자 이름: %s", Users[0].name);

for (var i = 0; i < Users.length; i++) {
  console.log("각 배열의 요소 # " + i + " : %s", Users[i].name);
}

console.log("for each를 사용하는 경우");
Users.forEach(function(item, index) {
  console.log("배열 요소 # :" + index + ":%s", item.name);
});
