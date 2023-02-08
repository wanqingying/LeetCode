// 搜索旋转排序数组 II
//已知存在一个按非降序排列的整数数组 nums ，数组中的值不必互不相同。
//
// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转 ，使数组变为 [nums[k],
//nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,
//2,4,4,4,5,6,6,7] 在下标 5 处经旋转后可能变为 [4,5,6,6,7,0,1,2,4,4] 。
//
// 给你 旋转后 的数组 nums 和一个整数 target ，请你编写一个函数来判断给定的目标值是否存在于数组中。如果 nums 中存在这个目标值
//target ，则返回 true ，否则返回 false 。
//
// 你必须尽可能减少整个操作步骤。
//
//
//
// 示例 1：
//
//
//输入：nums = [2,5,6,0,0,1,2], target = 0
//输出：true
//
//
// 示例 2：
//
//
//输入：nums = [2,5,6,0,0,1,2], target = 3
//输出：false
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 5000
// -10⁴ <= nums[i] <= 10⁴
// 题目数据保证 nums 在预先未知的某个下标上进行了旋转
// -10⁴ <= target <= 10⁴
//
//
//
//
// 进阶：
//
//
// 这是 搜索旋转排序数组 的延伸题目，本题中的 nums 可能包含重复元素。
// 这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？
//
//
//
// Related Topics 数组 二分查找 👍 638 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function twoSearch(arr: any[], compare: (t: any) => number) {
  let left = 0;
  let right = arr.length - 1;
  while (right - left > 5) {
    const mid = Math.floor((right - left) / 2) + left;
    const r = compare(arr[mid]);
    if (r > 0) {
      right = mid;
      continue;
    }
    if (r === 0) {
      return mid;
    }
    left = mid;
  }
  for (let i = left; i <= right; i++) {
    const r = compare(arr[i]);
    if (r === 0) {
      return i;
    }
    if (r > 0) {
      return i - 1;
    }
  }
  return right;
}
function search(nums: number[], target: number): boolean {
  // let si = 0;
  // for (let i = 1; i < nums.length; i++) {
  //   if (nums[i] < nums[i - 1]) {
  //     si = i;
  //     break;
  //   }
  // }
  const si = nums.findIndex((value, index) => value < nums[index - 1]);
  let left = 0;
  let right = nums.length - 1;
  let mt = 1;
  if (si !== -1) {
    if (nums[0] > target) {
      left = si;
    } else {
      right = Math.max(0, si - 1);
      // mt = -1;
    }
  }
  function compare(t: number) {
    return (t - target) * mt;
  }

  while (right - left > 5) {
    const mid = Math.floor((right - left) / 2) + left;
    const r = compare(nums[mid]);
    if (r > 0) {
      right = mid;
      continue;
    }
    if (r === 0) {
      return true;
    }
    left = mid;
  }
  for (let i = left; i <= right; i++) {
    const r = compare(nums[i]);
    if (r === 0) {
      return true;
    }
  }
  return false;
}

// function test() {
//   const json = [
//     {
//       p1: [2, 5, 6, 0, 0, 1, 2],
//       p2: 1,
//       result: true,
//     },
//     {
//       p1: [7, 9, 11, 14, 55, 78, 79, 83, 85, 97, 0, 0, 1, 2, 2, 3, 3, 3, 4],
//       p2: 84,
//       result: false,
//     },
//     {
//       p1: [0, 1, 2],
//       p2: 0,
//       result: true,
//     },
//     {
//       p1: [0],
//       p2: 0,
//       result: true,
//     },{
//       p1: [0],
//       p2: 1,
//       result: false,
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = search(j.p1, j.p2);
//     if (String(res) !== String(j.result)) {
//       console.log(`参数:${JSON.stringify(j.p1)}`);
//       console.log(
//         `idx:${idx}，期望结果:${JSON.stringify(
//           j.result
//         )}，测试结果:${JSON.stringify(res)}`
//       );
//     } else {
//       console.log(`pass ${idx}`);
//     }
//   });
// }
// test();
//leetcode submit region end(Prohibit modification and deletion)
