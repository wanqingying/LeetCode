//请你设计一个管理 n 个座位预约的系统，座位编号从 1 到 n 。
//
// 请你实现 SeatManager 类：
//
//
// SeatManager(int n) 初始化一个 SeatManager 对象，它管理从 1 到 n 编号的 n 个座位。所有座位初始都是可预约的。
// int reserve() 返回可以预约座位的 最小编号 ，此座位变为不可预约。
// void unreserve(int seatNumber) 将给定编号 seatNumber 对应的座位变成可以预约。
//
//
//
//
// 示例 1：
//
// 输入：
//["SeatManager", "reserve", "reserve", "unreserve", "reserve", "reserve", "rese
//rve", "reserve", "unreserve"]
//[[5], [], [], [2], [], [], [], [], [5]]
//输出：
//[null, 1, 2, null, 2, 3, 4, 5, null]
//
//解释：
//SeatManager seatManager = new SeatManager(5); // 初始化 SeatManager ，有 5 个座位。
//seatManager.reserve();    // 所有座位都可以预约，所以返回最小编号的座位，也就是 1 。
//seatManager.reserve();    // 可以预约的座位为 [2,3,4,5] ，返回最小编号的座位，也就是 2 。
//seatManager.unreserve(2); // 将座位 2 变为可以预约，现在可预约的座位为 [2,3,4,5] 。
//seatManager.reserve();    // 可以预约的座位为 [2,3,4,5] ，返回最小编号的座位，也就是 2 。
//seatManager.reserve();    // 可以预约的座位为 [3,4,5] ，返回最小编号的座位，也就是 3 。
//seatManager.reserve();    // 可以预约的座位为 [4,5] ，返回最小编号的座位，也就是 4 。
//seatManager.reserve();    // 唯一可以预约的是座位 5 ，所以返回 5 。
//seatManager.unreserve(5); // 将座位 5 变为可以预约，现在可预约的座位为 [5] 。
//
//
//
//
// 提示：
//
//
// 1 <= n <= 105
// 1 <= seatNumber <= n
// 每一次对 reserve 的调用，题目保证至少存在一个可以预约的座位。
// 每一次对 unreserve 的调用，题目保证 seatNumber 在调用函数前都是被预约状态。
// 对 reserve 和 unreserve 的调用 总共 不超过 105 次。
//
// Related Topics 设计 堆（优先队列）
// 👍 6 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 */
var SeatManager = function (n) {
  this.seats = new Array(n).fill(1);
  this.idx = 0;
};

/**
 * @return {number}
 */
SeatManager.prototype.reserve = function () {
  this.seats[this.idx] = 0;
  const ret = this.idx + 1;
  for (let i = this.idx + 1; i < this.seats.length; i++) {
    if (this.seats[i] === 1) {
      this.idx = i;
      break;
    }
  }
  return ret;
};

/**
 * @param {number} seatNumber
 * @return {void}
 */
SeatManager.prototype.unreserve = function (seatNumber) {
  this.seats[seatNumber] = 1;
  this.idx = Math.min(this.idx, seatNumber - 1);
};

/**
 * Your SeatManager object will be instantiated and called as such:
 * var obj = new SeatManager(n)
 * var param_1 = obj.reserve()
 * obj.unreserve(seatNumber)
 */
//leetcode submit region end(Prohibit modification and deletion)
/**
 * 解答失败: 测试用例:
 * ["SeatManager","reserve","unreserve","reserve","unreserve","reserve","unreserve","reserve","reserve","reserve","reserve","reserve","unreserve","unreserve","unreserve","reserve","unreserve","reserve","reserve","unreserve","unreserve","reserve","unreserve","unreserve","unreserve","reserve","unreserve","reserve","reserve","reserve","reserve","unreserve","reserve","reserve","reserve","unreserve","unreserve","unreserve","reserve","unreserve","reserve","reserve","reserve","unreserve","reserve","unreserve","unreserve","unreserve","unreserve","reserve","unreserve","unreserve","reserve","unreserve","unreserve","reserve","reserve","reserve","reserve","unreserve","reserve"] [[798],[],[1],[],[1],[],[1],[],[],[],[],[],[5],[3],[2],[],[4],[],[],[1],[3],[],[2],[4],[1],[],[1],[],[],[],[],[1],[],[],[],[1],[3],[2],[],[5],[],[],[],[5],[],[6],[4],[5],[1],[],[2],[3],[],[1],[2],[],[],[],[],[2],[]]
 * 测试结果:[null,1,null,1,null,1,null,1,2,3,4,5,null,null,null,2,null,3,4,null,null,1,null,null,null,1,null,1,2,3,4,null,1,2,5,null,null,null,1,null,2,3,4,null,5,null,null,null,null,1,null,null,2,null,null,1,2,3,4,null,2]
 * 期望结果:[null,1,null,1,null,1,null,1,2,3,4,5,null,null,null,2,null,3,4,null,null,1,null,null,null,1,null,1,2,3,4,null,1,5,6,null,null,null,1,null,2,3,5,null,5,null,null,null,null,1,null,null,2,null,null,1,2,3,4,null,2] stdout:
 *
 *
 */
