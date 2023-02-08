// 反转链表 II
//给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链
//表节点，返回 反转后的链表 。
//
//
//
// 示例 1：
//
//
//输入：head = [1,2,3,4,5], left = 2, right = 4
//输出：[1,4,3,2,5]
//
//
// 示例 2：
//
//
//输入：head = [5], left = 1, right = 1
//输出：[5]
//
//
//
//
// 提示：
//
//
// 链表中节点数目为 n
// 1 <= n <= 500
// -500 <= Node.val <= 500
// 1 <= left <= right <= n
//
//
//
//
// 进阶： 你可以使用一趟扫描完成反转吗？
//
// Related Topics 链表 👍 1420 👎 0

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

function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  if (left === right) {
    return head;
  }
  let nodeL = null;
  let nodeR = null;
  let nodeT = null;
  let current = head;
  let idx = 0;
  let prev: ListNode = null;
  let result = null;
  while (current) {
    idx++;
    const next = current.next;

    if (idx === left - 1) {
      result = head;
      nodeT = current;
      current.next = null;
    }
    if (idx === left) {
      nodeL = current;
      prev = current;
      prev.next = null;
    }
    if (left < idx && idx <= right) {
      current.next = prev;
    }
    if (idx === right) {
      nodeR = current;
    }
    if (idx === right + 1) {
      break;
    }
    prev = current;
    current = next;
  }
  if (nodeT) {
    nodeT.next = nodeR;
  } else {
    result = nodeR;
  }
  nodeL.next = current;

  return result;
}

// declare class ListNode {
//   val: number;
//   next: ListNode | null;
//   constructor(val?: number, next?: ListNode | null)
// }
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
//
// function list2Array(list: any) {
//   const res: any[] = [];
//   let h = list;
//   while (h) {
//     res.push(h.val);
//     h = h.next;
//   }
//   return res;
// }
// const n = reverseBetween(array2List([1, 2, 3, 4, 5]), 2, 4);
// console.log('res',list2Array(n))
//leetcode submit region end(Prohibit modification and deletion)
