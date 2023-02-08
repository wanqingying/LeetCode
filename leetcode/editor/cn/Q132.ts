// 分割回文串 II
//给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文。
//
// 返回符合要求的 最少分割次数 。
//
//
//
//
//
//
//
// 示例 1：
//
//
//输入：s = "aab"
//输出：1
//解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
//
//
// 示例 2：
//
//
//输入：s = "a"
//输出：0
//
//
// 示例 3：
//
//
//输入：s = "ab"
//输出：1
//
//
//
//
// 提示：
//
//
// 1 <= s.length <= 2000
// s 仅由小写英文字母组成
//
//
// Related Topics 字符串 动态规划 👍 635 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function minCut(s: string): number {
  // u[i][j] 表示s[i,j] 是否回文字符串
  const u: any[][] = new Array(s.length)
    .fill(1)
    .map(() => new Array(s.length).fill(-1));

  function ga(left: number, right: number): boolean {
    if (left >= right) {
      return true;
    }
    if (left < right - 2) {
      const ua = u[left + 1][right - 1];
      if (typeof ua === "boolean") {
        return ua && s[left] === s[right];
      }
    }

    return ga(left + 1, right - 1) && s[left] === s[right];
  }

  for (let i = s.length - 1; i >= 0; i--) {
    u[i][i] = true;
    for (let j = i; j < s.length; j++) {
      u[i][j] = ga(i, j);
    }
  }
  // u.forEach((ui) => console.log(ui.join(",")));
  // console.log("kk");
  // i  j->
  //    a  b  c  c  b
  // a  0  1  2  3  1
  // b     0  1  1  0
  // c        0  0  1
  // c           0  1
  // b              0

  // i  j->
  //    a  b  c  c  b
  // a  1  0  0  0  0
  // b     1  0  0  1
  // c        1  1  0
  // c           1  0
  // b              1
  // b

  // c a d b d a c c c
  // b[i][j]: 对于k->[i,j]  取最小值
  //  s[k,j]  是回文-> b[i,k]+1
  //  s[k,j]不是回文-> b[i,k]+(j-k)
  let mix = 0;
  const bs: number[] = new Array(s.length).fill(s.length);

  function beside(end: number): number {
    if (end <= 0) return 0;
    if (u[0][end]) return 0;
    mix++;
    let min = s.length + 10;
    for (let i = 1; i < end; i++) {
      if (u[i][end]) {
        min = Math.min((bs[i - 1] ?? 0) + 1, min);
      }
    }
    // 不存在回文 直接单字符进一位的情况
    min = Math.min(bs[end - 1] + 1, min);

    return min;
  }
  for (let i = 0; i < s.length; i++) {
    bs[i] = beside(i);
  }

  return bs[bs.length - 1];
}
//leetcode submit region end(Prohibit modification and deletion)

