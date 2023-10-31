//给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
//
// 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
//
//
//
// 示例 1：
//
//
//
//
//输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
//输出：3
//解释：和等于 8 的路径有 3 条，如图所示。
//
//
// 示例 2：
//
//
//输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
//输出：3
//
//
//
//
// 提示:
//
//
// 二叉树的节点个数的范围是 [0,1000]
//
// -10⁹ <= Node.val <= 10⁹
// -1000 <= targetSum <= 1000
//
//
// Related Topics 树 深度优先搜索 二叉树 👍 1649 👎 0

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

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
  static create(arr: (number | null)[]): TreeNode | null {
    const root = new TreeNode(arr[0] as number);
    const queue = [root];
    let i = 1;
    while (i < arr.length) {
      const node = queue.shift();
      if (node) {
        node.left = arr[i] === null ? null : new TreeNode(arr[i] as number);
        node.right =
          arr[i + 1] === null ? null : new TreeNode(arr[i + 1] as number);
        queue.push(node.left, node.right);
        i += 2;
      }
    }
    return root;
  }
}

function pathSum(root: TreeNode | null, targetSum: number): number {
  let res = 0;
  function pSum(node: TreeNode | null, sum: number, path: number[]): any {
    if (!node) return null;
    const newSum = sum + node.val;
    const newPath = [...path, newSum];
    console.log("val", node.val);
    console.log("val path", newPath);
    for (let i = 0; i < newPath.length - 1; i++) {
      if (newSum - newPath[i] === targetSum) {
        res++;
      }
    }
    console.log("res", res);
    pSum(node.left, newSum, newPath);
    pSum(node.right, newSum, newPath);
    return null;
  }
  pSum(root, 0, []);

  return res;
}

// 测试用例:[5,4,8,11,null,13,4,7,2,null,null,5,1]
// 22
// 测试结果:1
// 期望结果:3

console.log(
  pathSum(
    TreeNode.create([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]),
    22
  )
);

//leetcode submit region end(Prohibit modification and deletion)
