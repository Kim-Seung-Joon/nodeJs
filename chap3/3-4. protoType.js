function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.walk = speed => {
  console.log(speed + "의 속도로 진행중");
};

var person1 = new Person("궁예", 66);
var person2 = new Person("왕건", 77);

console.log(person1.name + "객체의 걷는속도를 호출");
person1.walk(10);