// function test() {
//   const jsonList = [
//     {
//       p1: "a",
//       ans: 0,
//     },
//     {
//       p1: "aaaa",
//       ans: 0,
//     },
//     {
//       p1: "aaaaaaaaaaaaa",
//       ans: 0,
//     },
//     {
//       p1: "aaaaaabaaaabaaa",
//       ans: 1,
//     },
//     {
//       p1: "aaaaaaaaaaaaabbaaaaaaaaaaaaa",
//       ans: 0,
//     },
//     {
//       p1: "aab",
//       ans: 1,
//     },
//     {
//       p1: "abccb",
//       ans: 1,
//     },
//     {
//       p1: "abccaaac",
//       ans: 3,
//     },
//     {
//       p1: "abccac",
//       ans: 3,
//     },
//     {
//       p1: "abccaaaccba",
//       ans: 0,
//     },
//
//     {
//       p1: "fsfsfsfssfsfsssfsssffssfffs",
//       ans: 4,
//     },
//
//     {
//       p1: "fsfsfsfssfsfsssfsssffssfffsfffsfsfsfsffsfsfffssfdfffffsssfff",
//       ans: 10,
//     },
//     {
//       p1: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
//       ans: 0,
//     },
//     {
//       p1: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
//       ans: 1,
//     },
//     {
//       p1: "fiefhgdcdcgfeibggchibffahiededbbegegdfibdbfdadfbdbceaadeceeefiheibahgececggaehbdcgebaigfacifhdbecbebfhiefchaaheiichgdbheacfbhfiaffaecicbegdgeiaiccghggdfggbebdaefcagihbdhhigdgbghbahhhdagbdaefeccfiaifffcfehfcdiiieibadcedibbedgfegibefagfccahfcbegdfdhhdgfhgbchiaieehdgdabhidhfeecgfiibediiafacagigbhchcdhbaigdcedggehhgdhedaebchcafcdehcffdiagcafcgiidhdhedgaaegdchibhdaegdfdaiiidcihifbfidechicighbcbgibadbabieaafgeagfhebfaheaeeibagdfhadifafghbfihehgcgggffgbfccgafigieadfehieafaehaggeeaaaehggffccddchibegfhdfafhadgeieggiigacbfgcagigbhbhefcadafhafdiegahbhccidbeeagcgebehheebfaechceefdiafgeddhdfcadfdafbhiifigcbddahbabbeedidhaieagheihhgffbfbiacgdaifbedaegbhigghfeiahcdieghhdabdggfcgbafgibiifdeefcbegcfcdihaeacihgdchihdadifeifdgecbchgdgdcifedacfddhhbcagaicbebbiadgbddcbagbafeadhddaeebdgdebafabghcabdhdgieiahggddigefddccfccibifgbfcdccghgceigdfdbghdihechfabhbacifgbiiiihcgifhdbhfcaiefhccibebcahidachfabicbdabibiachahggffiibbgchbidfbbhfcicfafgcagaaadbacddfiigdiiffhbbehaaacidggfbhgeaghigihggfcdcidbfccahhgaffiibbhidhdacacdfebedbiacaidaachegffaiiegeabfdgdcgdacfcfhdcbfiaaifgfaciacfghagceaaebhhibbieehhcbiggabefbeigcbhbcidbfhfcgdddgdffghidbbbfbdhcgabaagddcebaechbbiegeiggbabdhgghciheabdibefdfghbfbfebidhicdhbeghebeddgfdfhefebiiebdchifbcbahaddhbfafbbcebiigadhgcfbebgbebhfddgdeehhgdegaeedfadegfeihcgeefbbagbbacbgggciehdhiggcgaaicceeaefgcehfhfdciaghcbbgdihbhecfbgffefhgiefgeiggcebgaacefidghdfdhiabgibchdicdehahbibeddegfciaeaffgbefbbeihbafbagagedgbdadfdggfeaebaidchgdbcifhahgfdcehbahhdggcdggceiabhhafghegfdiegbcadgaecdcdddfhicabdfhbdiiceiegiedecdifhbhhfhgdbhibbdgafhgdcheefdhifgddchadbdggiidhbhegbdfdidhhfbehibiaacdfbiagcbheabaaebfeaeafbgigiefeaeheabifgcfibiddadicheahgbfhbhddaheghddceedigddhchecaghdegigbegcbfgbggdgbbigegffhcfcbbebdchffhddbfhhfgegggibhafiebcfgeaeehgdgbccbfghagfdbdfcbcigbigaccecfehcffahiafgabfcaefbghccieehhhiighcfeabffggfchfdgcfhadgidabdceediefdccceidcfbfiiaidechhbhdccccaigeegcaicabbifigcghcefaafaefd",
//       ans: 1345,
//     },
//   ];
//   const t = Date.now();
//   jsonList.forEach((j, idx) => {
//     let res: any = minCut(j.p1);
//     if (JSON.stringify(res) !== JSON.stringify(j.ans)) {
//       console.log(
//         `idx:${idx}，期望结果:${JSON.stringify(
//           j.ans
//         )}，测试结果:${JSON.stringify(res)}`
//       );
//     } else {
//       console.log(`pass ${idx}`);
//     }
//   });
//   console.log("time : ", Date.now() - t);
// }

// test();
// console.log('fsfsfsfssfsfsssfsssffssfffsfffsfsfsfsffsfsfffssf'.length)
