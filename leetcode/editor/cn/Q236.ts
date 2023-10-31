//给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
//
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（
//一个节点也可以是它自己的祖先）。”
//
//
//
// 示例 1：
//
//
//输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
//输出：3
//解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
//
//
// 示例 2：
//
//
//输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
//输出：5
//解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
//
//
// 示例 3：
//
//
//输入：root = [1,2], p = 1, q = 2
//输出：1
//
//
//
//
// 提示：
//
//
// 树中节点数目在范围 [2, 10⁵] 内。
// -10⁹ <= Node.val <= 10⁹
// 所有 Node.val 互不相同 。
// p != q
// p 和 q 均存在于给定的二叉树中。
//
//
// Related Topics 树 深度优先搜索 二叉树 👍 2326 👎 0

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

// 递归解法，空间占用过大
function lowestCommonAncestor2(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (root === null) return null;
  let sp: TreeNode[] = [];
  let sq: TreeNode[] = [];
  function findP(node: TreeNode, path: TreeNode[]) {
    if (node === null) return;
    path.push(node);

    if (node.val === p.val) sp = path;

    if (node.val === q.val) sq = path;

    findP(node.left, [...path]);
    findP(node.right, [...path]);
  }
  findP(root, []);
  // console.log(sp.map((p) => p.val));
  // console.log(sq.map((p) => p.val));
  for (let i = 0; i < Math.max(sp.length, sq.length); i++) {
    if (sp[i] !== sq[i]) {
      return sp[i - 1];
    }
  }
}

// 路径迭代算法，空间n2
function lowestCommonAncestor3(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  const stack: TreeNode[] = [root];
  const paths: TreeNode[][] = [[root]];
  let sp: TreeNode[] = [];
  let sq: TreeNode[] = [];
  while (stack.length) {
    const n = stack.pop()!;
    const path = paths.pop()!;
    if (n.val === p.val) sp = path;
    if (n.val === q.val) sq = path;
    if (n.right) {
      stack.push(n.right);
      paths.push([...path, n.right]);
    }
    if (n.left) {
      stack.push(n.left);
      paths.push([...path, n.left]);
    }
  }

  for (let i = 0; i < Math.max(sp.length, sq.length); i++) {
    if (sp[i] !== sq[i]) {
      return sp[i - 1];
    }
  }
}

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (root === null) return null;
  const parent = new Map<TreeNode, TreeNode>();
  function dfs(n: TreeNode) {
    if (n.left) {
      parent.set(n.left, n);
      dfs(n.left);
    }
    if (n.right) {
      parent.set(n.right, n);
      dfs(n.right);
    }
  }
  dfs(root!);
  const ancestors: Set<TreeNode> = new Set();
  while (p) {
    ancestors.add(p);
    p = parent.get(p)!;
  }
  while (!ancestors.has(q!)) {
    q = parent.get(q!)!;
  }
  return q;
}
//leetcode submit region end(Prohibit modification and deletion)
