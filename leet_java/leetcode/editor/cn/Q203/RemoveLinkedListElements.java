//给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。
//
// 
//
// 示例 1： 
// 
// 
//输入：head = [1,2,6,3,4,5,6], val = 6
//输出：[1,2,3,4,5]
// 
//
// 示例 2： 
//
// 
//输入：head = [], val = 1
//输出：[]
// 
//
// 示例 3： 
//
// 
//输入：head = [7,7,7,7], val = 7
//输出：[]
// 
//
// 
//
// 提示： 
//
// 
// 列表中的节点数目在范围 [0, 10⁴] 内 
// 1 <= Node.val <= 50 
// 0 <= val <= 50 
// 
//
// Related Topics 递归 链表 👍 1348 👎 0


package leetcode.editor.cn.Q203;

import leetcode.editor.cn.base.ListNode;

//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        ListNode newHead = head;
        if (newHead == null) return null;

        while (newHead != null && newHead.val == val) {
            newHead = newHead.next;
        }
        ListNode ptr = newHead;
        while (ptr != null && ptr.next != null) {
            ListNode next = ptr.next;
            if (next.val == val) {
                ptr.next = next.next;
//                ptr = next.next;
            } else {
                ptr = ptr.next;
            }

        }

        return newHead;
    }
}
//leetcode submit region end(Prohibit modification and deletion)


class QTest {
    public static void main(String[] args) {
        Solution solution = new Solution();

    }
}

