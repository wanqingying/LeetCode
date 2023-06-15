//给定一个整数 n，计算所有小于等于 n 的非负整数中数字 1 出现的个数。
//
//
//
// 示例 1：
//
//
//输入：n = 13
//输出：6
//
//
// 示例 2：
//
//
//输入：n = 0
//输出：0
//
//
//
//
// 提示：
//
//
// 0 <= n <= 10⁹
//
//
// Related Topics 递归 数学 动态规划 👍 522 👎 0

// 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17  18  19  20 21  22  23  24  25  26  27  28  29  30
// 1 1 1 1 1 1 1 1 1  2  4  5  6  7  8  9  10

// 11  1*2 +1*1
// 13  1*2 +1*4 = 6
// 19  1*2 +1*10 = 12
// 21  12+1=13
// 61  1*7+ 10=17
// 80  1*8+ 10=18
// 91  1*10+10=20

// 145
// 15*1 + 10*2 + 46= 81
// 658
// 66 + 10*7 + 100= 236
// 321456123 - 365388981
// 6580 - 3018

// 213 - 146
// 22+ 2*10+4 +100=146

//leetcode submit region begin(Prohibit modification and deletion)
function countDigitOne(n: number): number {
  if (n === 0) return 0;
  let res = 0;
  let k = 1;
  while (n >= k) {
    let d = Math.floor(n / (k * 10));
    let b = Math.floor((n % (k * 10)) / k);

    if (b === 0) {
      res += d * k;
    }
    if (b === 1) {
      res += d * k + (n % k) + 1;
    }
    if (b >= 2) {
      res += (d + 1) * k;
    }
    k *= 10;
  }

  // let d1 = Math.floor(n / 10) + (n % 10 >= 1 ? 1 : 0);
  // let d2 = Math.floor(n / 100) + (n % 100 >= 10 ? 1 : 0);
  // let d3 = Math.floor(n / 1000) + (n % 1000 >= 100 ? 1 : 0);
  // console.log(d1, d2, d3);

  return res;
  // return d1 + d2 * 10 + d3 * 100;
}

// console.log(countDigitOne(213));

//leetcode submit region end(Prohibit modification and deletion)
