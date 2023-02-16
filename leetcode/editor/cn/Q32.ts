// 最长有效括号
//给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
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
// Related Topics 栈 字符串 动态规划 👍 2152 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function longestValidParentheses(s: string): number {
  let stack: any[] = [];
  function over() {
    let px = 0;
    while (typeof stack[0] === "number") {
      px += stack.shift();
      // @ts-ignore
    }
    stack.unshift(px);
  }
  for (let i = 0; i < s.length; i++) {
    const si = s[i];
    if (si === "(") {
      stack.unshift(si);
    } else {
      // )
      over();
      let nk = stack[0];
      let pk = stack[1];
      if (typeof nk === "number") {
        if (pk === "(") {
          stack.shift();
          stack.shift();
          stack.unshift(nk + 2);
        } else {
          stack.unshift(si);
        }
      } else {
        if (nk === "(") {
          stack.shift();
          stack.unshift(2);
        } else {
          stack.unshift(si);
        }
      }
      over();
    }
  }
  let max = 0;
  for (let i = 0; i < stack.length; i++) {
    if (typeof stack[i] === "number") {
      max = Math.max(max, stack[i]);
    }
  }
  return max;
}
// longestValidParentheses("");
//runtime:220 ms
//memory:44.7 MB

//leetcode submit region end(Prohibit modification and deletion)
