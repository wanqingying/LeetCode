// 有序链表转换二叉搜索树
//给定一个单链表的头节点 head ，其中的元素 按升序排序 ，将其转换为高度平衡的二叉搜索树。
//
// 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差不超过 1。
//
//
//
// 示例 1:
//
//
//
//
//输入: head = [-10,-3,0,5,9]
//输出: [0,-3,9,-10,null,5]
//解释: 一个可能的答案是[0，-3,9，-10,null,5]，它表示所示的高度平衡的二叉搜索树。
//
//
// 示例 2:
//
//
//输入: head = []
//输出: []
//
//
//
//
// 提示:
//
//
// head 中的节点数在[0, 2 * 10⁴] 范围内
// -10⁵ <= Node.val <= 10⁵
//
//
// Related Topics 树 二叉搜索树 链表 分治 二叉树 👍 782 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

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
interface ListNode {
  val: number;
  next: ListNode | null;
}

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function sortedListToBST(head: ListNode | null): TreeNode | null {
  function getMidNode(left: ListNode, right: ListNode): ListNode {
    let slow = left;
    let fast = left;
    while (fast && slow?.next && slow?.next !== right && fast !== right) {
      fast = fast?.next?.next;
      slow = slow?.next;
    }
    return slow;
  }

  function build(range: ListNode[]): TreeNode {
    const [left, right] = range;
    const mid = getMidNode(left, right);
    return {
      val: mid.val,
      left: left === mid ? null : build([left, mid]),
      right: right === mid ? null : build([mid?.next, right]),
    };
  }
  let tail = head;
  while (tail?.next) {
    tail = tail?.next;
  }
  return  build([head, tail]);
}

// function array2List(array: any[]) {
//   let h: any = null;
//   let hi: any = null;
//   for (let i = 0; i < array.length; i++) {
//     const node = { val: array[i], next: null } as any;
//     if (!h) {
//       h = node;
//       hi = node;
//     } else {
//       hi.next = node;
//       hi = node;
//     }
//   }
//   return h;
// }
// sortedListToBST(array2List([-10, -3, 0, 5, 9]));
//leetcode submit region end(Prohibit modification and deletion)
