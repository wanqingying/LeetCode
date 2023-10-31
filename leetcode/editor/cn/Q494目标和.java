//给你一个非负整数数组 nums 和一个整数 target 。 
//
// 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ： 
//
// 
// 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。 
// 
//
// 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。 
//
//  sum - 2*neg= target
//  neg= (sum - target) / 2
//
// 示例 1： 
//
// 
//输入：nums = [1,1,1,1,1], target = 3
//
//[ 1,      1,    1,       1,         1]
//[[1],    [2,0],[3,1,-1],[4,2,0,-2],[5,3,1,-1,-3]]
//[],[[2,1],[]],[3,1,-1],[4,2,0,-2],[5,3,1,-1,-3]]
//输出：5
//解释：一共有 5 种方法让最终目标和为 3 。
//-1 + 1 + 1 + 1 + 1 = 3
//+1 - 1 + 1 + 1 + 1 = 3
//+1 + 1 - 1 + 1 + 1 = 3
//+1 + 1 + 1 - 1 + 1 = 3
//+1 + 1 + 1 + 1 - 1 = 3
// 
//
// 示例 2： 
//
// 
//输入：nums = [1], target = 1
//输出：1
// 
//
// 
//
// 提示： 
//
// 
// 1 <= nums.length <= 20 
// 0 <= nums[i] <= 1000 
// 0 <= sum(nums[i]) <= 1000 
// -1000 <= target <= 1000 
// 
//
// Related Topics 数组 动态规划 回溯 👍 1720 👎 0


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        List<HashMap<Integer, Integer>> mapList = new ArrayList<>();
        HashMap<Integer, Integer> tempMap = new HashMap<>();
        tempMap.put(nums[0], 1);
        if (tempMap.containsKey(-nums[0])) {
            tempMap.put(-nums[0], 2);
        } else {
            tempMap.put(-nums[0], 1);
        }
        mapList.add(tempMap);
        for (int i = 1; i < nums.length; i++) {
            HashMap<Integer, Integer> temp = new HashMap<>();
            HashMap<Integer, Integer> pm = mapList.get(i - 1);

            for (Integer key : pm.keySet()) {
                int addValue = key + nums[i];
                int subValue = key - nums[i];
                if (temp.containsKey(addValue)) {
                    temp.put(addValue, temp.get(addValue) + pm.get(key));
                } else {
                    temp.put(addValue, pm.get(key));
                }
                if (temp.containsKey(subValue)) {
                    temp.put(subValue, temp.get(subValue) + pm.get(key));
                } else {
                    temp.put(subValue, pm.get(key));
                }
            }
            // printf temp
            mapList.add(temp);
            if (i > 2) {
                mapList.set(i - 2,null);
            }
        }
        HashMap<Integer, Integer> lastMap = mapList.get(mapList.size() - 1);
        return lastMap.get(target) == null ? 0 : lastMap.get(target);
    }
}
//leetcode submit region end(Prohibit modification and deletion)
