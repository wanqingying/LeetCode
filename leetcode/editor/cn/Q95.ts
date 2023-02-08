// 不同的二叉搜索树 II
//给你一个整数 n ，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。可以按 任意顺序 返回答案。
//
//
//
//
//
// 示例 1：
//
//
//输入：n = 3
//输出：[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
//
//
//
//
// 示例 2：
//
//
//输入：n = 1
//输出：[[1]]
//
//
//
//
// 提示：
//
//
// 1 <= n <= 8
//
//
// Related Topics 树 二叉搜索树 动态规划 回溯 二叉树 👍 1329 👎 0

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


function generateTrees(n: number): Array<TreeNode | null> {
  const mx: TreeNode[][] = [[null], [new TreeNode(1)]];
  function clone(n: TreeNode, dec = 0) {
    if (!n) {
      return n;
    }
    const root = new TreeNode(n.val + dec);
    function sync(res: TreeNode, source: TreeNode) {
      if (source.left) {
        res.left = new TreeNode(source.left.val + dec);
        sync(res.left, source.left);
      }
      if (source.right) {
        res.right = new TreeNode(source.right.val + dec);
        sync(res.right, source.right);
      }
    }
    sync(root, n);
    return root;
  }

  for (let i = 2; i <= n; i++) {
    let mi: TreeNode[] = [];
    for (let j = 0; j < i; j++) {
      let mxLeft = mx[j];
      let mxRight = mx[i - j - 1];
      mxLeft.forEach((left) => {
        mxRight.forEach((right) => {
          const root = new TreeNode(j + 1);
          root.left = clone(left);
          root.right = clone(right, j + 1);
          mi.push(root);
        });
      });
    }
    mx[i] = mi;
  }
  return mx[mx.length - 1];
}
// console.log(generateTrees(5).length);
//leetcode submit region end(Prohibit modification and deletion)
