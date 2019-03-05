var Calc = require("./4-3. calc");

var calc1 = new Calc();
calc1.emit("stop");

console.log("Calc에 stop이벤트 전달.");
