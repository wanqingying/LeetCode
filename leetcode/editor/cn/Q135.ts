// 分发糖果
//n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
//
// 你需要按照以下要求，给这些孩子分发糖果：
//
//
// 每个孩子至少分配到 1 个糖果。
// 相邻两个孩子评分更高的孩子会获得更多的糖果。
//
//
// 请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。
//
//
//
// 示例 1：
//
//
//输入：ratings = [1,0,2]
//输出：5
//解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
//
//
// 示例 2：
//
//
//输入：ratings = [1,2,2]
//输出：4
//解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
//     第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
//
//
//
// 提示：
//
//
// n == ratings.length
// 1 <= n <= 2 * 10⁴
// 0 <= ratings[i] <= 2 * 10⁴
//
//
// Related Topics 贪心 数组 👍 1057 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function candy(ratings: number[]): number {
  let rLeft = new Array(ratings.length).fill(1);
  let rRight = new Array(ratings.length).fill(1);

  let rpi = ratings[0];
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > rpi) rLeft[i] = rLeft[i - 1] + 1;
    rpi = ratings[i];
  }
  rpi = ratings[ratings.length - 1];
  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > rpi) rRight[i] = rRight[i + 1] + 1;
    rpi = ratings[i];
  }
  let result = 0;
  for (let i = 0; i < ratings.length; i++) {
    result += Math.max(rLeft[i], rRight[i]);
  }

  return result;
}
//leetcode submit region end(Prohibit modification and deletion)

function test() {
  const jsonList = [
    {
      p1: [13],
      ans: 1,
    },
    {
      p1: [13, 13],
      ans: 2,
    },
    {
      p1: [1, 2],
      ans: 3,
    },
    {
      p1: [2, 0, 5, 3, 4, 5, 2, 2, 3],
      ans: 15,
    },
    {
      p1: [
        2, 0, 5, 3, 4, 5, 2, 2, 3, 1, 8, 5, 3, 5, 6, 6, 6, 6, 4, 2, 3, 4, 5, 9,
        3, 3, 4, 4, 4, 5, 7, 8, 8, 9, 3,
      ],
      //  p1: [ 1, 1, 2, 1, 2, 3, 1, 1, 2, 1, 2, 1, 1, 2, 3, 1, 1, 1, 1, 1, 2, 3, 4, 5, 1, 1, 2, 1, 1, 2, 3, 4, 1, 2, 1,],
      //  p1: [ 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 3, 2, 1, 1, 1, 1, 1, 3, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,],
      //  p1: [ 2, 1, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2, 3, 1, 1, 3, 2, 1, 2, 3, 4, 5, 1, 1, 2, 1, 1, 2, 3, 4, 1, 2, 1,],
      ans: 68,
    },
    {
      p1: [3, 5, 6, 6, 6, 6, 4, 2, 3, 4, 5, 9, 3],
      //  [3, 5, 6, 6, 6, 6, 4, 1, 2, 3, 5, 9, 3]
      ans: 29,
    },
    {
      p1: [5, 6, 6, 6, 6, 4],
      //  [1, 2, 1, 1, 2, 1]
      ans: 8,
    },
  ];
  const t = Date.now();
  jsonList.forEach((j, idx) => {
    let res: any = candy(j.p1);
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

// test();
