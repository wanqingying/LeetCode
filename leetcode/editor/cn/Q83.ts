// 删除排序链表中的重复元素
//给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。
//
//
//
// 示例 1：
//
//
//输入：head = [1,1,2]
//输出：[1,2]
//
//
// 示例 2：
//
//
//输入：head = [1,1,2,3,3]
//输出：[1,2,3]
//
//
//
//
// 提示：
//
//
// 链表中节点数目在范围 [0, 300] 内
// -100 <= Node.val <= 100
// 题目数据保证链表已经按升序 排列
//
// Related Topics 链表 👍 838 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
// declare class ListNode {
//   val: number;
//   next: ListNode | null;
//   constructor(val?: number, next?: ListNode | null);
// }

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let tail: ListNode = head;
  let hd: ListNode = head;
  function remove(pn: ListNode) {
    const v = pn?.val;
    const isHead = pn === hd;
    while (pn?.next?.val === v) {
      pn = pn.next;
    }
    if (isHead) {
      hd = pn;
      tail = pn;
    } else {
      tail.next = pn;
    }
  }

  let h = tail;
  while (h?.next) {
    if (h?.val === h.next.val) {
      remove(h);
      h = tail;
    } else {
      tail = h;
      h = h.next;
    }
  }

  return hd;
}

// function test() {
//   const json: any[] = [
//     {
//       p1: [1, 2, 3, 3, 4, 4, 5],
//       result: [1, 2, 3, 4, 5],
//     },
//     {
//       p1: [1, 7, 7, 8, 8, 8, 8, 9],
//       result: [1, 7, 8, 9],
//     },
//     {
//       p1: [1, 1],
//       result: [1],
//     },
//     {
//       p1: [2],
//       result: [2],
//     },
//     {
//       p1: [1, 1, 1, 2, 2],
//       result: [1, 2],
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     let res: any = deleteDuplicates(array2List(j.p1));
//     res = list2Array(res);
//     if (String(res) !== String(j.result)) {
//       console.log(
//         `idx:${idx}，期望结果:${JSON.stringify(
//           j.result
//         )}，测试结果:${JSON.stringify(res)}`
//       );
//     } else {
//       console.log(`pass ${idx}`);
//     }
//   });
// }
// test();
//
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

//leetcode submit region end(Prohibit modification and deletion)
