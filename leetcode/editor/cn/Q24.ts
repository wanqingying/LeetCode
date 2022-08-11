// 两两交换链表中的节点
//给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
//
//
//
// 示例 1：
//
//
//输入：head = [1,2,3,4]
//输出：[2,1,4,3]
//
//
// 示例 2：
//
//
//输入：head = []
//输出：[]
//
//
// 示例 3：
//
//
//输入：head = [1]
//输出：[1]
//
//
//
//
// 提示：
//
//
// 链表中节点的数目在范围 [0, 100] 内
// 0 <= Node.val <= 100
//
// Related Topics 递归 链表 👍 1496 👎 0

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

// declare interface ListNode {
//     val: number;
//     next?: ListNode;
//     // prev?: ListNode;
// }
/**
 *
 *
 * x1-h1-h2-x2
 * x1-h2-h1-x2
 *
 *
 */
function swapPairs(head: ListNode | null): ListNode | null {
  let result: ListNode = { next: head, val: null };
  let rh = result;
  while (rh && rh?.next) {
    let x1 = rh;
    let h1 = rh?.next;
    let h2 = h1?.next;
    let x2 = h2?.next;
    if (h2) {
      x1.next = h2 || null;
      h2.next = h1 || null;
    }
    if (h1) {
      h1.next = x2 || null;
    }
    rh = h1;
  }

  return result.next;
}
// swapPairs({ val: 1, next: null });

// logList(swapPairs(toList([1,2,3,4,5])))
//
// function logList(n: ListNode) {
//   let r = [];
//   while (n) {
//     r.push(n.val);
//     n = n.next;
//   }
//   console.log(r);
// }
//
// function toList(arr: number[]) {
//   let h: ListNode = { next: null, val: null };
//   let r = h;
//   while (arr.length) {
//     r.next = { next: null, val: arr.shift() };
//     r = r.next;
//   }
//   return h.next;
// }
//leetcode submit region end(Prohibit modification and deletion)
