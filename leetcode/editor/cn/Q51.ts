// N 皇后
//按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。 
//
// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。 
//
// 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。 
//
// 
// 
// 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。 
//
// 
//
// 示例 1： 
//
// 
//输入：n = 4
//输出：[
// [
// ".Q..",
// "...Q",
// "Q...",
// "..Q."],
// ["..Q.",
// "Q...","...Q",".Q.."]
// ]
//解释：如上图所示，4 皇后问题存在两个不同的解法。
// 
//
// 示例 2： 
//
// 
//输入：n = 1
//输出：[["Q"]]
// 
//
// 
//
// 提示： 
//
// 
// 1 <= n <= 9 
// 
// 
// 
// Related Topics 数组 回溯 👍 1451 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
function solveNQueens(n: number): string[][] {
    // 最多有n个Q,
    // 每行最多一个，每列最多一个
    // ray_rx[i]表示第i列放置的下标
    // ray_ry[i]表示第i行放置的下标
    interface Ray {
        // 右上 x+y 是固定值
        ray_rt: number[];
        // 右下 x-y+n 是固定值
        ray_rd: number[];
        // 列
        ray_rx: number[];
        // 行
        ray_ry: number[];
    }
    // 行
    const result = [];

    function ray(r?: Ray): Ray {
        if (r) {
            return {
                ray_rt: [...r.ray_rt],
                ray_rx: [...r.ray_rx],
                ray_ry: [...r.ray_ry],
                ray_rd: [...r.ray_rd],
            };
        } else {
            return { ray_rt: [], ray_rx: [], ray_ry: [], ray_rd: [] };
        }
    }

    // 判断
    function push(x: number, y: number, r: Ray) {
        if (r.ray_rt[x + y]) {
            return false;
        }
        if (r.ray_rd[x - y + n]) {
            return false;
        }
        if (r.ray_rx.includes(x)) {
            return false;
        }
        if (r.ray_ry.includes(y)) {
            return false;
        }
        r.ray_rt[x + y] = 1;
        r.ray_rd[x - y + n] = 1;
        r.ray_rx.push(x);
        r.ray_ry.push(y);
        return true;
    }

    function res(r: Ray) {
        const res: string[][] = new Array(n)
            .fill(1)
            .map((t) => new Array(n).fill("."));

        for (let i = 0; i < n; i++) {
            res[r.ray_ry[i]][r.ray_rx[i]] = "Q";
        }

        return res.map((r) => r.join(""));
    }

    function place(x, y, r: Ray) {
        if (y === n) {
            result.push(res(r));
            return;
        }
        for (let i = x; i < n; i++) {
            let ri = ray(r);
            if (push(i, y, ri)) {
                place(0, y + 1, ri);
            }
        }
    }

    place(0, 0, ray());

    return result;
};
//leetcode submit region end(Prohibit modification and deletion)
