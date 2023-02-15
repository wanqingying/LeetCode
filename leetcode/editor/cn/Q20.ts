// 有效的括号
//给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。 
//
// 有效字符串需满足： 
//
// 
// 左括号必须用相同类型的右括号闭合。 
// 左括号必须以正确的顺序闭合。 
// 每个右括号都有一个对应的相同类型的左括号。 
// 
//
// 
//
// 示例 1： 
//
// 
//输入：s = "()"
//输出：true
// 
//
// 示例 2： 
//
// 
//输入：s = "()[]{}"
//输出：true
// 
//
// 示例 3： 
//
// 
//输入：s = "(]"
//输出：false
// 
//
// 
//
// 提示： 
//
// 
// 1 <= s.length <= 10⁴ 
// s 仅由括号 '()[]{}' 组成 
// 
//
// Related Topics 栈 字符串 👍 3721 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
const cm = new Map();
cm.set(")", "(");
cm.set("]", "[");
cm.set("}", "{");
const right = ["(", "[", "{"];
function isValid(s: string): boolean {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const si = s[i];
        if (right.includes(si)) {
            stack.push(si);
        } else {
            if (stack[stack.length - 1] === cm.get(si)) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
}

//runtime:72 ms
//memory:39.4 MB

//leetcode submit region end(Prohibit modification and deletion)
