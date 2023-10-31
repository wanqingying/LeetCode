//给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数
//字，并以数组的形式返回结果。 
//
// 
//
// 示例 1： 
//
// 
//输入：nums = [4,3,2,7,8,2,3,1]
//             1 2 3 4 5 6 7 8
//输入：nums = [1,2,3,4,8,2,7,8]
//输出：[5,6]
//
// 1 2 3 4
//[2,1,4,3]
//[1,2]
// 示例 2： 
//
// 
//输入：nums = [1,1]
//输出：[2]
// 
//
// 
//
// 提示： 
//
// 
// n == nums.length 
// 1 <= n <= 10⁵ 
// 1 <= nums[i] <= n 
// 
//
// 进阶：你能在不使用额外空间且时间复杂度为 O(n) 的情况下解决这个问题吗? 你可以假定返回的数组不算在额外空间内。 
//
// Related Topics 数组 哈希表 👍 1257 👎 0


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        List<Integer> list = new ArrayList<>(nums.length);
        for (int i = 0; i < nums.length; i++) {
            int temp = nums[i];
            while (temp != i + 1) {
                if (nums[temp - 1] == temp) {
                    break;
                }

                nums[i] = nums[temp - 1];
                nums[temp - 1] = temp;
                temp = nums[i];

            }
        }

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != i + 1) {
                list.add(i + 1);
            }
        }
        return list;
    }
}
//leetcode submit region end(Prohibit modification and deletion)
