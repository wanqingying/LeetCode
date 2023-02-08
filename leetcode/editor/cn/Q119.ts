// 杨辉三角 II
//给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。
//
// 在「杨辉三角」中，每个数是它左上方和右上方的数的和。
//
//
//
//
//
// 示例 1:
//
//
//输入: rowIndex = 3
//输出: [1,3,3,1]
//
//
// 示例 2:
//
//
//输入: rowIndex = 0
//输出: [1]
//
//
// 示例 3:
//
//
//输入: rowIndex = 1
//输出: [1,1]
//
//
//
//
// 提示:
//
//
// 0 <= rowIndex <= 33
//
//
//
//
// 进阶：
//
// 你可以优化你的算法到 O(rowIndex) 空间复杂度吗？
//
// Related Topics 数组 动态规划 👍 445 👎 0

//leetcode submit region begin(Prohibit modification and deletion)

function getRow(rowIndex: number): number[] {
  if (rowIndex < 2) return [[1], [1, 1]][rowIndex];

  const result = [1, 1];

  for (let i = 1; i < rowIndex; i++) {
    let b = 1;
    for (let j = 1; j < result.length; j++) {
      let rj = result[j];
      result[j] = b + result[j];
      b = rj;
    }
    result.push(1);
  }

  return result;
}

//leetcode submit region end(Prohibit modification and deletion)
