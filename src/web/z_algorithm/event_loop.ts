// setTimeout(function () {
//   console.log(1);
// });
// setImmediate(function () {
//   console.log(2);
// });
// process.nextTick(function () {
//   console.log(3);
// });
// new Promise((resolve, reject) => {
//   console.log(4);
//   resolve(4);
// }).then(function () {
//   console.log(5);
// });
// console.log(6);

console.log('1');

setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  });
  new Promise(function (resolve) {
    console.log('4');
    resolve('5');
  }).then(function () {
    console.log('5');
  });
});
process.nextTick(function () {
  console.log('6');
});
new Promise(function (resolve) {
  console.log('7');
  resolve('7');
}).then(function (val) {
  console.log('8');
});

setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  });
  new Promise(function (resolve) {
    console.log('11');
    resolve('11');
  }).then(function () {
    console.log('12');
  });
});
