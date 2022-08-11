// 最接近的三数之和
//给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
//
// 返回这三个数的和。
//
// 假定每组输入只存在恰好一个解。
//
//
//
// 示例 1：
//
//
//输入：nums = [-1,2,1,-4], target = 1
//输出：2
//解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
//
//
// 示例 2：
//
//
//输入：nums = [0,0,0], target = 1
//输出：0
//
//
//
//
// 提示：
//
//
// 3 <= nums.length <= 1000
// -1000 <= nums[i] <= 1000
// -10⁴ <= target <= 10⁴
//
// Related Topics 数组 双指针 排序 👍 1190 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function threeSumClosest(nums: number[], target: number): number {
  let result = Number.MAX_SAFE_INTEGER;
  let dt = Number.MAX_SAFE_INTEGER;
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    let left = 0;
    let right = nums.length - 1;
    let sums: number[] = [];
    while (left < right) {
      if (left === i) {
        left++;
        continue;
      }
      if (right === i) {
        right--;
        continue;
      }
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === target) {
        return sum;
      }
      sums.push(sum);
      if (sum < target) {
        left++;
        continue;
      }
      if (sum > target) {
        right--;
        continue;
      }
    }
    sums.forEach((s) => {
      if (Math.abs(s - target) < dt) {
        dt = Math.abs(s - target);
        result = s;
      }
    });
  }
  return result;
}
// console.log(threeSumClosest([0, 1, 2, -1, 1, 0, 2], 2));

const caseList = [
  [2, 3, 0, 1, 2],
  [66, 0, 0, 0, 0],
  [8, 8, 3, 3, 3, 2, 1, 0, 1, 3, 4, 2, 1],
  [66, 10, 3, 3, 3, 2, 1, 0, 1, 3, 4, 2, 1],
  [27, 27, 1, 4, 7, 9, 22, 44, 15],
  [88, 88, 1, 4, 7, 9, 22, 44, 15, 57, 26],
  [83, 83, 1, 4, 7, 9, 22, 44, 15, 57, 26],
  [66, 67, 4, 9, 25, 38, 49],
  [789, 791, 9, 25, 38, 49, 146, 267, 344, 422, 543],
  [1, 2, -1, 2, 1, -4],
  [-333, -295, 4, 9, 25, 38, 49, 146, 267, 344, 422, 543, -112, -5, -178],
];
function test() {
  caseList.forEach(([sum, result, ...nums], idx) => {
    const r = threeSumClosest(nums, sum);
    if (r !== result) {
      console.log("err idx:", idx);
      console.log(`期望结果:${result},测试结果:${r}`);
    }
  });
}
// test();

// console.log(Math.abs(-3));
/**
 * x+y=sum
 * [1,2,3,4,5,6,7,8,10]
 * s+e<sum s++
 * s+e>sum e--
 *
 * dleft=s+k1
 * dright=s-k2
 * [27, 27, 1, 4, 7, 9, 22, 44, 15]
 * [1,4,7,9,15,22,44] 27
 *[-1, 2, 1, -4]
 * [-4,-1,1,2]
 *  0   1   2   3   4    5    6    7    8
 * [9, 25, 38, 49, 146, 267, 344, 422, 543]
 */
//leetcode submit region end(Prohibit modification and deletion)
