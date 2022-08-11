// K 个一组翻转链表
//给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
//
// k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
//
// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
//
//
//
// 示例 1：
//
//
//输入：head = [1,2,3,4,5], k = 2
//输出：[2,1,4,3,5]
//
//
// 示例 2：
//
//
//
//
//输入：head = [1,2,3,4,5], k = 3
//输出：[3,2,1,4,5]
//
//
//
//提示：
//
//
// 链表中的节点数目为 n
// 1 <= k <= n <= 5000
// 0 <= Node.val <= 1000
//
//
//
//
// 进阶：你可以设计一个只用 O(1) 额外内存空间的算法解决此问题吗？
//
//
//
// Related Topics 递归 链表 👍 1728 👎 0

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
 *
 * p1 p2 p3 p4
 * p4 p3 p2 p1
 *
 *
 *
 */

// 1-2-3-4-5-6-7
// h-t p n
// 2-1 3-4-5-6-7

/**
 * h     t n
 * 1-2-3-4-5-6-7-8-9
 * t     h n
 * 4-3-2-1-5-6-7-8-9
 *
 */
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  function tail(h: ListNode) {
    let t = h;
    let i = 1;
    while (t && t.next && i < k) {
      t = t.next;
      i++;
    }
    return i === k ? t : null;
  }
  let result: ListNode = null;
  let p = head;
  let h = head;
  let t = null;
  let tai = null;
  let i = 0;
  let m = 0;
  while (p) {
    const n = p.next;
    if (!t) {
      t = h;
      h.next = null;
    } else {
      p.next = h;
    }
    h = p;
    p = n;
    i++;
    m++;
    if (i >= k) {
      // reset
      if (!result) {
        result = h;
      }
      if (!tail(p)) {
        console.log("tail", p?.val);
        t.next = n;
        if (tai) {
          tai.next = h;
        }
        return result;
      }

      if (tai) {
        tai.next = h;
      }
      i = 0;
      p = n;
      h = n;
      tai = t;
      t = null;
    }
  }
  if (m < k) {
    result = h;
  }
  if (i < k) {
    if (!result) {
      result = h;
    }

    if (tai) {
      tai.next = h;
    }
    i = 0;
    tai = t;
    t = null;
  }

  return result;
}

// 1-2-3-4-5-6-7
function reverseList(head: ListNode | null, len: number): any[] {
  let ptr = null;
  let h = head;
  let k = 1;
  while (h && k < len) {
    let n = h.next;
    if (!ptr) {
      ptr = h;
      h.next = null;
    } else {
      h.next = ptr;
    }
    k++;
    ptr = h;
    h = n;
  }
  return [ptr || head, head];
}
//leetcode submit region end(Prohibit modification and deletion)
