// 正则表达式匹配
//给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
//
//
// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
//
//
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
//
// 示例 1：
//
//
//输入：s = "aa", p = "a"
//输出：false
//解释："a" 无法匹配 "aa" 整个字符串。
//
//
// 示例 2:
//
//
//输入：s = "aa", p = "a*"
//输出：true
//解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
//
//
// 示例 3：
//
//
//输入：s = "ab", p = ".*"
//输出：true
//解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
//
//
//
//
// 提示：
//
//
// 1 <= s.length <= 20
// 1 <= p.length <= 30
// s 只包含从 a-z 的小写字母。
// p 只包含从 a-z 的小写字母，以及字符 . 和 *。
// 保证每次出现字符 * 时，前面都匹配到有效的字符
//
//
// Related Topics 递归 字符串 动态规划 👍 3429 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function isMatch(s: string, p: string): boolean {
  // 思路:递归匹配
  function match(si, pi, px) {
    const sr = s[si];
    const pr = p[pi];
    if (sr !== undefined && pr === undefined) {
      return false;
    }

    if (p[pi + 1] === "*") {
      // 匹配零个或多个
      //aaab=>a*b
      if (match(si, pi + 2, pi + 2)) {
        // 匹配0个 跳过a*
        // aaab=>b
        return true;
      }

      // 匹配一个
      if (sr === undefined) {
        return false;
      }
      if (pr !== "." && sr !== pr) {
        // 当前不匹配 baab=>a*b
        return false;
      } else {
        // 继续匹配下一个 aab=>a*b
        return match(si + 1, pi, pi + 2);
      }
    } else {
      // 匹配一个
      if (si < s.length && p[pi] !== "." && sr !== pr) {
        //当前字符不匹配
        return false;
      }
    }

    if (si === s.length && px === p.length) {
      // 达到终点，匹配成功
      return true;
    }
    if (si > s.length || pi > p.length) {
      // 越界，匹配失败
      return false;
    }
    return match(si + 1, pi + 1, pi + 1);
  }

  return match(0, 0, 0);
}

// console.log(isMatch('abc', '.*'));
const map = [
  {
    str: "mississippi",
    exp: "mis*is*p*.",
    rt: false,
  },
  {
    str: "and",
    exp: ".*d",
    rt: true,
  },
];

function test() {
  map.forEach((p, idx) => {
    if (isMatch(p.str, p.exp) !== p.rt) {
      console.log("miss", idx, p);
    }
  });
}

// test();
// const m=map[0]
// console.log(isMatch(m.str,m.exp));

//runtime:164 ms
//memory:40.5 MB

//leetcode submit region end(Prohibit modification and deletion)
