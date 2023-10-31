//给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
//
// 假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。
//
// 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。
//
//
//
// 示例 1：
//
//
//输入：nums = [1,3,4,2,2]
//输出：2
//
//
// 示例 2：
//
//
//输入：nums = [3,1,3,4,2]
// 0->3->4->2->3->4->2
//输出：3
//
//
//
//
// 提示：
//
//
// 1 <= n <= 10⁵
// nums.length == n + 1
// 1 <= nums[i] <= n
// nums 中 只有一个整数 出现 两次或多次 ，其余整数均只出现 一次
//
//
//
//
// 进阶：
//
//
// 如何证明 nums 中至少存在一个重复的数字?
// 你可以设计一个线性级时间复杂度 O(n) 的解决方案吗？
//
//
// Related Topics 位运算 数组 双指针 二分查找 👍 2174 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function findDuplicate(nums: number[]): number {
    let slow = 0, fast = 0;
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow !== fast);
        slow = 0;
        while (slow !== fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
}


// 1 2  3  4   5   6   7   8    9 10 11 12 13 14 15
// 1 10 11 100 101 110 111 1000 11 10  1  0  1  0  1
// console.log(findDuplicate([3,1,3,4,2]));

//leetcode submit region end(Prohibit modification and deletion)