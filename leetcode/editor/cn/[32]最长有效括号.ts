//给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
//
//
//
//
//
// 示例 1：
//
//
//输入：s = "(()"
//输出：2
//解释：最长有效括号子串是 "()"
//
//
// 示例 2：
//
//
//输入：s = ")()())"
//输出：4
//解释：最长有效括号子串是 "()()"
//
//
// 示例 3：
//
//
//输入：s = ""
//输出：0
//
//
//
//
// 提示：
//
//
// 0 <= s.length <= 3 * 10⁴
// s[i] 为 '(' 或 ')'
//
//
//
// Related Topics 栈 字符串 动态规划 👍 1893 👎 0

/**
 *
 * s = ")(( (() (()) ) ))"
 * "(()())()))())))()"
 *  xxxx
 *
 */

//leetcode submit region begin(Prohibit modification and deletion)
function longestValidParentheses(s: string): number {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    const si = s[i];
    if (si === "(") {
      stack.unshift(si);
    } else {
      let i = 0;
      let p = stack[i];
      while (p && p === "x") {
        i++;
        p = stack[i];
      }
      if (p === "(") {
        stack.splice(i, 1);
        stack.unshift("x");
      } else {
        stack.unshift(si);
      }
    }
  }
  let max = 0;
  let x = 0;
  for (let i = 0; i < stack.length; i++) {
    if (stack[i] === "x") {
      x += 1;
      max = Math.max(max, x);
    } else {
      x = 0;
    }
  }
  return max*2;
}
//leetcode submit region end(Prohibit modification and deletion)
