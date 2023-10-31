//给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位
//。
//
// 返回 滑动窗口中的最大值 。
//
//
//
// 示例 1：
//
//
//输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
//输出：[3,3,5,5,6,7]
//解释：
//滑动窗口的位置                最大值
//---------------               -----
//[1  3  -1] -3  5  3  6  7       3
// 1 [3  -1  -3] 5  3  6  7       3
// 1  3 [-1  -3  5] 3  6  7       5
// 1  3  -1 [-3  5  3] 6  7       5
// 1  3  -1  -3 [5  3  6] 7       6
// 1  3  -1  -3  5 [3  6  7]      7
//
//
// 示例 2：
//
//
//输入：nums = [1], k = 1
//输出：[1]
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 10⁵
// -10⁴ <= nums[i] <= 10⁴
// 1 <= k <= nums.length
//
//
//
// 示例 1：
//
//
//输入：nums = [1,3,-1,-3,-2,7,3,6,7], k = 3
//输出：            [3, 3,-1,7,7,7,7]
//

//输入：nums = [1,2,3,-1,-3,-2,2,1,0, 0,0,1,7,3,6,7], k = 3

//leetcode submit region begin(Prohibit modification and deletion)
function maxSlidingWindow(nums: number[], k: number): number[] {
  const queue: number[] = [];
  const res: number[] = [];

  // 单调栈: queue[n-1, n-2, ...] 均小于 queue[n]
  function eqe(n: number) {
    while (queue.length && queue[0] < n) {
      queue.shift();
    }
    queue.unshift(n);
  }

  for (let i = 0; i < nums.length; i++) {
    if (i < k) eqe(nums[i]);
    if (i >= k) {
      res.push(queue[queue.length - 1]);
      if (queue[queue.length - 1] === nums[i - k]) queue.pop();
      eqe(nums[i]);
    }
  }
  res.push(queue[queue.length - 1]);
  return res;
}


//leetcode submit region end(Prohibit modification and deletion)
