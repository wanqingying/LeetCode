// 接雨水
//给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
//
//
//
// 示例 1：
//
//
//
//
//输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
//输出：6
//解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
//
//
// 示例 2：
//
//
//输入：height = [4,2,0,3,2,5]
//输出：9
//
//
//
//
// 提示：
//
//
// n == height.length
// 1 <= n <= 2 * 10⁴
// 0 <= height[i] <= 10⁵
//
//
// Related Topics 栈 数组 双指针 动态规划 单调栈 👍 4101 👎 0

//输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
//输入：height = [0,1,1,2,2,2,2,3,3,3,3,3]
//输入：height = [3,3,3,3,3,3,3,3,2,2,2,1]

//leetcode submit region begin(Prohibit modification and deletion)
function trap(height: number[]): number {
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < height.length; i++) {
    left.push(Math.max(left[left.length - 1] ?? 0, height[i]));
    const j = height.length - 1 - i;
    right.unshift(Math.max(right[0] ?? 0, height[j]));
  }
  for (let i = 0; i < height.length; i++) {}
  return height.reduce((res, hi, i) => {
    return res + (Math.min(left[i], right[i]) - hi);
  }, 0);
}
// const b = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
// const b = trap([4,2,0,3,2,5]);
// console.log(b);
//leetcode submit region end(Prohibit modification and deletion)
