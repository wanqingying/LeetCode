/**
 *
 给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。假设只有一个重复的整数，找出这个重复的数。

 示例 1:
 输入: [1,3,4,2,2]
 输出: 2

 示例 2:
 输入: [3,1,3,4,2]
 输出: 3

 说明：

 不能更改原数组（假设数组是只读的）。
 只能使用额外的 O(1) 的空间。
 时间复杂度小于 O(n2) 。
 数组中只有一个重复的数字，但它可能不止重复出现一次。

 链接：https://leetcode-cn.com/problems/find-the-duplicate-number
 */

/**
 *
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    let n = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] === i) {
                n++
            }
            if (n > 1) {
                return nums[j]
            }
        }
        n = 0
    }
};

/**
 *
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate2 = function (nums) {
    let start = 0;
    let end = Math.ceil(nums.length / 2)
    let tail = nums.length
    while (start !== end) {
        let k = 0;
        for (let j = 0; j < nums.length; j++) {
            if (nums[j]) {
                n++
            }
            if (n > 1) {
                return nums[j]
            }
        }
    }
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] === i) {
                n++
            }
            if (n > 1) {
                return nums[j]
            }
        }
        n = 0
    }
};

let an = [3, 1, 3, 4, 2]

console.log(findDuplicate(an));
console.log(findDuplicate2(an));