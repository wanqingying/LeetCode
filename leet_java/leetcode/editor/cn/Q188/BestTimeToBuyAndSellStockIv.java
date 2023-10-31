//给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。 
//
// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。 
//
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。 
//
// 
//
// 示例 1： 
//
// 
//输入：k = 2, prices = [2,4,1]
//输出：2
//解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。 
//
// 示例 2： 
//
// 
//输入：k = 2, prices = [3,2,6,5,0,3]
//输出：7
//解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
//     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 
//。 
//
// 
//
// 提示： 
//
// 
// 1 <= k <= 100 
// 1 <= prices.length <= 1000 
// 0 <= prices[i] <= 1000 
// 
//
// Related Topics 数组 动态规划 👍 1100 👎 0


package leetcode.editor.cn.Q188;


//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public static final int MIN = -10000000;
    //9
    // j%2=0 dp[i][j]= max(dp[i-1][j-1] + prices[i], dp[i-1][j]))
    // j%2=1 dp[i][j]= max(dp[i-1][j-1] - prices[i], dp[i-1][j]))

    //                         [ 3, 1, 5, 0, 0, 3, 2, 5]
    // dp[i][0] 买入0次，卖出0次  [ 0, 0, 0, 0, 0, 0, 0, 0]
    // dp[i][1] 买入1次，卖出0次  [-3,-1,-1, 0, 0, 0, 0, 0]
    // dp[i][2] 买入0次，卖出1次  [ 0,-2, 4, 4, 4, 4, 4, 4]
    // dp[i][3] 买入1次，卖出1次  [ 0, 0,-7, 4, 4, 4, 4, 4]
    // dp[i][4] 买入0次，卖出2次  [ 0, 0, 0,-7, 4, 7, 7, 9]

    //9
    // j%2=0 dp[i][j]= max(dp[i-1][j-1] + prices[i], dp[i-1][j]))
    // j%2=1 dp[i][j]= max(dp[i-1][j-1] - prices[i], dp[i-1][j]))
    //                         [ 5, 4, 3, 0]
    // dp[i][0] 买入0次，卖出0次  [ 0, 0, 0, 0]
    // dp[i][1] 买入1次，卖出0次  [-5,-4,-3, 0]
    // dp[i][2] 买入0次，卖出1次  [ x,-1,-1,-1]
    // dp[i][3] 买入1次，卖出1次  [ x, x,-4,-1]
    // dp[i][4] 买入0次，卖出2次  [ x, x, x,-4]
    public int maxProfit(int k, int[] prices) {
        int px = prices.length;
        int Limit = Math.min(k, px / 2);

        int[] dpBuy = new int[px];
        int[] dpSell = new int[px];
        int maxProfit = 0;
        if (px == 0) return maxProfit;

        for (int round = 0; round < Limit; round++) {
            for (int i = 0; i < px; i++) {
                if (i < (round * 2)) {
                    dpBuy[i] = MIN;
                } else {
                    dpBuy[i] = i == 0 ? -prices[0] : Math.max(dpBuy[i - 1], dpSell[i - 1] - prices[i]);
                    maxProfit = Math.max(maxProfit, dpBuy[i]);
                }

            }
            for (int i = 0; i < px; i++) {
                if (i < round * 2 + 1) {
                    dpSell[i] = MIN;
                } else {
                    dpSell[i] = Math.max(dpSell[i - 1], dpBuy[i - 1] + prices[i]);
                    maxProfit = Math.max(maxProfit, dpSell[i]);
                }
            }
        }

        return maxProfit;
    }
}
//leetcode submit region end(Prohibit modification and deletion)


class QTest {
    public static void main(String[] args) {
        //9
        // j%2=0 dp[i][j]= max(dp[i-1][j-1] + prices[i], dp[i-1][j]))
        // j%2=1 dp[i][j]= max(dp[i-1][j-1] - prices[i], dp[i-1][j]))

        //                         [ 3, 1, 5, 0, 0, 3, 2, 5]
        // dp[i][0] 买入0次，卖出0次  [ 0, 0, 0, 0, 0, 0, 0, 0]
        // dp[i][1] 买入1次，卖出0次  [-3,-1,-1, 0, 0, 0, 0, 0]
        // dp[i][2] 买入0次，卖出1次  [ 0,-2, 4, 4, 4, 4, 4, 4]
        // dp[i][3] 买入1次，卖出1次  [ 0, 0,-7, 4, 4, 4, 4, 4]
        // dp[i][4] 买入0次，卖出2次  [ 0, 0, 0,-7, 4, 7, 7, 9]

        //9
        // j%2=0 dp[i][j]= max(dp[i-1][j-1] + prices[i], dp[i-1][j]))
        // j%2=1 dp[i][j]= max(dp[i-1][j-1] - prices[i], dp[i-1][j]))
        //                         [ 5, 4, 3, 0]
        // dp[i][0] 买入0次，卖出0次  [ 0, 0, 0, 0]
        // dp[i][1] 买入1次，卖出0次  [-5,-4,-3, 0]
        // dp[i][2] 买入0次，卖出1次  [ x,-1,-1,-1]
        // dp[i][3] 买入1次，卖出1次  [ x, x,-4,-1]
        // dp[i][4] 买入0次，卖出2次  [ x, x, x,-4]


    }
}

