// 二叉树的后序遍历
//给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历 。
//
//
//
// 示例 1：
//
//
//输入：root = [1,null,2,3]
//输出：[3,2,1]
//
//
// 示例 2：
//
//
//输入：root = []
//输出：[]
//
//
// 示例 3：
//
//
//输入：root = [1]
//输出：[1]
//
//
//
//
// 提示：
//
//
// 树中节点的数目在范围 [0, 100] 内
// -100 <= Node.val <= 100
//
//
//
//
// 进阶：递归算法很简单，你可以通过迭代算法完成吗？
//
// Related Topics 栈 树 深度优先搜索 二叉树 👍 966 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
function postorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: any[] = [root];
  while (stack.length) {
    const ind = stack.pop();
    if (!ind) continue;
    if (typeof ind === "number") {
      result.push(ind);
    } else if (!ind?.right && !ind?.left) {
      result.push(ind.val);
    } else {
      stack.push(ind.val);
      if (Boolean(ind?.right)) stack.push(ind.right);
      if (Boolean(ind?.left)) stack.push(ind.left);
    }
  }

  return result;
}

console.log(
  postorderTraversal({
    val: 1,
    left: null,
    right: { val: 2, left: { val: 3, left: null, right: null }, right: null },
  })
);

function postorderTraversal2(root: TreeNode | null): number[] {
  interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
  }

  const result: number[] = [];

  function traverse(node: TreeNode | null) {
    if (!node) return;
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    result.push(node.val);
  }
  traverse(root);
  return result;
}
//leetcode submit region end(Prohibit modification and deletion)
