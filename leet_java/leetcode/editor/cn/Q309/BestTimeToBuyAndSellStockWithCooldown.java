//给定一个整数数组
// prices，其中第 prices[i] 表示第 i 天的股票价格 。 
//
// 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）: 
//
// 
// 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。 
// 
//
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。 
//
// 
//
// 示例 1: 
//
// 
//输入: prices = [1,2,3,0,2]
//输出: 3 
//解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出] 
//
// 示例 2: 
//
// 
//输入: prices = [1]
//输出: 0
// 
//
// 
//
// 提示： 
//
// 
// 1 <= prices.length <= 5000 
// 0 <= prices[i] <= 1000 
// 
//
// Related Topics 数组 动态规划 👍 1655 👎 0


package leetcode.editor.cn.Q309;

//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public static final int FREEZE = 1;

    public int maxProfit(int[] prices) {
        int maxProfit = 0;
        // 不持有股票
        int[] dpHasNot = new int[prices.length];
        dpHasNot[0] = 0;
        // 持有股票
        int[] dpHasStock = new int[prices.length];
        dpHasStock[0] = -prices[0];
        for (int i = 1; i < prices.length; i++) {
            dpHasNot[i] = Math.max(dpHasNot[i - 1], dpHasStock[i - 1] + prices[i]);
            dpHasStock[i] = Math.max(dpHasStock[i - 1], i == 1 ? -prices[1] : dpHasNot[i - 2] - prices[i]);
            maxProfit = Math.max(maxProfit, dpHasNot[i]);
        }
        return maxProfit;
    }
}
//leetcode submit region end(Prohibit modification and deletion)


class QTest {
    public static void main(String[] args) {
        Solution solution = new Solution();

    }
}

