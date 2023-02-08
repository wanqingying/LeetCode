// 单词拆分
//给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
//
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
//
//
//
// 示例 1：
//
//
//输入: s = "leetcode", wordDict = ["leet", "code"]
//输出: true
//解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
//
//
// 示例 2：
//
//
//输入: s = "applepenapple", wordDict = ["apple", "pen"]
//输出: true
//解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
//     注意，你可以重复使用字典中的单词。
//
//
// 示例 3：
//
//
//输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
//输出: false
//
//
//
//
// 提示：
//
//
// 1 <= s.length <= 300
// 1 <= wordDict.length <= 1000
// 1 <= wordDict[i].length <= 20
// s 和 wordDict[i] 仅有小写英文字母组成
// wordDict 中的所有字符串 互不相同
//
//
// Related Topics 字典树 记忆化搜索 哈希表 字符串 动态规划 👍 1897 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function wordBreak(s: string, wordDict: string[]): boolean {
  const dict = wordDict.reduce((d, v) => {
    d.set(v, true);
    return d;
  }, new Map<string, boolean>());
  const dp: boolean[] = new Array(s.length + 1).fill(false);
  // 空字符
  dp[0] = true;

  // i-前i个字符
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && dict.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[dp.length - 1];
}

//leetcode submit region end(Prohibit modification and deletion)

function test() {
  const jsonList = [
    {
      p1: "leetcode",
      p2: ["leet", "code"],
      ans: true,
    },
    {
      p1: "aab",
      p2: ["a", "b"],
      ans: true,
    },
    {
      p1: "applepenapplepenpen",
      p2: ["apple", "pen"],
      ans: true,
    },
    {
      p1: "aaab",
      p2: ["a", "aa"],
      ans: false,
    },
    {
      p1: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      p2: [
        "a",
        "aa",
        "aaa",
        "aaaa",
        "aaaaa",
        "aaaaaa",
        "aaaaaaa",
        "aaaaaaaa",
        "aaaaaaaaa",
        "aaaaaaaaaab",
      ],
      ans: true,
    },
  ];
  const t = Date.now();
  jsonList.forEach((j, idx) => {
    let res: any = wordBreak(j.p1, j.p2);
    if (JSON.stringify(res) !== JSON.stringify(j.ans)) {
      console.log(
        `idx:${idx}，期望结果:${JSON.stringify(
          j.ans
        )}，测试结果:${JSON.stringify(res)}`
      );
    } else {
      console.log(`pass ${idx}`);
    }
  });
  console.log("time : ", Date.now() - t);
}

// console.log("abcd".substring(0, 3));

// test();
