//给你两个整数 left 和 right ，表示区间 [left, right] ，返回此区间内所有数字 按位与 的结果（包含 left 、right 端点）
//。 
//
// 
//
// 示例 1： 
//
// 
//输入：left = 5, right = 7
// 0b101 0b110 0b111
// 0b100
//输出：4
// 
//
// 示例 2： 
//
// 
//输入：left = 0, right = 0
//输出：0
// 
//
// 示例 3： 
//
// 
//输入：left = 1, right = 2147483647
//输出：0
// 
//
// 
//
// 提示： 
//
// 
// 0 <= left <= right <= 2³¹ - 1 
// 
//
// Related Topics 位运算 👍 483 👎 0

//输入：left = 4, right = 7
// 0b100 0b101 0b110 0b111
// 0b100
//输出：4

//输入：left = 19, right = 21
// 0b10011 0b10100 0b10101
// 0b10000
//输出：16

//输入：left = 1055, right = 1066
// 0b10000011111 0b10000100000 0b10000100001 0b10000100010 0b10000100011 0b10000100100 0b10000100101 0b10000100110 0b10000100111 0b10000101000 0b10000101001 0b10000101010
// 0b10000
//输出：1024

// 0b000100
// 0b000101
// 0b000110
// 0b000111
// 0b001000
// 0b001001

//输入：left = 3, right = 9
// 0b11 0b100 0b101 0b110 0b111 0b1000 0b1001
// 0b00000
//输出：0

package leetcode.editor.cn.Q201;

//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        while (left < right) {
            right = right & (right - 1);
        }
        return right;
    }
}
//leetcode submit region end(Prohibit modification and deletion)


class QTest {
    public static void main(String[] args) {
        Solution solution = new Solution();

    }
}

