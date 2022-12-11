function getMask(a: number[], startIndex: number, endIndex: number) {
  let povit = a[startIndex]; // 取第一个元素为基准值
  let mask: number = startIndex; // 单边循环指针
  for (let i = startIndex + 1; i <= endIndex; i++) {
    // 如果判断比基准值小，就做两件事情（1. 指针++ 2. 指针所在值和当前值交换）
    if (a[i] < povit) {
      mask++;
      let temp = a[mask];
      a[mask] = a[i];
      a[i] = temp;
    }
  }
  // 最后再将指针所在位置 与基准值交换（让基准值处于中间位置）
  a[startIndex] = a[mask];
  a[mask] = povit;
  // 最后记得返回基准值的索引位置
  return mask;
}
function quickSort(arr: number[], startIndex: number, endIndex: number) {
  if (startIndex >= endIndex) {
    return;
  }
  // 得到基准值索引，同时将小于基准值的放在左边，大于基准值的放在右边（升序）
  let mask = getMask(arr, startIndex, endIndex);
  quickSort(arr, startIndex, mask - 1);
  quickSort(arr, mask + 1, endIndex);
}

const arr = [1, 7, 6, 4, 3, 3, 8, 9, 5, 4];
quickSort(arr, 0, arr.length - 1);
console.log(arr);
