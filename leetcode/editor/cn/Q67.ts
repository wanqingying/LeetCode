// 二进制求和
//给你两个二进制字符串，返回它们的和（用二进制表示）。
//
// 输入为 非空 字符串且只包含数字 1 和 0。
//
//
//
// 示例 1:
//
// 输入: a = "11", b = "1"
//输出: "100"
//
// 示例 2:
//
// 输入: a = "1010", b = "1011"
//输出: "10101"
//
//
//
// 提示：
//
//
// 每个字符串仅由字符 '0' 或 '1' 组成。
// 1 <= a.length, b.length <= 10^4
// 字符串如果不是 "0" ，就都不含前导零。
//
// Related Topics 位运算 数学 字符串 模拟 👍 857 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function addBinary(a: string, b: string): string {
  // 输入:
  // a = "1010",
  // b = "1011"
  // 输出:"10101"
  let result: number[] = [];
  const bLen = b.length;
  const aLen = a.length;
  const mx = Math.max(aLen, bLen);

  function add(n: number, i: number) {
    //n:  0,1
    //ri: 0,1
    const ri = result[i] || 0;

    //na: 0,1,2
    const na = n + ri;
    if (na === 2) {
      result[i] = 0;
      add(1, i + 1);
    } else {
      result[i] = na;
    }
  }
  for (let i = 0; i < mx; i++) {
    let k = 0;
    if (i < aLen) {
      k += Number(a[aLen - 1 - i]);
    }
    if (i < bLen) {
      k += Number(b[bLen - 1 - i]);
    }
    if (k === 2) {
      add(0, i);
      add(1, i + 1);
    } else {
      add(k, i);
    }
  }
  return result.reverse().join("");
}

// function test() {
//   const json = [
//     {
//       p1: "10",
//       p2: "11",
//       result: "101",
//     },
//     {
//       p1: "10001111",
//       p2: "100010110011",
//       result: "100101000010",
//     },
//     {
//       p1: "1010",
//       p2: "1011",
//       result: "10101",
//     },
//     {
//       p1: "1010",
//       p2: "0",
//       result: "1010",
//     },
//     {
//       p1: "0",
//       p2: "0",
//       result: "0",
//     },
//     {
//       p1: "1",
//       p2: "0",
//       result: "1",
//     },
//     {
//       p1: "1",
//       p2: "1",
//       result: "10",
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = addBinary(j.p1, j.p2);
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
//leetcode submit region end(Prohibit modification and deletion)
