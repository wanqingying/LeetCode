// 分隔链表
//给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
//
// 你应当 保留 两个分区中每个节点的初始相对位置。
//
//
//
// 示例 1：
//
//
//输入：head = [1,4,3,2,5,2], x = 3
//输出：[1,2,2,4,3,5]
//
//
// 示例 2：
//
//
//输入：head = [2,1], x = 2
//输出：[1,2]
//
//
//
//
// 提示：
//
//
// 链表中节点的数目在范围 [0, 200] 内
// -100 <= Node.val <= 100
// -200 <= x <= 200
//
// Related Topics 链表 双指针 👍 611 👎 0

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

function array2List(array: any[]) {
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

function list2Array(list: any) {
  const res: any[] = [];
  let h = list;
  while (h) {
    res.push(h.val);
    h = h.next;
  }
  return res;
}

function partition(head: ListNode | null, x: number): ListNode | null {
  let left: ListNode | null = null;
  let right: ListNode | null = null;

  let res: ListNode = null;
  let current: ListNode = head;
  let prev: ListNode = null;

  while (current) {
    if (current.val < x) {
      if (!left) {
        left = current;
        res = current;
      }
    } else {
      if (!right) {
        right = current;
      }
    }
    current = current.next;
  }
  current = head;
  if (!left || !right) {
    return head;
  }

  function remove(node: ListNode | null) {
    // 移除下一个节点
    const removeNode = node?.next;
    const next = removeNode?.next;
    if (removeNode) {
      removeNode.next = null;
    }
    if (node) {
      node.next = next;
    }
    return removeNode;
  }
  function append(tail: ListNode | null, node: ListNode) {
    // const next = tail?.next;
    if (tail) {
      tail.next = node;
    }
    if (node) {
      // node.next = next;
    }
  }

  while (current) {
    let next = current.next;
    if (current.val < x) {
      // 小于
      if (!left) {
        left = current;
        res = current;

        // prev = current;
        current.next = null;
        remove(prev);
      } else if (right) {
        remove(prev);
        append(left, current);
        left = current;
        // prev = current;
      }
    } else {
      // 大于等于
      if (!right) {
        right = current;
      }
      prev = current;
    }
    current = next;
  }
  append(left, right);

  return res || right;
}
// function test() {
//   const json = [
//     {
//       p1: [1, 4, 3, 2, 5, 2],
//       p2: 3,
//       result: [1, 2, 2, 4, 3, 5],
//     },
//     {
//       p1: [1, 4, 3, 2, 5, 2, 3, 2, 1, 2, 4, 5, 6],
//       p2: 4,
//       result: [1, 3, 2, 2, 3, 2, 1, 2, 4, 5, 4, 5, 6],
//     },
//     { p1: [2], p2: 2, result: [2] },
//     { p1: [2], p2: 0, result: [2] },
//     { p1: [1, 2], p2: 3, result: [1, 2] },
//     { p1: [1, 4, 2], p2: 3, result: [1, 2, 4] },
//   ];
//
//   json.forEach((j, idx) => {
//     let res: any = partition(array2List(j.p1), j.p2);
//     res = list2Array(res);
//     if (String(res) !== String(j.result)) {
//       console.log(`参数:${JSON.stringify(j.p1)}`);
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

//leetcode submit region end(Prohibit modification and deletion)
