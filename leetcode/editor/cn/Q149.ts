// 直线上最多的点数
//给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。
//
//
//
// 示例 1：
//
//
//输入：points = [[1,1],[2,2],[3,3]]
//输出：3
//
//
// 示例 2：
//
//
//输入：points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
//输出：4
//
//
//
//
// 提示：
//
//
// 1 <= points.length <= 300
// points[i].length == 2
// -10⁴ <= xi, yi <= 10⁴
// points 中的所有点 互不相同
//
//
// Related Topics 几何 数组 哈希表 数学 👍 471 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function maxPoints(points: number[][]): number {
  function rate(p1: number[], p2: number[]) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    if (x2 === x1) {
      return "inf";
    }
    let r = (y2 - y1) / (x2 - x1);
    return Math.round(r * 100000);
  }
  const map = new Map<string, number>();
  let max = 1;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x, y] = points[i];
      const r = rate(points[i], points[j]);
      const b = `${x}_${y}_${r}`;
      const n = (map.get(b) || 1) + 1;
      max = Math.max(max, n);
      map.set(b, n);
    }
  }
  return max;
}

//runtime:96 ms
//memory:42.5 MB

//leetcode submit region end(Prohibit modification and deletion)
