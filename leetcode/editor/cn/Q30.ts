// 串联所有单词的子串
//给定一个字符串 s 和一些 长度相同 的单词 words 。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。
//
// 注意子串要与 words 中的单词完全匹配，中间不能有其他字符 ，但不需要考虑 words 中单词串联的顺序。
//
//
//
// 示例 1：
//
//
//输入：s = "barfoothefoobarman", words = ["foo","bar"]
//输出：[0,9]
//解释：
//从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
//输出的顺序不重要, [9,0] 也是有效答案。
//
//
// 示例 2：
//
//
//输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
//输出：[]
//
//
// 示例 3：
//
//
//输入：s = "barfoofoobarthefoobarbanbar", words = ["bar","foo","the","ban","ba"]
//输出：[6,9,12]
//
//
//
//
// 提示：
//
//
// 1 <= s.length <= 10⁴
// s 由小写英文字母组成
// 1 <= words.length <= 5000
// 1 <= words[i].length <= 30
// words[i] 由小写英文字母组成
//
// Related Topics 哈希表 字符串 滑动窗口 👍 787 👎 0
//12345
//leetcode submit region begin(Prohibit modification and deletion)
function findSubstring(s: string, words: string[]): number[] {
  const step = words[0].length;
  const cont = words.length;
  const wLen = step * cont;
  const result: number[] = [];

  function isValid(map: Map<string, number>) {
    return Array.from(map.values()).every((t) => t === 0);
  }

  function findWindow(start: number) {

    if (start + wLen > s.length) {
      return;
    }

    const map = new Map<string, number>();
    for (let i = 0, si = start; i < cont; i++, si += step) {
      const wi = words[i];
      const wsi = s.substring(si, si + step);

      const wic = map.get(wi) || 0;
      map.set(wi, wic + 1);

      const wsic = map.get(wsi) || 0;
      map.set(wsi, wsic - 1);
    }
    // console.log("ox");
    for (
      let left = start, right = start + wLen - 1;
      right < s.length;
      left += step, right += step
    ) {
      if (isValid(map)) {
        result.push(left);
      }
      const leftWord = s.substring(left, left + step);
      const rightWord = s.substring(right + 1, right + step + 1);
      map.set(leftWord, (map.get(leftWord) || 0) + 1);
      map.set(rightWord, (map.get(rightWord) || 0) - 1);
      // console.log('x')
    }
  }

  for (let i = 0; i < step; i++) {
    findWindow(i);
  }
  return result;
}
//
// function test() {
//   const json = [
//     {
//       s: "barfoofoobarthefoobarbanbar",
//       words: ["bar", "foo", "the"],
//       result: [6, 9, 12],
//     },
//     {
//       s: "barfoothefoobarman",
//       words: ["bar", "foo"],
//       result: [0, 9],
//     },
//     {
//       s: "aaaaa",
//       words: ["a", "a"],
//       result: [0, 1, 2, 3],
//     },
//     {
//       s: "aaaabaaa",
//       words: ["a", "a", "b"],
//       result: [2, 3, 4],
//     },
//     {
//       s: "a",
//       words: ["a"],
//       result: [0],
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = findSubstring(j.s, j.words);
//     if (String(res) !== String(j.result)) {
//       console.log(`idx:${idx}，期望结果:${j.result}，测试结果:${res}`);
//     } else {
//       console.log(`pass ${idx}`);
//     }
//   });
// }
// test();

/**
 * 判断ws中的全部字符串能否全部组合成s
 * s="barthebanba"
 * ws=["ban", "bar","ba", "the"]
 *
 * s="barban"
 * ws=["ban", "bai"]
 *
 */

//leetcode submit region end(Prohibit modification and deletion)
