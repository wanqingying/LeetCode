
//给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
//
// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。 
//
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。 
//
// 
//
// 示例 1: 
//
// 
//输入：prices = [3,3,5,0,0,3,1,4]
//输出：6
//解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
//     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。 
//
// 示例 2： 
//
// 
//输入：prices = [1,2,3,4,5]
//输出：4
//解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   
//     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
//     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
// 
//
// 示例 3： 
//
// 
//输入：prices = [7,6,4,3,1] 
//输出：0 
//解释：在这个情况下, 没有交易完成, 所以最大利润为 0。 
//
// 示例 4： 
//
// 
//输入：prices = [1]
//输出：0
// 
//
// 
//
// 提示： 
//
// 
// 1 <= prices.length <= 10⁵ 
// 0 <= prices[i] <= 10⁵ 
// 
//
// Related Topics 数组 动态规划 👍 1614 👎 0


package leetcode.editor.cn.Q123;


//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public static final int Limit = 2;
    public static final int MIN = -10000000;

    public int maxProfit2(int[] prices) {
        int maxProfit = 0;
        if (prices.length == 0) return maxProfit;
        // prices=          [3,3,5,0,0,3,1,4]
        // left->right min: [3,3,3,0,0,0,0,0]
        // right->left max: [5,5,5,4,4,4,4,4]
        // MaxLR            [0,0,2,2,2,3,3,4]
        // MaxRL            [4,4,4,4,4,3,3,0]

        int minLR = prices[0];
        int[] maxPLR = new int[prices.length];
        maxPLR[0] = 0;
        int maxRL = prices[prices.length - 1];
        int[] maxPRL = new int[prices.length];
        maxPRL[prices.length - 1] = 0;
        for (int i = 1; i < prices.length; i++) {
            minLR = Math.min(minLR, prices[i]);
            maxPLR[i] = Math.max(maxPLR[i - 1], prices[i] - minLR);
            int j = prices.length - 1 - i;
            maxRL = Math.max(maxRL, prices[j]);
            maxPRL[j] = Math.max(maxPRL[j + 1], maxRL - prices[j]);
        }

        for (int i = 0; i < prices.length; i++) {
            maxProfit = Math.max(maxProfit, maxPLR[i] + maxPRL[i]);
        }

        return maxProfit;
    }

    public int maxProfit(int[] prices) {
        //9
        // j%2=0 dp[i][j]= max(dp[i-1][j-1] + prices[i], dp[i-1][j]))
        // j%2=1 dp[i][j]= max(dp[i-1][j-1] - prices[i], dp[i-1][j]))
        //                         [ 3, 1, 5, 0, 0, 3, 2, 5]
        // dp[i][0] 买入0次，卖出0次  [ 0, 0, 0, 0, 0, 0, 0, 0]
        // dp[i][1] 买入1次，卖出0次  [-3,-1,-1, 0, 0, 0, 0, 0]
        // dp[i][2] 买入0次，卖出1次  [ 0,-2, 4, 4, 4, 4, 4, 4]
        // dp[i][3] 买入1次，卖出1次  [ 0, 0,-7, 4, 4, 4, 4, 4]
        // dp[i][4] 买入0次，卖出2次  [ 0, 0, 0,-7, 4, 7, 7, 9]
        int px = prices.length;
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
                    dpSell[i] = i == 0 ? 0 : Math.max(dpSell[i - 1], dpBuy[i - 1] + prices[i]);
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
        Solution solution = new Solution();
        int res = solution.maxProfit(new int[]{3, 1, 5, 0, 0, 3, 2, 5});
        // 6
        System.out.println(res);


    }
}

