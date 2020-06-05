const {testAll} = require('./base')
/*

394. 字符串解码
给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

示例:
s = "3[a]2[bc]", 返回 "aaabcbc".
s = "3[a2[c]]", 返回 "accaccacc".
s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".

*/


/**
 * 使用数组模拟栈结构
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
    // 使用两个栈，一个记录字符串，一个记录上一个闭合括号的位置
    let stack = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ']') {
            for (let j = stack.length - 1; j >= 0; j--) {
                if (stack[j] === '[') {
                    let countStart = j - 1;
                    while (!isNaN(stack[countStart] * 1)) {
                        countStart -= 1
                    }
                    countStart += 1;
                    let count = stack.slice(countStart, j).join('') * 1;
                    let sta = stack.slice(j + 1).join('')
                    let str = sta.repeat(count)
                    stack = stack.slice(0, countStart)
                    stack.push(str)
                    break;
                }
            }
        } else {
            stack.push(s[i])
        }
    }
    return stack.join('')
};

let params = [
    {param: "3[w]", result: 'www'},
    {param: "3[a]2[bc]", result: "aaabcbc"},
    {param: "3[a]2[buc]", result: "aaabcbc"}
]
testAll(decodeString, params)