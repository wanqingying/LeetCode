// 单词接龙 II
//按字典 wordList 完成从单词 beginWord 到单词 endWord 转化，一个表示此过程的 转换序列 是形式上像 beginWord ->
//s1 -> s2 -> ... -> sk 这样的单词序列，并满足：
//
//
//
//
// 每对相邻的单词之间仅有单个字母不同。
// 转换过程中的每个单词 si（1 <= i <= k）必须是字典 wordList 中的单词。注意，beginWord 不必是字典 wordList 中的单
//词。
// sk == endWord
//
//
//
//
// 给你两个单词 beginWord 和 endWord ，以及一个字典 wordList 。请你找出并返回所有从 beginWord 到 endWord 的
// 最短转换序列 ，如果不存在这样的转换序列，返回一个空列表。每个序列都应该以单词列表 [beginWord, s1, s2, ..., sk] 的形式返回。
//
//
//
// 示例 1：
//
//
//输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot",
//"log","cog"]
//输出：[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
//解释：存在 2 种最短的转换序列：
//"hit" -> "hot" -> "dot" -> "dog" -> "cog"
//"hit" -> "hot" -> "lot" -> "log" -> "cog"
//
//
// 示例 2：
//
//
//输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot",
//"log"]
//输出：[]
//解释：endWord "cog" 不在字典 wordList 中，所以不存在符合要求的转换序列。
//
//
//
//
// 提示：
//
//
// 1 <= beginWord.length <= 5
// endWord.length == beginWord.length
// 1 <= wordList.length <= 500
// wordList[i].length == beginWord.length
// beginWord、endWord 和 wordList[i] 由小写英文字母组成
// beginWord != endWord
// wordList 中的所有单词 互不相同
//
//
// Related Topics 广度优先搜索 哈希表 字符串 回溯 👍 624 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
interface GxNode {
  val: string;
  step: number;
  arrive: string[];
}
function findLadders(
  beginWord: string,
  endWord: string,
  wordList: string[]
): string[][] {
  const result: string[][] = [];
  const g: Map<string, GxNode> = new Map();
  const wds = [beginWord, ...wordList];
  for (let i = 0; i < wds.length; i++) {
    g.set(wds[i], {
      val: wds[i],
      step: 100000,
      arrive: [],
    });
  }
  const codes = ["a".charCodeAt(0)];
  for (let i = 1; i < 26; i++) {
    codes.push(codes[0] + i);
  }
  g.get(beginWord).step = 0;
  const stack: GxNode[] = [g.get(beginWord)];

  let sl = 0;
  while (stack.length) {
    sl++;
    const gn = stack.shift();
    const wd = gn.val;
    if (gn.val === endWord) continue;

    for (let i = 0; i < wd.length; i++) {
      for (let j = 0; j < codes.length; j++) {
        const wdi =
          wd.substring(0, i) +
          String.fromCharCode(codes[j]) +
          wd.substring(i + 1);
        const gi = g.get(wdi);
        if (!gi) continue;
        if (gi.step < gn.step + 1) continue;

        if (gi.step === gn.step + 1) {
          gi.arrive.push(gn.val);
          continue;
        }
        if (gi.step > gn.step + 1) {
          gi.step = gn.step + 1;
          gi.arrive = [gn.val];
          stack.push(gi);
        }
      }
    }
  }

  function reach(wd: string, path: string[]) {
    const gi = g.get(wd);
    if (!gi) return;
    if (gi.val === beginWord) {
      return result.push([beginWord, ...path]);
    }

    gi.arrive.forEach((t) => {
      const gii = g.get(t);
      reach(gii.val, [gi.val, ...path]);
    });
  }
  reach(endWord, []);
  return result;
  // const reu = result.map((r) => r.join("_"));
  // return result.filter((r, idx) => reu.indexOf(r.join("_")) === idx);
}

