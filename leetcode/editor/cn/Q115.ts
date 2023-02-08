// 不同的子序列
//给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。
//
// 字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列
//，而 "AEC" 不是）
//
// 题目数据保证答案符合 32 位带符号整数范围。
//
//
//
// 示例 1：
//
//
//输入：s = "rabbbit", t = "rabbit"
//输出：3
//解释：
//如下图所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
//rabbbit
//rabbbit
//rabbbit
//
// 示例 2：
//
//
//输入：s = "babgbag", t = "bag"
//输出：5
//解释：
//如下图所示, 有 5 种可以从 s 中得到 "bag" 的方案。
//babgbag
//babgbag
//babgbag
//babgbag
//babgbag
//
//
//
//
// 提示：
//
//
// 0 <= s.length, t.length <= 1000
// s 和 t 由英文字母组成
//
//
// Related Topics 字符串 动态规划 👍 908 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function numDistinct(s: string, t: string): number {
  if (s.length < t.length) return 0;

  const b: number[][] = new Array(t.length).fill(1).map(() => {
    return new Array(s.length).fill(0);
  });


  // 先处理边界
  b[0][0] = s[0] === t[0] ? 1 : 0;
  for (let y = 1; y < t.length; y++) {
    b[y][y] = s[y] === t[y] ? b[y - 1][y - 1] : 0;
  }
  for (let x = 1; x < s.length; x++) {
    b[0][x] = t[0] === s[x] ? b[0][x - 1] + 1 : b[0][x - 1];
  }

  // 动态规划 x->s y->t
  // y>x b[y][x]= 0
  // 将t的第y个字符放在,s的第(k->[y,x])个位置,如果相等，则是以下标k结尾的字串
  // y<=x b[y][x]= for(k in [y,x]) if(s[k]===t[y])  b[y-1][k-1]
  for (let y = 1; y < t.length; y++) {
    for (let x = y + 1; x < s.length; x++) {
      let dt = 0;
      for (let k = y; k <= x; k++) {
        if (s[k] === t[y]) {
          dt += b[y - 1][k - 1];
        }
      }
      b[y][x] = dt;
    }
  }

  return b[t.length - 1][s.length - 1];
}

//输入：s = "rrabbbit", t = "rabbit"
//输出：3
// function test() {
//   const json = [
//     {
//       p1: "rabbbit",
//       p2: "rabbit",
//       result: 3,
//     },
//     {
//       p1: "rabbbitt",
//       p2: "rabbit",
//       result: 6,
//     },
//     {
//       p1: "rrabbbitt",
//       p2: "rabbit",
//       result: 12,
//     },
//     {
//       p1: "babgbag",
//       p2: "bag",
//       result: 5,
//     },
//     {
//       p1: "aaaa",
//       p2: "aa",
//       result: 6,
//     },
//     {
//       p1: "aaaaaaaaaaaaaaaaaaaaa",
//       p2: "aaaaa",
//       result: 20349,
//     },
//     {
//       p1: "a".repeat(6),
//       p2: "a".repeat(3),
//       result: 20,
//     },
//     {
//       p1: "a".repeat(4),
//       p2: "a".repeat(2),
//       result: 6,
//     },
//     {
//       p1: "aaaaaaaaaaaaaaaaaaaa",
//       p2: "aaaaaa",
//       result: 38760,
//     },
//     {
//       p1: "ababaabaaabbaabccabccbaabc",
//       p2: "acba",
//       result: 112,
//     },
//     {
//       p1: "babbabbbabb",
//       p2: "aabb",
//       result: 12,
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = numDistinct(j.p1, j.p2);
//     if (String(res) !== String(j.result)) {
//       console.log(`参数:${JSON.stringify(j.p1)}`);
//       console.log(
//         `idx:${idx}，期望结果:${JSON.stringify(
//           j.result
//         )}，测试结果:${JSON.stringify(res)}`
//       );
//     } else {
//       console.log(`pass ${idx}`);
//     }
//   });
// }
// test();

// y>x b[y][x]= 0

// 将t的第y个字符放在,s的第k个位置
// y<=x b[y][x]= for(k in [y,x]) if(s[k]===t[y])  b[y-1][k-1]

//     xs
//     0 1 2 3 4 5 6 7 8
// yt  r r a b b b i t t
// 0 r 1 2 2 2 2 2 2 2 2
// 1 a 0 0 2 2 2 2 2 2 2
// 2 b 0 0 0
// 3 b
// 4 i
// 5 i

//     xs
//     0 1 2 3 4  5 6 7 8
// yt  r r r r r  r
// 0 r 1 2 3 4 5  6
// 1 r 0 1 3 6 10 15
// 2 r 0 0 1 4 10 20
//

//
//     xs
//     0 1 2 3 4 5 6 7 8
// yt  r b r r r
// 0 r 1 1 2 3 4
// 1 b 0 1 1 1 1
// 2 r 0 0 1 2 3
//

// rrabbbitt  rabbit
//     xs
//     0 1 2 3 4 5 6 7 8 9 10 11
// yt  r r a b b b i t t
// 0 r 1 2 2 2 2 2 2 2 2
// 1 a 0 0 2 2 2 2 2 2 2
// 2 b 0 0 0 2 4 6 6 6 6
// 3 b 0 0 0 0 2 6 6 6 6
// 4 i 0 0 0 0 0 0 6 6 6
// 5 t 0 0 0 0 0 0 0 6 12

// babbabbbabb
//     xs
//     0 1 2 3 4 5 6 7 8 9 10 11
// yt  b a b b a b b b a b b
// 0 a 0 1 1 1 2 2 2 2 3 3 3
// 1 a 0 0
// 1 b
// 1 b

//leetcode submit region end(Prohibit modification and deletion)
