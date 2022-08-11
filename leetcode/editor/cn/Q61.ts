// 旋转链表
//给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
//
//
//
// 示例 1：
//
//
//输入：head = [1,2,3,4,5], k = 2
//输出：[4,5,1,2,3]
//
//
// 示例 2：
//
//
//输入：head = [0,1,2], k = 4
//输出：[2,0,1]
//
//
//
//
// 提示：
//
//
// 链表中节点的数目在范围 [0, 500] 内
// -100 <= Node.val <= 100
// 0 <= k <= 2 * 10⁹
//
// Related Topics 链表 双指针 👍 812 👎 0

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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  //输入：head = [1,2,3,4,5], k = 2
  //输出：[4,5,1,2,3]
  //
  //
  // 示例 2：
  //
  //
  //输入：head = [0,1,2], k = 4
  //输出：[2,0,1]
  let n = 0;
  let ha = head;
  let tail = head;
  while (ha) {
    n++;
    tail = ha;
    ha = ha.next;
  }
  const nk = k >= n ? k % n : k;
  let m = 0;
  let hb = head;

  while (hb && nk > 0) {
    if (m + nk > n) {
      let h = hb.next;
      hb.next = null;
      tail.next = head;
      return h;
    }
    m++;
    hb = hb.next;
  }
  return head;
}
console.log(rotateRight(null))
//leetcode submit region end(Prohibit modification and deletion)
