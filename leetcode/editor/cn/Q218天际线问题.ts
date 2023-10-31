//城市的 天际线 是从远处观看该城市中所有建筑物形成的轮廓的外部轮廓。给你所有建筑物的位置和高度，请返回 由这些建筑物形成的 天际线 。
//
// 每个建筑物的几何信息由数组 buildings 表示，其中三元组 buildings[i] = [lefti, righti, heighti] 表示：
//
//
//
// lefti 是第 i 座建筑物左边缘的 x 坐标。
// righti 是第 i 座建筑物右边缘的 x 坐标。
// heighti 是第 i 座建筑物的高度。
//
//
// 你可以假设所有的建筑都是完美的长方形，在高度为 0 的绝对平坦的表面上。
//
// 天际线 应该表示为由 “关键点” 组成的列表，格式 [[x1,y1],[x2,y2],...] ，并按 x 坐标 进行 排序 。关键点是水平线段的左端点。
//列表中最后一个点是最右侧建筑物的终点，y 坐标始终为 0 ，仅用于标记天际线的终点。此外，任何两个相邻建筑物之间的地面都应被视为天际线轮廓的一部分。
//
// 注意：输出天际线中不得有连续的相同高度的水平线。例如 [...[2 3], [4 5], [7 5], [11 5], [12 7]...] 是不正确的答
//案；三条高度为 5 的线应该在最终输出中合并为一个：[...[2 3], [4 5], [12 7], ...]
//
//
//
// 示例 1：
//
//
//输入：buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
//输出：[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
//解释：
//图 A 显示输入的所有建筑物的位置和高度，
//图 B 显示由这些建筑物形成的天际线。图 B 中的红点表示输出列表中的关键点。
//
// 示例 2：
//
//
//输入：buildings = [[0,2,3],[2,5,3]]
//输出：[[0,3],[5,0]]
//
//
//
//
// 提示：
//
//
// 1 <= buildings.length <= 10⁴
// 0 <= lefti < righti <= 2³¹ - 1
// 1 <= heighti <= 2³¹ - 1
// buildings 按 lefti 非递减排序
//
//
// Related Topics 树状数组 线段树 数组 分治 有序集合 扫描线 堆（优先队列） 👍 788 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function getSkyline(buildings: number[][]): number[][] {
  //buildings =[[3,7,15],[5,12,12],[2,9,10],[15,20,10],[19,24,8],[0,*,0]]
  //buildings = [3,7,15]
  //buildings = [3,7,15] [7,12,12] ([)]
  //buildings = [3,7,15] [7,12,12]  ([)(])
  //buildings = [2,3,10] [3, 7,15] [7,12,12] [()(])
  //buildings = [2,3,10] [3, 7,15] [7,12,12] [15,20,10]
  //buildings = [0,2,0] [2,3,10] [3, 7,15] [7,12,12] [12,15,0] [15,20,10] [20,24,8] [24,*,0]
  //输出：       [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
  //   1 2 3  4  5  6  7   8  9  10 11 12 13 14 15
  //       15 15 15 15 15 12 12  12 12 12
  buildings.push([0, Number.MAX_VALUE, 0]);
  buildings.sort((a, b) => a[2] - b[2]);
  // [1_2]
  let points: number[][] = [
    [-1, 0, 1],
    [Number.MAX_VALUE, 0, 2],
  ];

  for (let i = 0; i < buildings.length; i++) {
    const [bl, br, bh] = buildings[i];
    let left = false;
    let right = false;
    for (let j = 0; j < points.length; j++) {
      const [px, ph, l1r2] = points[j];
      if (l1r2 === 3) continue;
      if (l1r2 === 2 && px < bl) continue;
      if (l1r2 === 1 && px > br) continue;
      if (!left) {
        // 左端点
        if (bl > px) {
          left = true;
          if (l1r2 === 1) {
            // 相交
            add(points, [bl, bh, 1], j + 1);
            add(points, [bl, ph, 2], j + 1);
            j += 2;
          }
          if (l1r2 === 2) {
            // 不相交
            add(points, [bl, bh, 1], j + 1);
            j++;
          }
        }
        if (bl === px) {
          if (l1r2 === 1) {
            // 替换
            points[j] = [px, bh, 1];
          }
          if (l1r2 === 2) {
            // 不相交
            add(points, [bl, bh, 1], j + 1);
            j++;
          }
        }
      }
      if (left && !right) {
        // 右端点
        if (px < br) {
          if (l1r2 === 1) {
            // 删除
            points[j][2] = 3;
          }
          if (l1r2 === 2) {
            // 删除
            points[j][2] = 3;
          }
        }
        if (px === br) {
          if (l1r2 === 1) {
            add(points, [br, bh, 2], j);
            j++;
          }
          if (l1r2 === 2) {
            // 替换
            points[j] = [br, bh, 2];
          }
        }
        if (px > br) {
          right = true;
          if (l1r2 === 1) {
            // 不相交
            add(points, [px, bh, 2], j + 1);
            j++;
          }
          if (l1r2 === 2) {
            // 相交
            add(points, [px, ph, 1], j + 1);
            add(points, [px, bh, 2], j + 1);
            j += 2;
          }
        }
      }
    }
  }

  return points.filter((p) => p[2] !== 3);
}

function add(array: Array<any>, t: any, index: number) {
  const size = array.length;
  for (let i = index; i <= size; i++) {
    const ai = array[i];
    array[i] = t;
    t = ai;
  }
}
const a = [1, 2, 3, 4, 5, 6];
// add(a, 34, 3);
for (let i = 0; i < a.length; i++) {
  if (i === 3 && a.length === 6) {
    a.splice(3, 1);
    i--;
  } else {
    // console.log(`a[${i}]=${a[i]}`);
  }
}
// a.splice(2,1)

// console.log(a);

const res = getSkyline([
  [2, 9, 10],
  [3, 7, 15],
  [5, 12, 12],
  [15, 20, 10],
  [19, 24, 8],
]);
console.log(res);

//leetcode submit region end(Prohibit modification and deletion)
