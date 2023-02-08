// 扰乱字符串
//使用下面描述的算法可以扰乱字符串 s 得到字符串 t ：
//
// 如果字符串的长度为 1 ，算法停止
// 如果字符串的长度 > 1 ，执行下述步骤：
//
// 在一个随机下标处将字符串分割成两个非空的子字符串。即，如果已知字符串 s ，则可以将其分成两个子字符串 x 和 y ，且满足 s = x + y 。
// 随机 决定是要「交换两个子字符串」还是要「保持这两个子字符串的顺序不变」。即，在执行这一步骤之后，s 可能是 s = x + y 或者 s = y +
//x 。
// 在 x 和 y 这两个子字符串上继续从步骤 1 开始递归执行此算法。
//
//
//
//
// 给你两个 长度相等 的字符串 s1 和 s2，判断 s2 是否是 s1 的扰乱字符串。如果是，返回 true ；否则，返回 false 。
//
//
//
// 示例 1：
//
//
//输入：s1 = "great", s2 = "rgeat"
//输出：true
//解释：s1 上可能发生的一种情形是：
//"great" --> "gr/eat" // 在一个随机下标处分割得到两个子字符串
//"gr/eat" --> "gr/eat" // 随机决定：「保持这两个子字符串的顺序不变」
//"gr/eat" --> "g/r / e/at" // 在子字符串上递归执行此算法。两个子字符串分别在随机下标处进行一轮分割
//"g/r / e/at" --> "r/g / e/at" // 随机决定：第一组「交换两个子字符串」，第二组「保持这两个子字符串的顺序不变」
//"r/g / e/at" --> "r/g / e/ a/t" // 继续递归执行此算法，将 "at" 分割得到 "a/t"
//"r/g / e/ a/t" --> "r/g / e/ a/t" // 随机决定：「保持这两个子字符串的顺序不变」
//算法终止，结果字符串和 s2 相同，都是 "rgeat"
//这是一种能够扰乱 s1 得到 s2 的情形，可以认为 s2 是 s1 的扰乱字符串，返回 true
//
//
// 示例 2：
//
//
//输入：s1 = "abcde", s2 = "caebd"
//输出：false

//输入：s1 = "abcde", s2 = "cdebca"
//输出：true
//
//输入：s1 = "abcde", s2 = "ecadb"
//输出：false
//
//
//输入：s1 = "abcde", s2 = "ebadc"
//输出：true
//
//输入：s1 = "abcd", s2 = "badc"
//输出：true
//
//
//输入：s1 = "abcd", s2 = "badc"
//输出：true

const json = [
  {
    p1: "abcd",
    p2: "badc",
    result: true,
  },
  {
    p1: "abcd",
    p2: "cabd",
    result: true,
  },
  {
    p1: "abcd",
    p2: "acbd",
    result: true,
  },
  {
    p1: "abcd",
    p2: "cadb",
    result: false,
  },
];
//
//
// 示例 3：
//
//
//输入：s1 = "a", s2 = "a"
//输出：true
//

/**
 *
 *
 *
 * abcd
 * acbd
 *
 *
 *
 */

//
//
//
// 提示：
//
//
// s1.length == s2.length
// 1 <= s1.length <= 30
// s1 和 s2 由小写英文字母组成
//
// Related Topics 字符串 动态规划 👍 485 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function isScramble(s1: string, s2: string): boolean {
  const xm = new Map<string, any>();
  function scram(str: string, start: number): boolean {
    if (str.length <= 1) {
      return str === s1[start];
    }
    const se = xm.get(`${str}_${start}`);
    if (typeof se === "boolean") {
      return se;
    }
    if (str === s1.substring(start)) {
      return true;
    }
    // 不相等则必须发生翻转
    for (let i = 1; i < str.length; i++) {
      const leftStr = str.substring(0, i);
      const rightStr = str.substring(i);

      function noSwap() {
        const left = scram(leftStr, start);
        xm.set(`${leftStr}_${start}`, left);
        if (!left) {
          return false;
        }
        const right = scram(rightStr, start + i);

        xm.set(`${rightStr}_${start + i}`, right);
        return right;
      }
      function swap() {
        const rLen = str.length - i;
        const leftIdx = start + rLen;

        // 从第i个下标翻转
        const right = scram(rightStr, start);
        xm.set(`${rightStr}_${start}`, right);

        if (!right) {
          return false;
        }
        const left = scram(leftStr, leftIdx);
        xm.set(`${leftStr}_${leftIdx}`, left);
        return left;
      }

      if (noSwap() || swap()) {
        return true;
      } else {
        // console.log("continue", str, i + 1);
      }
    }

    return false;
  }

  return Boolean(scram(s2, 0));
}

//leetcode submit region end(Prohibit modification and deletion)
// function test() {
//   const json = [
//     {
//       p1: "abc",
//       p2: "bac",
//       result: true,
//     },
//     {
//       p1: "abc",
//       p2: "cab",
//       result: true,
//     },
//     {
//       p1: "abcd",
//       p2: "badc",
//       result: true,
//     },
//     {
//       p1: "abcd",
//       p2: "cabd",
//       result: true,
//     },
//     {
//       p1: "abcd",
//       p2: "acbd",
//       result: true,
//     },
//     {
//       p1: "abcd",
//       p2: "cadb",
//       result: false,
//     },
//     {
//       p1: "abcde",
//       p2: "caebd",
//       result: false,
//     },
//     {
//       p1: "great",
//       p2: "rgeat",
//       result: true,
//     },
//     {
//       p1: "a",
//       p2: "a",
//       result: true,
//     },
//     {
//       p1: "ab",
//       p2: "ab",
//       result: true,
//     },
//     {
//       p1: "ab",
//       p2: "ba",
//       result: true,
//     },
//     {
//       p1: "111111122222333344445444222123",
//       p2: "222112211111333344444445222213",
//       result: false,
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = isScramble(j.p1, j.p2);
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
