// 单词拆分 II
//给定一个字符串 s 和一个字符串字典
// wordDict ，在字符串
// s 中增加空格来构建一个句子，使得句子中所有的单词都在词典中。以任意顺序 返回所有这些可能的句子。
//
// 注意：词典中的同一个单词可能在分段中被重复使用多次。
//
//
//
// 示例 1：
//
//
//输入:s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
//输出:["cats and dog","cat sand dog"]
//
//
// 示例 2：
//
//
//输入:s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
//输出:["pine apple pen apple","pineapple pen apple","pine applepen apple"]
//解释: 注意你可以重复使用字典中的单词。
//
//
// 示例 3：
//
//
//输入:s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
//输出:[]
//
//
//
//
// 提示：
//
//
//
//
//
// 1 <= s.length <= 20
// 1 <= wordDict.length <= 1000
// 1 <= wordDict[i].length <= 10
// s 和 wordDict[i] 仅有小写英文字母组成
// wordDict 中所有字符串都 不同
//
//
// Related Topics 字典树 记忆化搜索 哈希表 字符串 动态规划 回溯 👍 663 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function wordBreak(s: string, wordDict: string[]): string[] {
  const dict = new Map<string, boolean>();
  wordDict.forEach((d) => dict.set(d, true));
  const result: string[] = [];
  const dpx: number[][] = new Array(s.length + 1);
  // 空字符
  dpx[0] = [0];

  // i-前i个字符
  for (let i = 1; i <= s.length; i++) {
    dpx[i] = [];
    for (let j = 0; j < i; j++) {
      if (dpx[j].length && dict.has(s.substring(j, i))) {
        dpx[i].push(j);
      }
    }
  }
  function push(path: number[]) {
    let str = "";
    for (let i = 1; i < path.length; i++) {
      str += s.substring(path[i - 1], path[i]) + " ";
    }
    result.unshift(str.trim());
  }

  function dxi(di: number, path: number[]) {
    if (di === 0) return push([0, ...path]);
    const dx = dpx[di];
    for (let i = 0; i < dx.length; i++) {
      dxi(dx[i], [di, ...path]);
    }
  }
  dxi(dpx.length - 1, []);

  return result;
}
//leetcode submit region end(Prohibit modification and deletion)

function test() {
  const jsonList = [
    {
      p1: "pineapplepenapple",
      p2: ["apple", "pen", "applepen", "pine", "pineapple"],
      ans: [
        "pine apple pen apple",
        "pineapple pen apple",
        "pine applepen apple",
      ],
    },
    //输入:s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
    //输出:["cats and dog","cat sand dog"]
    {
      p1: "catsanddog",
      p2: ["cat", "cats", "and", "sand", "dog"],
      ans: ["cats and dog", "cat sand dog"],
    },
    //输入:s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
    //输出:[]
    {
      p1: "catsandog",
      p2: ["cats","dog","sand","and","cat"],
      ans: [],
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
