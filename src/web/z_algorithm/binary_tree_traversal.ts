//   Definition for a binary tree node.
class TreeNode {
  val: number;

  left: TreeNode | null;

  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// 递归实现中序遍历
function inorderTraversal(root: TreeNode | null): number[] {
  let res: number[] = [];
  if (!root) return [];
  if (root.left) {
    res = inorderTraversal(root.left);
  }
  if (root) {
    res.push(root.val);
  }
  if (root.right) {
    res = [...res, ...inorderTraversal(root.right)];
  }
  return res;
  ///////// 下面👇也可以
  // if (!root) return [];
  // return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)];
}
// // 递归实现前序遍历
// function prevTraversal(root: TreeNode | null): number[] {
//     if (!root) return [];
//     return [root.val, ...inorderTraversal(root.left), ...inorderTraversal(root.right)];
// };
// // 递归实现后序遍历
// function backTraversal(root: TreeNode | null): number[] {
//     if (!root) return [];
//     return [...inorderTraversal(root.left), ...inorderTraversal(root.right), root.val];
// };
/////
// 非递归实现中序遍历
// function inorderTraversal(root: TreeNode | null): number[] {
//   let res: number[] = [];
//   let stack: TreeNode[] = [];
//   let cur = root;
//   while (cur || stack.length) {
//     while (cur) {
//       stack.push(cur);
//       cur = cur.left;
//     }
//     cur = stack.pop();
//     res.push(cur.val);
//     cur = cur.right;
//   }
//   return res;
// }
// // 非递归实现前序遍历
function prevTraversal(root: TreeNode | null): number[] {
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      res.push(cur.val); // 前序遍历的区别就是这里
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    cur = cur.right;
  }
  return res;
}
// // 非递归实现后序遍历
function backTraversal(root: TreeNode | null): number[] {
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      res.unshift(cur.val); // 后序遍历的区别就是这里
      stack.push(cur);
      cur = cur.right;
    }
    cur = stack.pop();
    cur = cur.left;
  }
  return res;
}
