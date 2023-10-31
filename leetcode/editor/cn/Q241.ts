//给你一个由数字和运算符组成的字符串 expression ，按不同优先级组合数字和运算符，计算并返回所有可能组合的结果。你可以 按任意顺序 返回答案。
//
// 生成的测试用例满足其对应输出值符合 32 位整数范围，不同结果的数量不超过 10⁴ 。
//
//
//
// 示例 1：
//
//
//输入：expression = "2-1-1"
//输出：[0,2]
//解释：
//((2-1)-1) = 0
//(2-(1-1)) = 2
//
//
// 示例 2：
//
//
//输入：expression = "2*3-4*5"
//输出：[-34,-14,-10,-10,10]
//解释：
//(2*(3-(4*5))) = -34
//((2*3)-(4*5)) = -14
//((2*(3-4))*5) = -10
//(2*((3-4)*5)) = -10
//(((2*3)-4)*5) = 10
//
//
//
//
// 提示：
//
//
// 1 <= expression.length <= 20
// expression 由数字和算符 '+'、'-' 和 '*' 组成。
// 输入表达式中的所有整数值在范围 [0, 99]
//
//
// Related Topics 递归 记忆化搜索 数学 字符串 动态规划 👍 822 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
function diffWaysToCompute(expressionStr: string): number[] {
  const expression=expressionStr.split(/(\d+)/).filter(Boolean);


  function calc(lt: number[], rt: number[], exp: string) {
    let res: number[] = [];
    for (let l of lt) {
      for (let r of rt) {
        switch (exp) {
          case "+":
            res.push(l + r);
            break;
          case "-":
            res.push(l - r);
            break;
          case "*":
            res.push(l * r);
            break;
        }
      }
    }
    return res;
  }

  function compute(str: string[]) {
    if (str.length === 1) return [Number(str)];
    let res: number[] = [];
    for (let i = 1; i < str.length; i += 2) {
      let lt = compute(str.slice(0, i));
      let rt = compute(str.slice(i + 1));
      let tmp = calc(lt, rt, str[i]);
      res = res.concat(tmp);
    }
    return Array.from(res);
  }

  return compute(expression);
}

// console.log("4+2-3".slice(0, 1));
// console.log(diffWaysToCompute("2-1-1"));
// console.log(diffWaysToCompute("2*34-4*5+3*2"));
// console.log(diffWaysToCompute("29"));

// console.log("2*34-4*5+3*2".split(/\d*/).filter(Boolean));
// console.log("2*34-4*5+3*2".split(/(\d*)/).filter(Boolean));

//leetcode submit region end(Prohibit modification and deletion)
