// 最大间距
//给定一个无序的数组 nums，返回 数组在排序之后，相邻元素之间最大的差值 。如果数组元素个数小于 2，则返回 0 。
//
// 您必须编写一个在「线性时间」内运行并使用「线性额外空间」的算法。
//
//
//
// 示例 1:
//
//
//输入: nums = [3,6,9,1]
//输出: 3
//解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
//
// 示例 2:
//
//
//输入: nums = [10]
//输出: 0
//解释: 数组元素个数小于 2，因此返回 0。
//
//
//
// 提示:
//
//
// 1 <= nums.length <= 10⁵
// 0 <= nums[i] <= 10⁹
//
//
// Related Topics 数组 桶排序 基数排序 排序 👍 548 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function maximumGap(nums: number[]): number {
  let list: number[] = Array.from(nums);
  let max = nums[0];
  for (let i = 0; i < 10; i++) {
    let rNext: number[][] = new Array(10).fill(1).map((r) => []);
    for (let j = 0; j < list.length; j++) {
      const p = list[j] % Math.pow(10, i + 1);
      const pi = Math.floor(p / Math.pow(10, i));
      rNext[pi].push(list[j]);
      if (max < nums[j]) max = nums[j];
    }
    list = [];
    rNext.forEach((rn) => rn.forEach((p) => list.push(p)));
    if (Math.pow(10, i) > max) break;
  }
  let result = 0;
  for (let i = 1; i < list.length; i++) {
    result = Math.max(Math.abs(list[i] - list[i - 1]), result);
  }
  return result;
}

// console.log(maximumGap([3, 6, 9, 1, 2]));
// console.log(maximumGap([3, 7, 9, 1, 2]));
// console.log(maximumGap([1, 3, 100]));
// 2901
// console.log(
//   maximumGap([
//     15252, 16764, 27963, 7817, 26155, 20757, 3478, 22602, 20404, 6739, 16790,
//     10588, 16521, 6644, 20880, 15632, 27078, 25463, 20124, 15728, 30042, 16604,
//     17223, 4388, 23646, 32683, 23688, 12439, 30630, 3895, 7926, 22101, 32406,
//     21540, 31799, 3768, 26679, 21799, 23740,
//   ])
// );
// console.log(3444 % Math.pow(10, 2));
// console.log(3444 % Math.pow(10, 1));
//leetcode submit region end(Prohibit modification and deletion)
