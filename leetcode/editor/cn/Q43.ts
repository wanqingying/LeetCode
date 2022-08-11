// 字符串相乘
//给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
//
// 注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。
//
//
//
// 示例 1:
//
//
//输入: num1 = "2", num2 = "3"
//输出: "6"
//
// 示例 2:
//
//
//输入: num1 = "123", num2 = "456"
//输出: "56088"
//
//
//
// 提示：
//
//
// 1 <= num1.length, num2.length <= 200
// num1 和 num2 只能由数字组成。
// num1 和 num2 都不包含任何前导零，除了数字0本身。
//
// Related Topics 数学 字符串 模拟 👍 1012 👎 0
//leetcode submit region begin(Prohibit modification and deletion)
function multiply(num1: string, num2: string): string {
  /**
   *   12* 47
   *   2*7=14     [1,4]
   *   2*4=80     [9,4]
   *   1*7=70   [1,6,4]
   *   1*4=400  [5,6,4]
   *
   *   21 * 74
   *   2*7=14     [4,1]
   *   2*4=80     [4,9]
   *   1*7=70     [4,6,1]
   *   1*4=400    [4,6,5]
   *
   */
  let result: number[] = [];
  function add(n: number, k: number) {
    const ri = result[k] || 0;
    const rn = ri + n;
    const ri2 = rn % 10;

    result[k] = ri2;
    if (rn >= 10) {
      add((rn - ri2) / 10, k + 1);
    }
  }

  for (let i = num1.length - 1; i >= 0; i--) {
    const ni = Number(num1[i]);
    const k = num1.length - 1 - i;
    for (let j = num2.length - 1; j >= 0; j--) {
      const nj = Number(num2[j]);
      const v = num2.length - 1 - j;

      const mp = ni * nj;
      add(mp, k + v);
    }
  }
  result = result.reverse();
  let k = true;
  for (let i = 0; i < result.length - 1; i++) {
    if (result[i] !== 0) {
      k = false;
    } else {
      if (k) {
        result[i] = -1;
      }
    }
  }

  return result.filter((k) => Number(k) >= 0).join("");
}

// function test() {
//   const json = [
//     {
//       p1: "12",
//       p2: "47",
//       result: "564",
//     },
//     {
//       p1: "20344443243",
//       p2: "2000001232132303",
//       result: "40688911553045706250378629",
//     },
//     {
//       p1: "20",
//       p2: "130",
//       result: "2600",
//     },
//     {
//       p1: "923",
//       p2: "0",
//       result: "0",
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = multiply(j.p1, j.p2);
//     if (String(res) !== String(j.result)) {
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
