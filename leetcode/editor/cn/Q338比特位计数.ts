//给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案。
//
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
//输入：n = 2
//输出：[0,1,1]
//解释：
//0 --> 0
//1 --> 1
//2 --> 10
//
//
// 示例 2：
//
//
//输入：n = 5
//输出：[0,1,1,2,1,2]
//解释：
//0 --> 0000
//1 --> 0001
//2 --> 0010
//3 --> 0011
//4 --> 0100
//5 --> 0101
//
//
//
//
// 提示：
//
//
// 0 <= n <= 10⁵
//
//
//
//
// 进阶：
//
//
// 很容易就能实现时间复杂度为 O(n log n) 的解决方案，你可以在线性时间复杂度 O(n) 内用一趟扫描解决此问题吗？
// 你能不使用任何内置函数解决此问题吗？（如，C++ 中的 __builtin_popcount ）
//
//
// Related Topics 位运算 动态规划 👍 1219 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function countBits(n: number): number[] {
  const bits = new Array(18).fill(0);
  const res = new Array(n + 1).fill(0);
  let ni = 0;
  let cont = 0;

  function add_bit() {
    let bi = 0;
    while (bits[bi] === 1) {
      bits[bi] = 0;
      bi++;
      cont--;
    }
    bits[bi] = 1;
    cont++;
  }

  while (ni <= n) {
    res[ni] = cont;
    add_bit();
    ni++;
  }
  return res;
}
//leetcode submit region end(Prohibit modification and deletion)
