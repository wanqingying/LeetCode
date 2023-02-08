// 有效数字
//有效数字（按顺序）可以分成以下几个部分：
//
//
// 一个 小数 或者 整数
// （可选）一个 'e' 或 'E' ，后面跟着一个 整数
//
//
// 小数（按顺序）可以分成以下几个部分：
//
//
// （可选）一个符号字符（'+' 或 '-'）
// 下述格式之一：
//
// 至少一位数字，后面跟着一个点 '.'
// 至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
// 一个点 '.' ，后面跟着至少一位数字
//
//
//
//
// 整数（按顺序）可以分成以下几个部分：
//
//
// （可选）一个符号字符（'+' 或 '-'）
// 至少一位数字
//
//
// 部分有效数字列举如下：["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7
//", "+6e-1", "53.5e93", "-123.456e789"]
//
// 部分无效数字列举如下：["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]
//
// 给你一个字符串 s ，如果 s 是一个 有效数字 ，请返回 true 。
//

//leetcode submit region begin(Prohibit modification and deletion)
function isNumber(s: string): boolean {
  // 部分有效数字列举如下：["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]
  // 部分无效数字列举如下：["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]
  // 给你一个字符串 s ，如果 s 是一个 有效数字 ，请返回 true 。
  // 状态机解法
  //             d  +/- e/E  .
  //         s0 s1  s2  s3  s4
  //  3      s1 s1  x   s5  s6
  //  -      s2 s7  x   x   s8
  //  e      s3 x   x   x   x
  //  .      s4 s11 x   x   x
  // 3e      s5 s9  s10 x   x
  // 3.      s6 s11 x   s5  x
  // -3      s7 s7  x   s5  s6
  // -.      s8 s11 x   x   x
  // 3e3     s9 s9  x   x   x
  // 3e-    s10 s9  x   x   x
  // 3.3    s11 s11 x   s5  x
  const g = [
    [1, 2, 3, 4],
    [1, 0, 5, 6],
    [7, 0, 0, 8],
    [0, 0, 0, 0],
    [11, 0, 0, 0],
    [9, 10, 0, 0],
    [11, 0, 5, 0],
    [7, 0, 5, 6],
    [11, 0, 0, 0],
    [9, 0, 0, 0],
    [9, 0, 0, 0],
    [11, 0, 5, 0],
  ];
  const gok = [1, 6, 7, 9, 11];
  const md = new Map<string, number>();
  md.set("+", 1);
  md.set("-", 1);
  md.set("e", 2);
  md.set("E", 2);
  md.set(".", 3);
  let y = 0;
  for (let i = 0; i < s.length; i++) {
    let n = md.get(s[i]);
    if (!n) {
      if (/\d/.test(s[i])) {
        n = 0;
      } else {
        return false;
      }
    }
    const gi = g[y];
    y = gi[n];
    if (y === 0) {
      return false;
    }
  }
  return gok.includes(y);
}

function test() {
  const json = [
    // {
    //   p1: "3",
    //   result: true,
    // },
    // { p1: "2", result: true },
    // { p1: "0089", result: true },
    // { p1: "-0.1", result: true },
    // { p1: "+3.14", result: true },
    // { p1: "4.", result: true },
    // { p1: "-.9", result: true },
    // { p1: "2e10", result: true },
    // { p1: "-90E3", result: true },
    // { p1: "3e+7", result: true },
    // { p1: "+6e-1", result: true },
    // { p1: "53.5e93", result: true },
    // { p1: "-123.456e789", result: true },
    // { p1: "abc", result: false },
    // { p1: "1a", result: false },
    // { p1: "1e", result: false },
    // { p1: "e3", result: false },
    // { p1: "99e2.5", result: false },
    // { p1: "--6", result: false },
    // { p1: "-+3", result: false },
    // { p1: "95a54e53", result: false },
    // { p1: "95a54e53", result: false },
    { p1: "46.e3", result: true },
    { p1: "46.e3", result: true },
  ];

  json.forEach((j, idx) => {
    const res = isNumber(j.p1);
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
