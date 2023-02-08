// 编辑距离
//给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数 。
//
// 你可以对一个单词进行如下三种操作：
//
//
// 插入一个字符
// 删除一个字符
// 替换一个字符
//
//
//
//
// 示例 1：
//
//
//输入：word1 = "horse", word2 = "ros"
//输出：3
//解释：
//horse -> rorse (将 'h' 替换为 'r')
//rorse -> rose (删除 'r')
//rose -> ros (删除 'e')
//
//
// 示例 2：
//
//
//输入：word1 = "intention", word2 = "execution"
//输出：5
//解释：
//intention -> inention (删除 't')
//inention -> enention (将 'i' 替换为 'e')
//enention -> exention (将 'n' 替换为 'x')
//exention -> exection (将 'n' 替换为 'c')
//exection -> execution (插入 'u')
//
//
//
//
// 提示：
//
//
// 0 <= word1.length, word2.length <= 500
// word1 和 word2 由小写英文字母组成
//
// Related Topics 字符串 动态规划 👍 2528 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function minDistance(word1: string, word2: string): number {
  const n = word1.length;
  const m = word2.length;
  if (n * m === 0) {
    return n + m;
  }
  const D: number[][] = new Array(n + 1).fill(1).map((t) => {
    return new Array(m + 1);
  });
  for (let i = 0; i < n + 1; i++) {
    D[i][0] = i;
  }
  for (let j = 0; j < m + 1; j++) {
    D[0][j] = j;
  }
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      let left = D[i - 1][j] + 1;
      let down = D[i][j - 1] + 1;
      let left_down = D[i - 1][j - 1];
      if (word1.charAt(i - 1) != word2.charAt(j - 1)) {
        left_down += 1;
      }
      D[i][j] = Math.min(left, Math.min(down, left_down));
    }
  }
  return D[n][m];
}

/**
 *  hora    se
 *   oraorbkse
 *  hora  b se   k
 *   oraorbksemsek
 *
 p1: "xxxrrdd",
 p2: "xarrbdd",

 p1:    "xxxrr dd",
 p2:     "xarrbdd",

 插入 c
 删除 s
 替换 t
 命中 x
 [t] [t,x] [t,x,s]

   h o r a s e
 o 1 1 2 3 4 5
 r 2 2 1 2 3 4
 a 3 3 2 1 2 3
 o 4 4 3 2 2 3
 r
 a
 b
 k
 s
 e
 */
function test() {
  const json = [
    {
      p1: "horase",
      p2: "oraorbkse",
      result: 5,
    },
    {
      p1: "horbse",
      p2: "oraorbkse",
      result: 4,
    },
    // {
    //   p1: "horabsefrghgxxxxddd",
    //   p2: "oraorbksefgxxd",
    //   result: 11,
    // },
    {
      p1: "xxxrrdd",
      p2: "xarrbdd",
      result: 3,
    },
  ];

  json.forEach((j, idx) => {
    const res = minDistance(j.p1, j.p2);
    if (String(res) !== String(j.result)) {
      console.log(`参数:${JSON.stringify(j.p1)}`);
      console.log(
        `idx:${idx}，期望结果:${JSON.stringify(
          j.result
        )}，测试结果:${JSON.stringify(res)}`
      );
    } else {
      console.log(`pass ${idx}`);
    }
  });
}
// test();
//leetcode submit region end(Prohibit modification and deletion)
