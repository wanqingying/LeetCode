//给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
//
// 返回所有可能的结果。答案可以按 任意顺序 返回。
//
//
//
// 示例 1：
//
//
//输入：s = "()())()"
//输出：["(())()","()()()"]
//
//
// 示例 2：
//
//
//输入：s = "(a)())()"
//输出：["(a())()","(a)()()"]
//
//
// 示例 3：
//
//
//输入：s = ")("
//输出：[""]
//
//
//输入：s = "(a)()))())"
//
//
// 提示：
//
//
// 1 <= s.length <= 25
// s 由小写英文字母以及括号 '(' 和 ')' 组成
// s 中至多含 20 个括号
//
//
// Related Topics 广度优先搜索 字符串 回溯 👍 853 👎 0
//输入：s = "(a)()))())"

//leetcode submit region begin(Prohibit modification and deletion)
function removeInvalidParentheses(s: string): string[] {
  const result: string[] = [];
  let stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") stack.push(s[i]);
    if (s[i] === ")") {
      if (stack[stack.length - 1] === "(") {
        stack.pop();
      } else {
        stack.push(s[i]);
      }
    }
  }
  const delCont = stack.length;

  function remove(stack: string[], i: number, delArr: number[]) {
    if (delArr.length > delCont) return;
    if (i === s.length) {
      if (delArr.length === delCont && stack.length === 0) {
        const res = s
          .split("")
          .filter((_, idx) => !delArr.includes(idx))
          .join("");
        if (!result.includes(res)) {
          result.push(res);
        }
      }
      return;
    }
    if (s[i] === "(") {
      remove([...stack], i + 1, [...delArr, i]);
      remove([...stack, s[i]], i + 1, [...delArr]);
    }
    if (s[i] === ")") {
      // del
      remove([...stack], i + 1, [...delArr, i]);
      // not del
      if (stack[stack.length - 1] === "(") {
        stack.pop();
        remove([...stack], i + 1, [...delArr]);
      } else {
        remove([...stack, s[i]], i + 1, [...delArr]);
      }
    }
    if (s[i] !== "(" && s[i] !== ")") {
      remove([...stack], i + 1, [...delArr]);
    }
  }
  remove([], 0, []);

  return result;
}

// console.log(removeInvalidParentheses("()())())))((()))x((c)f())45()4()"));
//leetcode submit region end(Prohibit modification and deletion)
