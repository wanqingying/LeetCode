// 交错字符串
//给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。
//
// 两个字符串 s 和 t 交错 的定义与过程如下，其中每个字符串都会被分割成若干 非空 子字符串：
//
//
// s = s1 + s2 + ... + sn
// t = t1 + t2 + ... + tm
// |n - m| <= 1
// 交错 是 s1 + t1 + s2 + t2 + s3 + t3 + ... 或者 t1 + s1 + t2 + s2 + t3 + s3 + ...
//
//
// 注意：a + b 意味着字符串 a 和 b 连接。
//
//
//
// 示例 1：
//
//
//输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
//输出：true
//
//

//输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
//输出：fals
//
//输入：s1 = "aabbaaa", s2 = "aabbaaa", s3 = "aaababaaabbaaa"
//输出：fals
//
//
// 示例 3：
//
//
//输入：s1 = "", s2 = "", s3 = ""
//输出：true
//
//
//
//
// 提示：
//
//
// 0 <= s1.length, s2.length <= 100
// 0 <= s3.length <= 200
// s1、s2、和 s3 都由小写英文字母组成
//
//
//
//
// 进阶：您能否仅使用 O(s2.length) 额外的内存空间来解决它?
//
// Related Topics 字符串 动态规划 👍 784 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
/**
d[i][j] 表示s1[0,i]  s2[0,j] 能否组成s3[0,i+j]
 dik=d[ik][j]=1 在s1上寻找
 djk=d[i][jk]=1 在s2上寻找 
 且 d3=i+j+1
 d[i][j]=dik&&s1[k,i]===s3[d3-(i-k),d3] 或
 d[i][j]=djk&&s2[k,j]===s3[d3-(j-k),d3]
                                          0 1 2 3 4 5 6 7 8 9
 //输入：s1 = "aabcc", s2 = "dbbca", s3 = "a a d b b c b c a c"
 //输出：true
     0 1 2 3 4 i
     a a b c c
 0 d 0 1 1 0 0
 1 b 0 1 1 1 0
 2 b 0 1 0 1 1
 3 c 0 1 1 1 0
 4 a 0 0 0 1 1
 j 

 */
function isInterleave(s1: string, s2: string, s3: string): boolean {
  if (s1.length + s2.length !== s3.length) {
    return false;
  }
  const d: number[][] = new Array(s2.length + 1)
    .fill(1)
    .map(() => new Array(s1.length + 1).fill(0));

  d[0][0] = 1;
  for (let i = 1; i <= s2.length; i++) {
    d[i][0] = s2.substring(0, i) === s3.substring(0, i) ? 1 : 0;
  }
  for (let i = 1; i <= s1.length; i++) {
    d[0][i] = s1.substring(0, i) === s3.substring(0, i) ? 1 : 0;
  }
  debugger;

  for (let i = 1; i < s1.length + 1; i++) {
    for (let j = 1; j < s2.length + 1; j++) {
      const d3 = i + j;
      // dik判断
      function dik() {
        for (let ik = i - 1; ik >= 0; ik--) {
          if (d[j][ik] === 1) {
            return s1.substring(ik, i) === s3.substring(d3 - (i - ik), d3);
          }
        }
      }
      function djk() {
        for (let jk = j - 1; jk >= 0; jk--) {
          if (d[jk][i] === 1) {
            return s2.substring(jk, j) === s3.substring(d3 - (j - jk), d3);
          }
        }
      }
      if (s1[i - 1] === "b") {
        debugger;
      }
      if (dik() || djk()) {
        d[j][i] = 1;
      } else {
        debugger;
        d[j][i] = 0;
      }
    }
  }
  return d[s2.length][s1.length] === 1;
}

function test() {
  const json = [
    {
      p1: "aabbaaa",
      p2: "dbbca",
      p3: "aadbbcbcac",
      result: false,
    },
    {
      p1: "a",
      p2: "a",
      p3: "aa",
      result: true,
    },
    {
      p1: "ab",
      p2: "a",
      p3: "aba",
      result: true,
    },
    {
      p1: "ab",
      p2: "a",
      p3: "aab",
      result: true,
    },{
      p1: "ab",
      p2: "ba",
      p3: "abab",
      result: true,
    },
  ];

  json.forEach((j, idx) => {
    const res = isInterleave(j.p1, j.p2, j.p3);
    if (String(res) !== String(j.result)) {
      console.log(`参数:${JSON.stringify(j.p1)}`);
      console.log(
        `idx:${idx}，期望结果:${JSON.stringify(
          j.result
        )}，测试结果:${JSON.stringify(res)}`
      );
    } else {
      console.log(`pass ${idx}`);
    }
  });
}
// test();
// console.log(isInterleave("aabbaaa", "dbbca", "aadbbcbcac"));

//输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
//输出：fals
//
//输入：s1 = "aabbaaa", s2 = "aabbaaa", s3 = "aaababaaabbaaa"
//输出：fals
//输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
//输出：true
//
//leetcode submit region end(Prohibit modification and deletion)
