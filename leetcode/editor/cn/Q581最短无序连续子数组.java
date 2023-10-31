//给你一个整数数组 nums ，你需要找出一个 连续子数组 ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。 
//
// 请你找出符合题意的 最短 子数组，并输出它的长度。 
//
// 
//
// 
// 
// 示例 1： 
// 
// 
//
// 
//输入：nums = [2,6,5,4,8,10,9,15]
//输入：nums = [2,3,4,6,3,5,10,9,15]
//输出：5
//解释：你只需要对 [4,6,3,5,10,9] 进行升序排序，那么整个表都会变为升序排序。
// 
//
// 示例 2： 
//
// 
//输入：nums = [1,2,3,4]
//输出：0
// 
//
// 示例 3： 
//
// 
//输入：nums = [1]
//输出：0
// 
//
// 
//
// 提示： 
//
// 
// 1 <= nums.length <= 10⁴ 
// -10⁵ <= nums[i] <= 10⁵ 
// 
//
// 
//
// 进阶：你可以设计一个时间复杂度为 O(n) 的解决方案吗？ 
//
// Related Topics 栈 贪心 数组 双指针 排序 单调栈 👍 1088 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    //输入：nums = [2,6,5,4,8,10,9,15]
    //输入：nums = [2,4,6,3,5,10,9,15]
    //输出：5
    //解释：你只需要对 [4,6,3,5,10,9] 进行升序排序，那么整个表都会变为升序排序。
    public int findUnsortedSubarray(int[] nums) {
        List<Integer> left = new ArrayList<>();
        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;
        int xl = 0;
        int xr = 0;
        left.add(nums[0]);
        List<Integer> right = new ArrayList<>();
        right.add(nums[nums.length - 1]);

        for (int i = 1; i < nums.length; i++) {
            int ni = nums[i];
            if (left.get(left.size() - 1) > ni && ni < min) {
                while (left.size() > 0 && left.get(left.size() - 1) > ni) {
                    left.remove(left.size() - 1);
                }
                min = Math.min(min, ni);
                xl = left.size();
            }
            left.add(nums[i]);
        }

        for (int i = nums.length - 2; i >= 0; i--) {
            int ni = nums[i];
            if (right.get(right.size() - 1) < ni && ni > max) {
                while (right.size() > 0 && right.get(right.size() - 1) < ni) {
                    right.remove(right.size() - 1);
                }
                max = Math.max(max, ni);
                xr = nums.length - right.size();
            }
            right.add(nums[i]);
        }
        // print
//        System.out.println(Arrays.toString(left.toArray()));
//        System.out.println(Arrays.toString(right.toArray()));
//        System.out.println(xl + " " + xr);

        return xr - xl;
    }
}
//leetcode submit region end(Prohibit modification and deletion)
