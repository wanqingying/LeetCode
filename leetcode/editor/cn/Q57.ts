// 插入区间
//给你一个 无重叠的 ，按照区间起始端点排序的区间列表。
//
// 在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。
//
//
//
// 示例 1：
//
//
//输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
//输出：[[1,5],[6,9]]
//
//
// 示例 2：
//
//
//输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
//输出：[[1,2],[3,10],[12,16]]
//解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
//
// 示例 3：
//
//
//输入：intervals = [], newInterval = [5,7]
//输出：[[5,7]]
//
//
// 示例 4：
//
//
//输入：intervals = [[1,5]], newInterval = [2,3]
//输出：[[1,5]]
//
//
// 示例 5：
//
//
//输入：intervals = [[1,5]], newInterval = [2,7]
//输出：[[1,7]]
//
//
//
//
// 提示：
//
//
// 0 <= intervals.length <= 10⁴
// intervals[i].length == 2
// 0 <= intervals[i][0] <= intervals[i][1] <= 10⁵
// intervals 根据 intervals[i][0] 按 升序 排列
// newInterval.length == 2
// 0 <= newInterval[0] <= newInterval[1] <= 10⁵
//
// Related Topics 数组 👍 621 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function insert(intervals: number[][], newInterval: number[]): number[][] {
  let result: number[][] = [];

  function merge(p: number[], vi: number[]): any[] {
    const [pa, pb] = p;
    const [va, vb] = vi;

    if (pb < va) {
      return ["left", p, vi];
    }
    if (vb < pa) {
      return ["right", vi, p];
    }
    return ["merge", [Math.min(pa, va), Math.max(pb, vb)]];
  }
  let p = newInterval;
  for (let i = 0; i < intervals.length; i++) {
    if (!p){
      result.push(intervals[i]);
      continue;
    }
    const [m, left, right] = merge(p, intervals[i]);
    if (m === "left") {
      result.push(left);
      result.push(right);
      p=null
      continue
    }
    if (m === "right") {
      result.push(left);
      p = right;
    }
    if (m === "merge") {
      p = left;
    }
  }
  if (p){
    result.push(p)
  }

  return result;
}
//
// function test() {
//   const json = [
//     {
//       p1: [
//         [1, 2],
//         [3, 5],
//         [6, 7],
//         [8, 10],
//         [12, 16],
//       ],
//       p2: [4, 8],
//       result: [
//         [1, 2],
//         [3, 10],
//         [12, 16],
//       ],
//     },
//     {
//       p1: [
//         [1, 3],
//         [6, 9],
//       ],
//       p2: [2, 5],
//       result: [
//         [1, 5],
//         [6, 9],
//       ],
//     },
//     {
//       p1: [[6, 7]],
//       p2: [2, 5],
//       result: [
//         [2, 5],
//         [6, 7],
//       ],
//     },
//     {
//       p1: [[6, 7]],
//       p2: [2, 6],
//       result: [[2, 7]],
//     },
//     {
//       p1: [
//         [2, 6],
//         [8, 9],
//       ],
//       p2: [7, 7],
//       result: [
//         [2, 6],
//         [7, 7],
//         [8, 9],
//       ],
//     },
//     {
//       p1: [
//         [2, 6],
//         [8, 8],
//       ],
//       p2: [7, 8],
//       result: [
//         [2, 6],
//         [7, 8],
//       ],
//     },
//     {
//       p1: [
//         [2, 6],
//         [8, 8],
//       ],
//       p2: [0, 44],
//       result: [[0, 44]],
//     },
//     {
//       p1: [
//         [2, 4],
//         [6,9],
//       ],
//       p2: [0,0],
//       result: [[0,0],[2,4],[6,9]],
//     },
//     {
//       p1: [
//         [1, 4],
//         [9, 12],
//         [19, 22],
//       ],
//       p2: [7, 13],
//       result: [
//         [1, 4],
//         [7, 13],
//         [19, 22],
//       ],
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     const res = insert(j.p1, j.p2);
//     if (String(res) !== String(j.result)) {
//       console.log(`参数:${JSON.stringify(j.p1)},${JSON.stringify(j.p2)}`)
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
