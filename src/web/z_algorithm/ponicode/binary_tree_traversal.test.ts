import rewire from 'rewire';
const binary_tree_traversal = rewire('../binary_tree_traversal');
const inorderTraversal = binary_tree_traversal.__get__('inorderTraversal');
// @ponicode
describe('inorderTraversal', () => {
  test('0', () => {
    let param1: any = new binary_tree_traversal.TreeNode(undefined, undefined, undefined);
    let result: any = inorderTraversal(param1);
    expect(result).toMatchSnapshot();
  });

  test('1', () => {
    let result: any = inorderTraversal(null);
    expect(result).toMatchSnapshot();
  });

  test('2', () => {
    let result: any = inorderTraversal(undefined);
    expect(result).toMatchSnapshot();
  });
});
