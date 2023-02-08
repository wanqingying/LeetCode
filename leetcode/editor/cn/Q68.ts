// 文本左右对齐
//给定一个单词数组 words 和一个长度 maxWidth ，重新排版单词，使其成为每行恰好有 maxWidth 个字符，且左右两端对齐的文本。
//
// 你应该使用 “贪心算法” 来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 ' ' 填充，使得每行恰好有 maxWidth 个字符。
//
//
// 要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。
//
// 文本的最后一行应为左对齐，且单词之间不插入额外的空格。
//
// 注意:
//
//
// 单词是指由非空格字符组成的字符序列。
// 每个单词的长度大于 0，小于等于 maxWidth。
// 输入单词数组 words 至少包含一个单词。
//
//
//
//
// 示例 1:
//
//
//输入: words = ["This", "is", "an", "example", "of", "text", "justification."],
//maxWidth = 16
//输出:
//[
// "This  is  an ",
// "example of text",
// "justification. "
//]
//
//
// 示例 2:
//
//
//输入:words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
//输出:
//[
//"What  must  be",
//"acknowledgment ",
//"shall be    "
//]
//解释: 注意最后一行的格式应为 "shall be    " 而不是 "shall     be",
//    因为最后一行应为左对齐，而不是左右两端对齐。
//     第二行同样为左对齐，这是因为这行只包含一个单词。
//
//
// 示例 3:
//
//
//输入:words = ["Science","is","what","we","understand","well","enough","to",
//"explain","to","a","computer.","Art","is","everything","else","we","do"]，maxWidth = 2
//0
//输出:
//[
//  "Science  is  what we",
//  "understand      well",
//  "enough to explain to",
//  "a  computer.  Art is",
//  "everything  else  we",
//  "do                  "
//]
//
//
//
//
// 提示:
//
//
// 1 <= words.length <= 300
// 1 <= words[i].length <= 20
// words[i] 由小写英文字母和符号组成
// 1 <= maxWidth <= 100
// words[i].length <= maxWidth
//
// Related Topics 数组 字符串 模拟 👍 290 👎 0

// const b=["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a",]

//leetcode submit region begin(Prohibit modification and deletion)
function fullJustify(words: string[], maxWidth: number): string[] {
  //输入: words = ["a","aaa","aa","a","a","a","aaa","a","a","a","a","a","a","a","a"],
  //maxWidth = 16
  //输出:
  //[
  // "This   is   an ",
  // "example of text",
  // "justification. "
  //]
  const result: string[] = [];

  function padding(rs: string[]) {
    if (rs.length) {
      const pad = rs.join(" ");
      result.push(pad + " ".repeat(maxWidth - pad.length));
    }
  }
  function join(rs: string[]) {
    if (words.length === 0) {
      // 最后一行
      padding(rs);
      return;
    }
    if (rs.length === 1) {
      // 只有一个单词
      result.push(rs[0] + " ".repeat(maxWidth - rs[0].length));
      return;
    }
    const s = rs.join(" ");
    const space = maxWidth - s.length;
    const extraSpace = Math.floor(space / (rs.length - 1));
    let leftSpace = space % (rs.length - 1);
    const rm = rs.map((r, idx) => {
      if (idx === rs.length - 1) {
        return r;
      }
      r = r + " ".repeat(extraSpace + 1);
      if (leftSpace > 0) {
        leftSpace--;
        r = r + " ";
      }
      return r;
    });
    result.push(rm.join(""));
  }

  // 单词总长度
  let x = 0;
  // 积累的单词
  let rs: string[] = [];
  while (words.length) {
    const top = words[0];

    if (x + top.length + rs.length <= maxWidth) {
      rs.push(words.shift());
      x += top.length;
      // continue;
    } else {
      join(rs);
      rs = [];
      x = 0;
    }

    //最后一行
    //只有一个单词
    //一般情况
  }

  padding(rs);

  return result;
}

// function test() {
//   const json = [
//     {
//       p1: ["a", "aaa", "aa", "a", "aaa", "a"],
//       p2: 4,
//       result: ["a   ", "aaa ", "aa a", "aaa ", "a   "],
//     },
//     {
//       p1: [
//         "a",
//         "aaa",
//         "aa",
//         "a",
//         "a",
//         "a",
//         "aaa",
//         "a",
//         "a",
//         "a",
//         "a",
//         "a",
//         "a",
//         "a",
//         "a",
//       ],
//       p2: 4,
//       result: [
//         "a   ",
//         "aaa ",
//         "aa a",
//         "a  a",
//         "aaa ",
//         "a  a",
//         "a  a",
//         "a  a",
//         "a a ",
//       ],
//     },
//     {
//       p1: ["What", "must", "be", "acknowledgment", "shall", "be"],
//       p2: 16,
//       result: ["What   must   be", "acknowledgment  ", "shall be        "],
//     },
//     {
//       p1: ["aa", "a", "a", "a", "aaa", "aaaa", "aa", "aaa"],
//       p2: 5,
//       result: ["aa  a", "a   a", "aaa  ", "aaaa ", "aa   ", "aaa  "],
//     },
//     {
//       p1: ["aa", "a", "a", "a", "aaa", "aaaa", "aa", "aaa"],
//       p2: 8,
//       result: ["aa a a a", "aaa aaaa", "aa aaa  "],
//     },
//     {
//       p1: ["a", "aaa", "aa", "aa", "aaa", "a", "aaaa", "aa", "aaa", "aa"],
//       p2: 12,
//       result: ["a  aaa aa aa", "aaa  a  aaaa", "aa aaa aa   "],
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = fullJustify(j.p1, j.p2);
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
