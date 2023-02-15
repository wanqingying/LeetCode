// 合并K个升序链表
//给你一个链表数组，每个链表都已经按升序排列。 
//
// 请你将所有链表合并到一个升序链表中，返回合并后的链表。 
//
// 
//
// 示例 1： 
//
// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
//输出：[1,1,2,3,4,4,5,6]
//解释：链表数组如下：
//[
//  1->4->5,
//  1->3->4,
//  2->6
//]
//将它们合并到一个有序链表中得到。
//1->1->2->3->4->4->5->6
// 
//
// 示例 2： 
//
// 输入：lists = []
//输出：[]
// 
//
// 示例 3： 
//
// 输入：lists = [[]]
//输出：[]
// 
//
// 
//
// 提示： 
//
// 
// k == lists.length 
// 0 <= k <= 10^4 
// 0 <= lists[i].length <= 500 
// -10^4 <= lists[i][j] <= 10^4 
// lists[i] 按 升序 排列 
// lists[i].length 的总和不超过 10^4 
// 
//
// Related Topics 链表 分治 堆（优先队列） 归并排序 👍 2324 👎 0


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

function mergeTwoLists(
    l1: ListNode | null,
    l2: ListNode | null
): ListNode | null {
    if (!l1) {
        return l2;
    }
    if (!l2) {
        return l1;
    }
    let head: ListNode = null as any;
    let tail: ListNode = head;
    while (l1 && l2) {
        let t: ListNode = null as any;
        if (l1.val > l2.val) {
            t = l2;
            l2 = l2.next;
        } else {
            t = l1;
            l1 = l1.next;
        }
        t.next = null;
        if (!head) {
            head = tail = t;
        } else {
            tail.next = t;
            tail = t;
        }
    }
    if (l1) {
        tail.next = l1;
    }
    if (l2) {
        tail.next = l2;
    }
    return head;
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    while (lists.length > 1) {
        lists.push(mergeTwoLists(lists.shift(), lists.shift()));
    }
    return lists.length? lists[0]:null;
}

//runtime:100 ms
//memory:42.9 MB

//leetcode submit region end(Prohibit modification and deletion)
