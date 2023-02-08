// 只出现一次的数字 II
//给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
//
// 你必须设计并实现线性时间复杂度的算法且不使用额外空间来解决此问题。
//
//
//
// 示例 1：
//
//
//输入：nums = [2,2,3,2]
//输出：3
//
//
// 示例 2：
//
//
//输入：nums = [0,1,0,1,0,1,99]
//输出：99
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 3 * 10⁴
// -2³¹ <= nums[i] <= 2³¹ - 1
// nums 中，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次
//
//
// Related Topics 位运算 数组 👍 957 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function singleNumber(nums: number[]): number {
  let a = 0,
    b = 0;
  for (const num of nums) {
    const aNext = (~a & b & num) | (a & ~b & ~num),
      bNext = ~a & (b ^ num);
    a = aNext;
    b = bNext;
  }
  return b;
}
//leetcode submit region end(Prohibit modification and deletion)
// [2,4,2,3,2,4,4]
// const nums = [-2, -2, 1, 1, 4, 1, 4, 4, -4, -2];
// for (let i = 0; i < nums.length; i++) {
//   // console.log("ni", (nums[j] >> i) & 1);
// }
//
// console.log(singleNumber(nums));

// console.log(
//   r.reduce((rx, t) => {
//     return rx ^ t;
//   }, 0)
// );
//
// console.log(2 ^ 3 ^ 4);
// console.log(3 ^ 4 ^ 3);
