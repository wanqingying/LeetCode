//序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方
//式重构得到原数据。
//
// 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串
//反序列化为原始的树结构。
//
// 提示: 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的
//方法解决这个问题。
//
//
//
// 示例 1：
//
//
//输入：root = [1,2,3,null,null,4,5]
//输出：[1,2,3,null,null,4,5]
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
// 示例 4：
//
//
//输入：root = [1,2]
//输出：[1,2]
//
//
//
//
// 提示：
//
//
// 树中结点数在范围 [0, 10⁴] 内
// -1000 <= Node.val <= 1000
//
//
// Related Topics 树 深度优先搜索 广度优先搜索 设计 字符串 二叉树 👍 1121 👎 0

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
  left: TreeNode | undefined;
  right: TreeNode | undefined;
  // constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null)
}
/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  let midStr = "";
  const queue = [root];
  while (queue.length) {
    const node = queue.pop();
    if (node) {
      midStr = midStr + node.val + ",";
      queue.push(node.right);
      queue.push(node.left);
    } else {
      midStr = midStr + "null" + ",";
    }
  }

  return `[${midStr.slice(0, -1)}]`;
}

/*
 * Decodes your encoded data to tree.
 */

interface Dp {
  iRoot: number;
  midRange: [number, number];
  preRange: [number, number];
}

function deserialize(data: string): TreeNode | null {
  const arr: (number | null)[] = JSON.parse(data);
  function build(i: number): any[] {
    if (arr[i] === null) return [null, i + 1];
    const root: TreeNode = { val: arr[i], left: null, right: null };
    const [left, leftI] = build(i + 1);
    const [right, rightI] = build(leftI);
    root.left = left;
    root.right = right;
    return [root, rightI];
  }

  return build(0)[0];
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
//leetcode submit region end(Prohibit modification and deletion)

// const ps = serialize({
//   val: 1,
//   left: {
//     val: 2,
//     left: null,
//     right: null,
//   },
//   right: {
//     val: 3,
//     right: {
//       val: 5,
//       left: null,
//       right: null,
//     },
//     left: {
//       val: 7,
//       left: null,
//       right: null,
//     },
//   },
// });
// console.log("ps", ps);
// console.log(JSON.parse(ps));
// const t = deserialize(ps);
// console.log("t", t);

// [1,2,null,null,3,4,n,n,5,n,n]
