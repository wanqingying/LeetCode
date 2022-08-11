// 螺旋矩阵 II
//给你一个正整数 n ，生成一个包含 1 到 n² 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
//
//
//
// 示例 1：
//
//
//输入：n = 3
//输出：
// [
// [1,2,3],
// [8,9,4],
// [7,6,5]
// ]
//
//
// 示例 2：
//
//
//输入：n = 1
//输出：[[1]]
//
//
//
//
// 提示：
//
//
// 1 <= n <= 20
//
// Related Topics 数组 矩阵 模拟 👍 780 👎 0
let b = [
  [1, 2, 3, 4, 5],
  [16, 17, 18, 19, 6],
  [15, 24, 25, 20, 7],
  [14, 23, 22, 21, 8],
  [13, 12, 11, 10, 9],
];

/**
 *
 *  1  2  3  4
 *
 *
 *
 *
 */

//leetcode submit region begin(Prohibit modification and deletion)
function generateMatrix(n: number): number[][] {
  const matrix: number[][] = new Array(n)
    .fill(1)
    .map((t) => new Array(n).fill(null));
  let ni = 1;
  // let layer = 1;
  let maxLayer = Math.ceil(n / 2);

  for (let lay = 0; lay < maxLayer; lay++) {
    for (let j = lay; j < n - lay; j++) {
      matrix[lay][j] = ni++;
    }
    for (let j = lay + 1; j < n - lay; j++) {
      matrix[j][n - lay - 1] = ni++;
    }
    for (let j = lay + 1; j < n - lay; j++) {
      matrix[n - lay - 1][n - j - 1] = ni++;
    }
    for (let j = lay + 1; j < n - lay - 1; j++) {
      matrix[n - 1 - j][lay] = ni++;
    }
  }

  return matrix;
}

//
function test() {
  const json = [
    {
      p1: 6,
      result: [
        [1, 2, 3, 4, 5],
        [16, 17, 18, 19, 6],
        [15, 24, 25, 20, 7],
        [14, 23, 22, 21, 8],
        [13, 12, 11, 10, 9],
      ],
    },
  ];

  json.forEach((j, idx) => {
    const res = generateMatrix(j.p1);
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
//leetcode submit region end(Prohibit modification and deletion)
