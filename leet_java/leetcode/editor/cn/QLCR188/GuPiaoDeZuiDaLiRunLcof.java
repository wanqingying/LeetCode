


//数组 prices 记录了某芯片近期的交易价格，其中 prices[i] 表示的 i 天该芯片的价格。你只能选择 某一天 买入芯片，并选择在 未来的某一个不
//同的日子 卖出该芯片。请设计一个算法计算并返回你从这笔交易中能获取的最大利润。 
//
// 如果你不能获取任何利润，返回 0。 
//
// 
//
// 示例 1： 
//
// 
//输入：prices = [3, 6, 2, 9, 8, 5]
//输出：7
//解释：在第 3 天（芯片价格 = 2）买入，在第 4 天（芯片价格 = 9）卖出，最大利润 = 9 - 2 = 7。
// 
//
// 示例 2： 
//
// 
//输入：prices = [8, 12, 15, 7, 3, 10]
//输出：7
//解释：在第 5 天（芯片价格 = 3）买入，在第 6 天（芯片价格 = 10）卖出，最大利润 = 10 - 3 = 7。
// 
//
// 
//
// 提示： 
//
// 
// 0 <= prices.length <= 10^5 
// 0 <= prices[i] <= 10^4 
// 
//
// 
//
// 注意：本题与主站 121 题相同：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-
//stock/ 
//
// 
//
// Related Topics 数组 动态规划 👍 379 👎 0


package leetcode.editor.cn.QLCR188;


//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int bestTiming(int[] prices) {
        if (prices.length == 0) return 0;
        int min = prices[0];
        int max = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] < min) {
                min = prices[i];
            } else {
                max = Math.max(max, prices[i] - min);
            }
        }
        return max;
    }
}
//leetcode submit region end(Prohibit modification and deletion)


class QTest {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] prices = {};
        int i = solution.bestTiming(prices);
        System.out.println(i);
    }
}

