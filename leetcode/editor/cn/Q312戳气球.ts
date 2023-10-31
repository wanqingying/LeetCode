//有 n 个气球，编号为0 到 n - 1，每个气球上都标有一个数字，这些数字存在数组 nums 中。
//
// 现在要求你戳破所有的气球。戳破第 i 个气球，你可以获得 nums[i - 1] * nums[i] * nums[i + 1] 枚硬币。 这里的 i -
// 1 和 i + 1 代表和 i 相邻的两个气球的序号。如果 i - 1或 i + 1 超出了数组的边界，那么就当它是一个数字为 1 的气球。
//
// 求所能获得硬币的最大数量。
//
//
//示例 1：
//
//
//输入：nums = [3,1,5,8]
//输出：167
//解释：
//nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
//coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
//
// 输入：nums = [3,1,5,8,2]
//输出：167
//解释：
//nums = [9,1,2,8,2,9,1,9] --> [3,5,8] --> [3,8] --> [8] --> []
//coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
//
// 示例 2：
//
//
//输入：nums = [1,5]
//输出：10
//

// [9,1,2,8]
//  9*1*2+9*2*8+9*8*1+1*9*1=18+144+72+9=243
//    Math.max(9+1,9+9)=18
//      9+Math.max(9*1*2+9*2*1,1*2*1+9*1*1)=45
//        18+Math.max(1*2*8+1*8*1,2*8*1+1*2*1)=24+18=42
//
//[1,2,3]
// 1*2*3+1*3*1+2*1*1=6+3+2=11
//
// [1,1,4,3]
// 1*2*3+1*3*1+2*1*1=6+3+2=11
//
// 提示：
//
//
// n == nums.length
// 1 <= n <= 300
// 0 <= nums[i] <= 100
//
//
// Related Topics 数组 动态规划 👍 1250 👎 0

//leetcode submit region begin(Prohibit modification and deletion)

// 记忆化搜索
function maxCoins2(nums: number[]): number {
  const cons = [1, ...nums, 1];
  const map = new Array(cons.length)
    .fill(0)
    .map(() => new Array(cons.length).fill(0));
  function solve(i: number, j: number) {
    if (map[i][j]) return map[i][j];
    if (i + 1 >= j) return 0;
    let result = 0;
    for (let k = i + 1; k < j; k++) {
      result = Math.max(
        result,
        cons[i] * cons[k] * cons[j] + solve(i, k) + solve(k, j)
      );
    }
    map[i][j] = result;
    return result;
  }
  return solve(0, cons.length - 1);
}

// 记忆化搜索 + 动态规划
function maxCoins(nums: number[]): number {
  const cons = [1, ...nums, 1];
  const map = new Array(cons.length)
    .fill(0)
    .map(() => new Array(cons.length).fill(0));
  for (let i = cons.length - 1; i >= 0; i--) {
    map[i][i] = 0;
    for (let j = i + 1; j < cons.length; j++) {
      map[i][j] = 0;
      for (let k = i + 1; k < j; k++) {
        map[i][j] = Math.max(
          map[i][j],
          cons[i] * cons[k] * cons[j] + map[i][k] + map[k][j]
        );
      }
    }
  }

  return map[0][cons.length - 1];
}

//leetcode submit region end(Prohibit modification and deletion)
