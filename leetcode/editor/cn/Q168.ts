// Excel表列名称
//给你一个整数 columnNumber ，返回它在 Excel 表中相对应的列名称。
//
// 例如：
//
//
//A -> 1
//B -> 2
//C -> 3
//...
//Z -> 26
//AA -> 27
//AB -> 28
//...
//
//
//
//
// 示例 1：
//
//
//输入：columnNumber = 1
//输出："A"
//
//
// 示例 2：
//
//
//输入：columnNumber = 28
//输出："AB"
//
//
// 示例 3：
//
//
//输入：columnNumber = 701
//输出："ZY"
//
//
// 示例 4：
//
//
//输入：columnNumber = 2147483647
//输出："FXSHRXW"
//
//
//
//
// 提示：
//
//
// 1 <= columnNumber <= 2³¹ - 1
//
//
// Related Topics 数学 字符串 👍 598 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function convertToTitle(columnNumber: number): string {
  const charA = 65;
  const cont = 26;
  let result = "";
  while (columnNumber > 0) {
    const b = columnNumber % cont || cont;
    result = String.fromCharCode(charA + b - 1) + result;
    columnNumber = (columnNumber - b) / cont;
  }
  return result;
}
//leetcode submit region end(Prohibit modification and deletion)
// console.log(convertToTitle(2147483647) === "FXSHRXW");
// console.log(convertToTitle(701) === "ZY");
// console.log(convertToTitle(28) === "AB");
// console.log("A".charCodeAt(0));
// console.log("Z".charCodeAt(0));
