// 最大矩形
//给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
//
//
//
// 示例 1：
//
//
//输入：matrix = [
// ["1","0","1","0","0"],
// ["1","0","1","1","1"],
// ["1","1","1","1","1"]
//,["1","0","0","1","0"]]
//输出：6
//解释：最大矩形如上图所示。
//
//
// 示例 2：
//
//
//输入：matrix = []
//输出：0
//
//
// 示例 3：
//
//
//输入：matrix = [["0"]]
//输出：0
//
//
// 示例 4：
//
//
//输入：matrix = [["1"]]
//输出：1
//
//
// 示例 5：
//
//
//输入：matrix = [["0","0"]]
//输出：0
//
//
//
//
// 提示：
//
//
// rows == matrix.length
// cols == matrix[0].length
// 1 <= row, cols <= 200
// matrix[i][j] 为 '0' 或 '1'
//
// Related Topics 栈 数组 动态规划 矩阵 单调栈 👍 1348 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
// function maximalRectangle(matrix: string[][]): number {
//   // const matrix = [
//   // ["1","0","1","0","0"],
//   // ["1","0","1","1","1"],
//   // ["1","1","1","1","1"],
//   // ["1","0","0","1","0"]]
//   /**
//    * m(y,x)=(m(y-1,x)&&t(y,[0,x]))&&(m(y,x-1)&&t([0,y],x))
//    * m(y,x)=m(y-1,x)&&m(y,x-1)&&matrix(y,x)===1
//    *
//    *
//    */
//   const my = matrix.length;
//   const mx = matrix[0].length;
//   const m = new Array(my).fill(0).map(() => new Array(mx).fill(-1));
//   let result = 0;
//
//   function mtx(y: number, x: number) {
//     const mi = y + "-" + x;
//     function mt(dy: number, dx: number) {
//       const yi = y + dy;
//       const xi = x + dx;
//       const matrixIsOne = matrix[yi][xi] === "1";
//       if (!matrixIsOne) {
//         return false;
//       }
//       let ok = false;
//       if (dy <= 0 && dx <= 0) {
//         ok = matrixIsOne;
//       } else if (dy <= 0) {
//         ok = m[yi][xi - 1] === mi;
//       } else if (dx <= 0) {
//         ok = m[yi - 1][xi] === mi;
//       } else {
//         ok = m[yi - 1][xi] === mi && m[yi][xi - 1] === mi;
//       }
//       m[yi][xi] = ok ? mi : "";
//       return ok;
//     }
//     let xmax = -1;
//     let ymax = -1;
//     for (let dy = 0; y + dy < my; dy++) {
//       for (let dx = 0; x + dx < mx; dx++) {
//         if (dx >= xmax && xmax !== -1) {
//           break;
//         }
//         if (dy >= ymax && ymax !== -1) {
//           break;
//         }
//         if (mt(dy, dx)) {
//           result = Math.max(result, (dx + 1) * (dy + 1));
//         } else {
//           xmax = dx;
//           if (dx === 0) {
//             ymax = dy;
//           }
//           break;
//         }
//       }
//     }
//   }
//
//   for (let i = 0; i < my; i++) {
//     for (let j = 0; j < mx; j++) {
//       mtx(i, j);
//     }
//   }
//
//   return result;
// }
function maximalRectangle(matrix: string[][]): number {
  // const matrix = [
  // ["1","0","1","0","0"],
  // ["1","0","1","1","1"],
  // ["1","1","1","1","1"],
  // ["1","0","0","1","0"]]
  //
  // const matrix = [
  // ["1","0","1","0","0"],
  // ["1","0","1","2","3"],
  // ["1","2","3","4","5"],
  // ["1","0","0","1","0"]]
  /**
   *
   * m(y,x)=(m(y-1,x)&&t(y,[0,x]))&&(m(y,x-1)&&t([0,y],x))
   * m(y,x)=m(y-1,x)&&m(y,x-1)&&matrix(y,x)===1
   *
   */
  const my = matrix.length;
  const mx = matrix[0].length;
  const m = new Array(my).fill(0).map(() => new Array(mx).fill(-1));
  let result = 0;

  function mtx(y: number, x: number) {
    const mi = y + "-" + x;
    function mt(dy: number, dx: number) {
      const yi = y + dy;
      const xi = x + dx;
      const matrixIsOne = matrix[yi][xi] === "1";
      if (!matrixIsOne) {
        return false;
      }
      let ok = false;
      if (dy <= 0 && dx <= 0) {
        ok = matrixIsOne;
      } else if (dy <= 0) {
        ok = m[yi][xi - 1] === mi;
      } else if (dx <= 0) {
        ok = m[yi - 1][xi] === mi;
      } else {
        ok = m[yi - 1][xi] === mi && m[yi][xi - 1] === mi;
      }
      m[yi][xi] = ok ? mi : "";
      return ok;
    }
    let xmax = -1;
    let ymax = -1;
    for (let dy = 0; y + dy < my; dy++) {
      for (let dx = 0; x + dx < mx; dx++) {
        if (dx >= xmax && xmax !== -1) {
          break;
        }
        if (dy >= ymax && ymax !== -1) {
          break;
        }
        if (mt(dy, dx)) {
          result = Math.max(result, (dx + 1) * (dy + 1));
        } else {
          xmax = dx;
          if (dx === 0) {
            ymax = dy;
          }
          break;
        }
      }
    }
  }

  for (let i = 0; i < my; i++) {
    for (let j = 0; j < mx; j++) {
      mtx(i, j);
    }
  }

  return result;
}

// function test() {
//   const json: any[] = [
//     {
//       p1: [
//         ["1", "0", "1", "0", "0"],
//         ["1", "0", "1", "1", "1"],
//         ["1", "1", "1", "1", "1"],
//         ["1", "0", "0", "1", "0"],
//       ],
//       result: 6,
//     },
//     {
//       p1: [
//         ["1", "0", "1", "0", "0"],
//         ["1", "0", "1", "0", "1"],
//         ["1", "1", "1", "1", "1"],
//         ["1", "0", "0", "1", "0"],
//       ],
//       result: 5,
//     },
//     {
//       p1: [
//         ["1", "0", "1", "0", "0"],
//         ["1", "0", "1", "0", "1"],
//         ["1", "1", "0", "1", "1"],
//         ["1", "0", "0", "1", "0"],
//       ],
//       result: 4,
//     },
//     {
//       p1: [
//         ["1", "0", "1", "0", "0"],
//         ["1", "1", "1", "1", "1"],
//         ["1", "1", "1", "1", "1"],
//         ["1", "0", "0", "1", "0"],
//       ],
//       result: 10,
//     },
//     {
//       p1: [
//         ["1", "0", "1", "0", "0"],
//         ["1", "0", "1", "0", "1"],
//       ],
//       result: 2,
//     },
//     {
//       p1: [["1"]],
//       result: 1,
//     },
//   ];
//
//   json.forEach((j, idx) => {
//     let res: any = maximalRectangle(j.p1);
//     if (String(res) !== String(j.result)) {
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
