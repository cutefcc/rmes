// // 手写call
// Function.prototype.myCall = function (context) {
//   const temp = context || window; // 取得上下文，如果传递null 则默认window
//   temp._fn = this; // 取得调用myCall的函数，这个函数后面要被执行的
//   let res; // 返回结果
//   let args = []; // 获取参数
//   if (arguments.length <= 1) {
//     // 没有参数
//   } else {
//     // 有参数
//     for (let i = 1; i < arguments.length; i++) {
//       args.push(`arguments[${i}]`);
//     }
//   }
//   res = eval(`temp._fn(${args})`);
//   delete temp._fn;
//   return res;
// };

// 手写apply
// Function.prototype.myApply = function (context) {
//   let temp = context || window;
//   temp._fn = this;
//   let args = [];
//   if (Array.isArray(arguments[1])) {
//     args = arguments[1];
//   }
//   res = eval(`temp._fn(${args})`);
//   delete temp._fn;
//   return res;
// };
// const a = {
//   b: 123,
// };
// function test(a1, a2, a3) {
//   console.log(this.b, a1, a2, a3);
// }
// test.myApply(a, [4, 5, 6]);

// bind 做了哪些事情？
// 1. 会返回一个函数
// 2. 当返回的那个函数被调用时，bind 会绑定this（我们给的上下文）
// 3. bind 可以接受参数的，和返回的函数参数可以组合起来
Function.prototype.myBind = function (context) {
  // 容错 myBind 只供函数调用
  if (typeof this !== 'function') {
    throw Error('');
  }
  let args = arguments.slice(1);
  let temp = context || window;
  let fn = this; // 获取是那个函数调用myBind的
  const MiddleFn = function () {};
  const resFn = function () {
    return fn.myApply(this instanceof MiddleFn ? this : temp, [...args, ...arguments]);
  };
  // 链接原型链
  MiddleFn.prototype = this.prototype;
  resFn.prototype = new MiddleFn();
  return resFn;
};
