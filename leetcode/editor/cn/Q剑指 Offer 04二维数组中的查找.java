//在一个 n * m 的二维数组中，每一行都按照从左到右 非递减 的顺序排序，每一列都按照从上到下 非递减 的顺序排序。请完成一个高效的函数，输入这样的一个二
//维数组和一个整数，判断数组中是否含有该整数。 
//
// 
//
// 示例: 
//
// 现有矩阵 matrix 如下： 
//
// 
//[
//  [1,   4,  7, 11, 15],
//  [2,   5,  8, 12, 19],
//  [3,   6,  9, 16, 22],
//  [10, 13, 14, 17, 24],
//  [18, 21, 23, 26, 30]
//]
// 
//
// 给定 target = 5，返回 true。 
//
// 给定 target = 20，返回 false。 
//
// 
//
// 限制： 
//
// 0 <= n <= 1000 
//
// 0 <= m <= 1000 
//
// 
//
// 注意：本题与主站 240 题相同：https://leetcode-cn.com/problems/search-a-2d-matrix-ii/ 
//
// Related Topics 数组 二分查找 分治 矩阵 👍 998 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
//    public boolean findNumberIn2DArray(int[][] matrix, int target) {
//        Integer r1 = null;
//        Integer r2 = null;
//        int m = matrix.length;
//        if (m == 0) return false;
//        int n = matrix[0].length;
//        if (n == 0) return false;
//        for (int i = 0; i < m; i++) {
//            if (matrix[i][0] <= target && target <= matrix[i][n - 1]) {
//                if (r1 == null) {
//                    r1 = i;
//                }
//                r2 = i;
//            }
//        }
//        Integer x1 = null;
//        Integer x2 = null;
//
//        if (r1 == null || r2 == null) return false;
//        for (int i = 0; i < n; i++) {
//            if (matrix[r1][i] >= target && x1 == null) {
//                x1 = i;
//            }
//            if (matrix[r2][i] >= target && x2 == null) {
//                x2 = i;
//            }
//        }
//
//        for (int i = x2; i <= x1; i++) {
//            for (int j = r1; j <= r2; j++) {
//                if (matrix[j][i] == target) return true;
//            }
//        }
//
//
//        return false;
//    }

    public boolean findNumberIn2DArray(int[][] matrix, int target) {
        int i = matrix.length - 1, j = 0;
        while (i >= 0 && j < matrix[0].length) {
            if (matrix[i][j] > target) i--;
            else if (matrix[i][j] < target) j++;
            else return true;
        }
        return false;
    }
}
//leetcode submit region end(Prohibit modification and deletion)
