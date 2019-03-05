// // exit를 하면 이벤트가 발생이 되고
// process.on('exit', ()=>{
//   console.log('exit 이벤트 발생');
// })

// // 타임아웃을 사용하고 2000(2초의 값을 준다)을 주면 시스템이 exit() 되도록 한다.
// setTimeout(()=>{
//   console.log('2초 후에 시스템 종료를 시도함.');

//   process.exit();
// },2000);

process.on("tick", (count) => {
  console.log("tick 이벤트 발생함: " + count);
});

setTimeout(() => {
  console.log("2초후에 tick 이벤트 전달");

  process.emit('tick', '2');
}, 2000);
