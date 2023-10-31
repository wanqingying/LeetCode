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
//输入: prices = [ 1, 2, 3, 0, 2]
// dpw[i] 表示i天持有股票的最大收益  dpw[i] = max(dpw[i-1], dps[i-2] - prices[i])
// dps[i] 表示i天不持有股票的最大收益 dps[i] = max(dps[i-1], dpw[i-1] + prices[i])
//输入: dpw =    [-1,-2,-2, 1,-4]
//输入: dps =    [ 0, 1, 1,-2, 3]

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
// Related Topics 数组 动态规划 👍 1530 👎 0

// dpw[i] 表示i天持有股票的最大收益  dpw[i] = max(dpw[i-1], dps[i-2] - prices[i])
// dps[i] 表示i天不持有股票的最大收益 dps[i] = max(dps[i-1], dpw[i-1] + prices[i])
//leetcode submit region begin(Prohibit modification and deletion)
function maxProfit(prices: number[]): number {
  const dpw = [-prices[0]];
  const dps = [0];
  let max = 0;
  for (let i = 1; i < prices.length; i++) {
    dpw[i] = Math.max(dpw[i - 1], (dps[i - 2] || 0) - prices[i]);
    dps[i] = Math.max(dps[i - 1], dpw[i - 1] + prices[i]);
    max = Math.max(max, dpw[i], dps[i]);
  }
  return max;
}
//leetcode submit region end(Prohibit modification and deletion)
