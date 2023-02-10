// 解数独
//编写一个程序，通过填充空格来解决数独问题。
//
// 数独的解法需 遵循如下规则：
//
//
// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
//
//
// 数独部分空格内已填入了数字，空白格用 '.' 表示。
//
//
//
//
//
//
// 示例 1：
//
//
//输入：board = [
// ["5","3",".",".","7",".",".",".","."],
// ["6",".",".","1","9","5",".",".","."],
// [".","9","8",".",".",".",".","6","."],
// ["8",".",".",".","6",".",".",".","3"],
// ["4",".",".","8",".","3",".",".","1"],
// ["7",".",".",".","2",".",".",".","6"],
// [".","6",".",".",".",".","2","8","."],
// [".",".",".","4","1","9",".",".","5"],
// [".",".",".",".","8",".",".","7","9"]
// ]
//输出：[
// ["5","3","4","6","7","8","9","1","2"],
// ["6","7","2","1","9","5","3","4","8"],
// ["1","9","8","3","4","2","5","6","7"],
// ["8","5","9","7","6","1","4","2","3"],
// ["4","2","6","8","5","3","7","9","1"],
// ["7","1","3","9","2","4","8","5","6"],
// ["9","6","1","5","3","7","2","8","4"],
// ["2","8","7","4","1","9","6","3","5"],
// ["3","4","5","2","8","6","1","7","9"]
// ]
//解释：输入的数独如上图所示，唯一有效的解决方案如下所示：
//
//
//
//
//
//
// 提示：
//
//
// board.length == 9
// board[i].length == 9
// board[i][j] 是一位数字或者 '.'
// 题目数据 保证 输入数独仅有一个解
//
//
//
//
// Related Topics 数组 回溯 矩阵 👍 1348 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
  const su = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  function blockId(x: number, y: number): number[] {
    return [Math.floor(x / 3) * 3, Math.floor(y / 3) * 3];
  }
  function pset(x: number, y: number, board: string[][]) {
    const set = new Set(su);
    for (let i = 0; i < 9; i++) {
      const row = board[x][i];
      set.delete(board[x][i]);
    }
    for (let i = 0; i < 9; i++) {
      set.delete(board[i][y]);
    }
    const [xi, yi] = blockId(x, y);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        set.delete(board[xi + i][yi + j]);
      }
    }
    return Array.from(set);
  }

  function copy(bd: string[][]) {
    return new Array(bd.length).fill(1).map((_, idx) => Array.from(bd[idx]));
  }
  function eva(y: number, x: number, bd: string[][]): any {
    if (x > 8) {
      if (y < 8) {
        y++;
        x = 0;
      } else {
        return bd;
      }
    } else {
      x++;
    }
    if (y > 8 && x > 8) {
      return bd;
    }
    if (bd[y][x] === ".") {
      const sets = pset(y, x, bd);
      for (let i = 0; i < sets.length; i++) {
        const bdi = copy(bd);
        bdi[y][x] = sets[i];
        const pass = eva(y, x, bdi);
        if (pass) {
          return pass;
        }
      }
    } else {
      return eva(y, x, bd);
    }
  }
  const r = eva(0, -1, board);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j] = r[i][j];
    }
  }
}

// const board = [
//   ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//   [".", "9", "8", ".", ".", ".", ".", "6", "."],
//   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//   [".", "6", ".", ".", ".", ".", "2", "8", "."],
//   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//   [".", ".", ".", ".", "8", ".", ".", "7", "9"],
// ];
//
// console.log(solveSudoku(board));
//leetcode submit region end(Prohibit modification and deletion)
