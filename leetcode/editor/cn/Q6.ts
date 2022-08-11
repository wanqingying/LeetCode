// Z 字形变换
//将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
//
// 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
//
//
//P   A   H   N
//A P L S I I G
//Y   I   R
//
// 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
//
// 请你实现这个将字符串进行指定行数变换的函数：
//
//
//string convert(string s, int numRows);
//
//
//
// 示例 1：
//
//
//输入：s = "PAYPALISHIRING", numRows = 3
//输出："PAHNAPLSIIGYIR"
//
//示例 2：
//
//
//输入：s = "PAYPALISHIRING", numRows = 4
//输出："PINALSIGYAHRPI"
//解释：
//P     I    N
//A   L S  I G
//Y A   H R
//P     I
//
//
// 示例 3：
//
//
//输入：s = "A", numRows = 1
//输出："A"
//
//
//
//
// 提示：
//
//
// 1 <= s.length <= 1000
// s 由英文字母（小写和大写）、',' 和 '.' 组成
// 1 <= numRows <= 1000
//
// Related Topics 字符串 👍 1743 👎 0

//P   A   H   N
//A P L S I I G
//Y   I   R
/**
 * 1   7
 * 2 6 8
 * 3 5 9
 * 4   10
 *
 * PAYPALISHIRING
 //P   A   H   N
 //A P L S I I G
 //Y   I   R
 py
 ap
 *
 * 0 n+(n-2)=2n*k-2
 * n n*k-1
 *
 */
//leetcode submit region begin(Prohibit modification and deletion)
function convert(s: string, numRows: number): string {
  let rar = new Array(numRows).fill("");
  let line = true;
  let ri = 0;
  let ra = numRows - 2;
  for (let i = 0; i < s.length; i++) {
    if (line) {
      rar[ri] += s[i];
      ri++;
    } else {
      rar[ra] += s[i];
      ra--;
    }
    if (ri >= numRows) {
      ri = 0;
      line = false;
    }
    if (ra <= 0) {
      ra = numRows - 2;
      line = true;
    }
  }
  return rar.join("");
}
//leetcode submit region end(Prohibit modification and deletion)
