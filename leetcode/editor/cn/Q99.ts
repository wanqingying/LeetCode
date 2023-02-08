// 恢复二叉搜索树
//给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树 。
//
//
//
// 示例 1：
//
//
//输入：root = [1,3,null,null,2]
//输出：[3,1,null,null,2]
//解释：3 不能是 1 的左孩子，因为 3 > 1 。交换 1 和 3 使二叉搜索树有效。
//
//
// 示例 2：
//
//
//输入：root = [3,1,4,null,null,2]
//输出：[2,1,4,null,null,3]
//解释：2 不能在 3 的右子树中，因为 2 < 3 。交换 2 和 3 使二叉搜索树有效。
//
//
//
// 提示：
//
//
// 树上节点的数目在范围 [2, 1000] 内
// -2³¹ <= Node.val <= 2³¹ - 1
//
//
//
//
// 进阶：使用 O(n) 空间复杂度的解法很容易实现。你能想出一个只使用 O(1) 空间的解决方案吗？
//
// Related Topics 树 深度优先搜索 二叉搜索树 二叉树 👍 804 👎 0

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

/**
 Do not return anything, modify root in-place instead.
 1 2 3 4 5
 1 4 3 2 5
 1 2 3 5 4
 */
function recoverTree(root: TreeNode | null): void {
  let na = null;
  let nb = null;
  let h: TreeNode | null = root;
  // 顺序排列
  const nodes: TreeNode[] = [];
  function toLeft(n: TreeNode) {
    while (n) {
      stack.unshift(n);
      n = n.left;
    }
  }
  const stack: TreeNode[] = [];
  toLeft(root);

  while (stack.length) {
    const p = stack.shift();
    nodes.push(p);
    if (p.right) {
      toLeft(p.right);
    }
  }

  for (let i = 0; i < nodes.length - 1; i++) {
    if (nodes[i + 1].val < nodes[i].val) {
      // 左侧，逆序，下一个更小
      nb = nodes[i];
      break;
    }
  }
  for (let i = nodes.length - 1; i > 0; i--) {
    if (nodes[i - 1].val > nodes[i].val) {
      // 逆序
      na = nodes[i];
      break;
    }
  }

  if (na && nb) {
    let c = na.val;
    na.val = nb.val;
    nb.val = c;
  }
}
//leetcode submit region end(Prohibit modification and deletion)
