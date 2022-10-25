var fn = function (a, b) {
    if (a === undefined) {
        return;
    }
    if (a !== undefined) {
        return a;
    }
    if (b !== undefined) {
        return b;
    }
};
console.log(fn('123'));
// function makeDate(timestamp: number): Date;
// function makeDate(m: number, d: number, y: number): Date;
// function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
//   if (d !== undefined && y !== undefined) {
//     return new Date(y, mOrTimestamp, d);
//   } else {
//     return new Date(mOrTimestamp);
//   }
// }
// const d1 = console.log(makeDate(12345678));
// const d2 = console.log(makeDate(5, 5, 5));