//输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
//输出：[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
//解释：存在 2 种最短的转换序列：
//"hit" -> "hot" -> "dot" -> "dog" -> "cog"
//"hit" -> "hot" -> "lot" -> "log" -> "cog"
//leetcode submit region end(Prohibit modification and deletion)

function test() {
  const jsonList = [
    // xx
    {
      //xx
      p1: "hit",
      p2: "cog",
      p3: ["hot", "dot", "dog", "lot", "log", "cog"],
      ans: [
        ["hit", "hot", "dot", "dog", "cog"],
        ["hit", "hot", "lot", "log", "cog"],
      ],
    },
    {
      //xx
      p1: "hit",
      p2: "cog",
      p3: ["hot", "dot", "dog", "lot", "log"],
      ans: [],
    },
    {
      //xx
      p1: "red",
      p2: "tax",
      p3: ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"],
      ans: [
        ["red", "ted", "tad", "tax"],
        ["red", "ted", "tex", "tax"],
        ["red", "rex", "tex", "tax"],
      ],
    },
    {
      //xx
      p1: "aaaaa",
      p2: "ggggg",
      p3: [
        "aaaaa",
        "caaaa",
        "cbaaa",
        "daaaa",
        "dbaaa",
        "eaaaa",
        "ebaaa",
        "faaaa",
        "fbaaa",
        "gaaaa",
        "gbaaa",
        "haaaa",
        "hbaaa",
        "iaaaa",
        "ibaaa",
        "jaaaa",
        "jbaaa",
        "kaaaa",
        "kbaaa",
        "laaaa",
        "lbaaa",
        "maaaa",
        "mbaaa",
        "naaaa",
        "nbaaa",
        "oaaaa",
        "obaaa",
        "paaaa",
        "pbaaa",
        "bbaaa",
        "bbcaa",
        "bbcba",
        "bbdaa",
        "bbdba",
        "bbeaa",
        "bbeba",
        "bbfaa",
        "bbfba",
        "bbgaa",
        "bbgba",
        "bbhaa",
        "bbhba",
        "bbiaa",
        "bbiba",
        "bbjaa",
        "bbjba",
        "bbkaa",
        "bbkba",
        "bblaa",
        "bblba",
        "bbmaa",
        "bbmba",
        "bbnaa",
        "bbnba",
        "bboaa",
        "bboba",
        "bbpaa",
        "bbpba",
        "bbbba",
        "abbba",
        "acbba",
        "dbbba",
        "dcbba",
        "ebbba",
        "ecbba",
        "fbbba",
        "fcbba",
        "gbbba",
        "gcbba",
        "hbbba",
        "hcbba",
        "ibbba",
        "icbba",
        "jbbba",
        "jcbba",
        "kbbba",
        "kcbba",
        "lbbba",
        "lcbba",
        "mbbba",
        "mcbba",
        "nbbba",
        "ncbba",
        "obbba",
        "ocbba",
        "pbbba",
        "pcbba",
        "ccbba",
        "ccaba",
        "ccaca",
        "ccdba",
        "ccdca",
        "cceba",
        "cceca",
        "ccfba",
        "ccfca",
        "ccgba",
        "ccgca",
        "cchba",
        "cchca",
        "cciba",
        "ccica",
        "ccjba",
        "ccjca",
        "cckba",
        "cckca",
        "cclba",
        "cclca",
        "ccmba",
        "ccmca",
        "ccnba",
        "ccnca",
        "ccoba",
        "ccoca",
        "ccpba",
        "ccpca",
        "cccca",
        "accca",
        "adcca",
        "bccca",
        "bdcca",
        "eccca",
        "edcca",
        "fccca",
        "fdcca",
        "gccca",
        "gdcca",
        "hccca",
        "hdcca",
        "iccca",
        "idcca",
        "jccca",
        "jdcca",
        "kccca",
        "kdcca",
        "lccca",
        "ldcca",
        "mccca",
        "mdcca",
        "nccca",
        "ndcca",
        "occca",
        "odcca",
        "pccca",
        "pdcca",
        "ddcca",
        "ddaca",
        "ddada",
        "ddbca",
        "ddbda",
        "ddeca",
        "ddeda",
        "ddfca",
        "ddfda",
        "ddgca",
        "ddgda",
        "ddhca",
        "ddhda",
        "ddica",
        "ddida",
        "ddjca",
        "ddjda",
        "ddkca",
        "ddkda",
        "ddlca",
        "ddlda",
        "ddmca",
        "ddmda",
        "ddnca",
        "ddnda",
        "ddoca",
        "ddoda",
        "ddpca",
        "ddpda",
        "dddda",
        "addda",
        "aedda",
        "bddda",
        "bedda",
        "cddda",
        "cedda",
        "fddda",
        "fedda",
        "gddda",
        "gedda",
        "hddda",
        "hedda",
        "iddda",
        "iedda",
        "jddda",
        "jedda",
        "kddda",
        "kedda",
        "lddda",
        "ledda",
        "mddda",
        "medda",
        "nddda",
        "nedda",
        "oddda",
        "oedda",
        "pddda",
        "pedda",
        "eedda",
        "eeada",
        "eeaea",
        "eebda",
        "eebea",
        "eecda",
        "eecea",
        "eefda",
        "eefea",
        "eegda",
        "eegea",
        "eehda",
        "eehea",
        "eeida",
        "eeiea",
        "eejda",
        "eejea",
        "eekda",
        "eekea",
        "eelda",
        "eelea",
        "eemda",
        "eemea",
        "eenda",
        "eenea",
        "eeoda",
        "eeoea",
        "eepda",
        "eepea",
        "eeeea",
        "ggggg",
        "agggg",
        "ahggg",
        "bgggg",
        "bhggg",
        "cgggg",
        "chggg",
        "dgggg",
        "dhggg",
        "egggg",
        "ehggg",
        "fgggg",
        "fhggg",
        "igggg",
        "ihggg",
        "jgggg",
        "jhggg",
        "kgggg",
        "khggg",
        "lgggg",
        "lhggg",
        "mgggg",
        "mhggg",
        "ngggg",
        "nhggg",
        "ogggg",
        "ohggg",
        "pgggg",
        "phggg",
        "hhggg",
        "hhagg",
        "hhahg",
        "hhbgg",
        "hhbhg",
        "hhcgg",
        "hhchg",
        "hhdgg",
        "hhdhg",
        "hhegg",
        "hhehg",
        "hhfgg",
        "hhfhg",
        "hhigg",
        "hhihg",
        "hhjgg",
        "hhjhg",
        "hhkgg",
        "hhkhg",
        "hhlgg",
        "hhlhg",
        "hhmgg",
        "hhmhg",
        "hhngg",
        "hhnhg",
        "hhogg",
        "hhohg",
        "hhpgg",
        "hhphg",
        "hhhhg",
        "ahhhg",
        "aihhg",
        "bhhhg",
        "bihhg",
        "chhhg",
        "cihhg",
        "dhhhg",
        "dihhg",
        "ehhhg",
        "eihhg",
        "fhhhg",
        "fihhg",
        "ghhhg",
        "gihhg",
        "jhhhg",
        "jihhg",
        "khhhg",
        "kihhg",
        "lhhhg",
        "lihhg",
        "mhhhg",
        "mihhg",
        "nhhhg",
        "nihhg",
        "ohhhg",
        "oihhg",
        "phhhg",
        "pihhg",
        "iihhg",
        "iiahg",
        "iiaig",
        "iibhg",
        "iibig",
        "iichg",
        "iicig",
        "iidhg",
        "iidig",
        "iiehg",
        "iieig",
        "iifhg",
        "iifig",
        "iighg",
        "iigig",
        "iijhg",
        "iijig",
        "iikhg",
        "iikig",
        "iilhg",
        "iilig",
        "iimhg",
        "iimig",
        "iinhg",
        "iinig",
        "iiohg",
        "iioig",
        "iiphg",
        "iipig",
        "iiiig",
        "aiiig",
        "ajiig",
        "biiig",
        "bjiig",
        "ciiig",
        "cjiig",
        "diiig",
        "djiig",
        "eiiig",
        "ejiig",
        "fiiig",
        "fjiig",
        "giiig",
        "gjiig",
        "hiiig",
        "hjiig",
        "kiiig",
        "kjiig",
        "liiig",
        "ljiig",
        "miiig",
        "mjiig",
        "niiig",
        "njiig",
        "oiiig",
        "ojiig",
        "piiig",
        "pjiig",
        "jjiig",
        "jjaig",
        "jjajg",
        "jjbig",
        "jjbjg",
        "jjcig",
        "jjcjg",
        "jjdig",
        "jjdjg",
        "jjeig",
        "jjejg",
        "jjfig",
        "jjfjg",
        "jjgig",
        "jjgjg",
        "jjhig",
        "jjhjg",
        "jjkig",
        "jjkjg",
        "jjlig",
        "jjljg",
        "jjmig",
        "jjmjg",
        "jjnig",
        "jjnjg",
        "jjoig",
        "jjojg",
        "jjpig",
        "jjpjg",
        "jjjjg",
        "ajjjg",
        "akjjg",
        "bjjjg",
        "bkjjg",
        "cjjjg",
        "ckjjg",
        "djjjg",
        "dkjjg",
        "ejjjg",
        "ekjjg",
        "fjjjg",
        "fkjjg",
        "gjjjg",
        "gkjjg",
        "hjjjg",
        "hkjjg",
        "ijjjg",
        "ikjjg",
        "ljjjg",
        "lkjjg",
        "mjjjg",
        "mkjjg",
        "njjjg",
        "nkjjg",
        "ojjjg",
        "okjjg",
        "pjjjg",
        "pkjjg",
        "kkjjg",
        "kkajg",
        "kkakg",
        "kkbjg",
        "kkbkg",
        "kkcjg",
        "kkckg",
        "kkdjg",
        "kkdkg",
        "kkejg",
        "kkekg",
        "kkfjg",
        "kkfkg",
        "kkgjg",
        "kkgkg",
        "kkhjg",
        "kkhkg",
        "kkijg",
        "kkikg",
        "kkljg",
        "kklkg",
        "kkmjg",
        "kkmkg",
        "kknjg",
        "kknkg",
        "kkojg",
        "kkokg",
        "kkpjg",
        "kkpkg",
        "kkkkg",
        "ggggx",
        "gggxx",
        "ggxxx",
        "gxxxx",
        "xxxxx",
        "xxxxy",
        "xxxyy",
        "xxyyy",
        "xyyyy",
        "yyyyy",
        "yyyyw",
        "yyyww",
        "yywww",
        "ywwww",
        "wwwww",
        "wwvww",
        "wvvww",
        "vvvww",
        "vvvwz",
        "avvwz",
        "aavwz",
        "aaawz",
        "aaaaz",
      ],
      ans: [
        [
          "aaaaa",
          "aaaaz",
          "aaawz",
          "aavwz",
          "avvwz",
          "vvvwz",
          "vvvww",
          "wvvww",
          "wwvww",
          "wwwww",
          "ywwww",
          "yywww",
          "yyyww",
          "yyyyw",
          "yyyyy",
          "xyyyy",
          "xxyyy",
          "xxxyy",
          "xxxxy",
          "xxxxx",
          "gxxxx",
          "ggxxx",
          "gggxx",
          "ggggx",
          "ggggg",
        ],
      ],
    },
  ];
  jsonList.forEach((j, idx) => {
    let res: any = findLadders(j.p1, j.p2, j.p3);
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
}

// test();

// const r = findLadders("aaaaa", "ggggg", str);
// console.log("rr", r);
