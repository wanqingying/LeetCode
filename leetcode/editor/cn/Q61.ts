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

// declare class ListNode {
//   val: number;
//   next: ListNode | null;
//   constructor(val?: number, next?: ListNode | null);
// }
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
    if (m + nk >= n - 1) {
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

function test() {
  const json = [
    {
      p1: [1, 2, 3, 4, 5],
      p2: 2,
      result: [4, 5, 1, 2, 3],
    },
    {
      p1: [1, 2, 3, 4, 5],
      p2: 3,
      result: [3, 4, 5, 1, 2],
    },
    {
      p1: [1, 2, 3, 4, 5],
      p2: 45,
      result: [1, 2, 3, 4, 5],
    },
  ];

  json.forEach((j, idx) => {
    const res = rotateRight(array2List(j.p1), j.p2);
    if (String(list2Array(res)) !== String(j.result)) {
      console.log(`参数:${JSON.stringify(j.p1)}`);
      console.log(
        `idx:${idx}，期望结果:${JSON.stringify(
          j.result
        )}，测试结果:${JSON.stringify(list2Array(res))}`
      );
    } else {
      console.log(`pass ${idx}`);
    }
  });
}
// test();

// console.log(rotateRight(array2List([3, 5, 6, 7])));
function array2List(array: any[]): any {
  let h: any = null;
  let hi: any = null;
  for (let i = 0; i < array.length; i++) {
    const node = { val: array[i], next: null } as any;
    if (!h) {
      h = node;
      hi = node;
    } else {
      hi.next = node;
      hi = node;
    }
  }
  return h;
}

function list2Array(list: any): any[] {
  const res: any[] = [];
  let h = list;
  while (h) {
    res.push(h.val);
    h = h.next;
  }
  return res;
}
//leetcode submit region end(Prohibit modification and deletion)
