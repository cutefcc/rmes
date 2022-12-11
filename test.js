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
const fs = require('fs');
// fs.readFile('./tsconfig.json', () => {
setTimeout(() => {
  console.log('timeout');
}, 0);
setImmediate(() => {
  console.log('immediate');
});
// });
