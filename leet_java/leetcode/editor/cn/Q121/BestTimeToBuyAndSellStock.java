//给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。 
//
// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。 
//
// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。 
//
// 
//
// 示例 1： 
//
// 
//输入：[7,1,5,3,6,4]
//输出：5
//解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
// 
//
// 示例 2： 
//
// 
//输入：prices = [7,6,4,3,1]
//输出：0
//解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
// 
//
// 
//
// 提示： 
//
// 
// 1 <= prices.length <= 10⁵ 
// 0 <= prices[i] <= 10⁴ 
// 
//
// Related Topics 数组 动态规划 👍 3255 👎 0


package leetcode.editor.cn.Q121;

import java.util.Arrays;

//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int maxProfit2(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        // 不持有股票
        int[] dpSell = new int[prices.length];
        dpSell[0] = 0;
        // 持有股票
        int[] dpBuy = new int[prices.length];
        dpBuy[0] = -prices[0];
        for (int i = 1; i < prices.length; i++) {
            dpSell[i] = Math.max(dpSell[i - 1], dpBuy[i - 1] + prices[i]);
            dpBuy[i] = Math.max(dpBuy[i - 1], dpSell[i - 1] - prices[i]);
            maxProfit = Math.max(maxProfit, dpSell[i]);
        }
        // print dp
        System.out.println(Arrays.toString(dpSell));
        System.out.println(Arrays.toString(dpBuy));

        return maxProfit;
    }

    public int maxProfit(int[] prices) {
        int minPrice = prices[0];
        int maxProfit = 0;

        for(int i=1;i<prices.length;i++){
            if(prices[i]<minPrice){
                minPrice = prices[i];
            }else{
                maxProfit = Math.max(maxProfit, prices[i]-minPrice);
            }
        }

        //[ 7, 1, 5, 3, 6, -4, 4 ]
        //[ 7, 1, 1, 1, 1, -4,-4 ]


        return maxProfit;
    }
}
//leetcode submit region end(Prohibit modification and deletion)


class Test {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] prices = {7, 1, 5, 3, 6, 4};
        //              [7,  1,  5,  3, 6, 4]
        //              [0,  0,  4,  4, 7, 7]
        //              [-7, -1, -1, 1, 1, 3]

        System.out.println(solution.maxProfit(prices));
    }
}

