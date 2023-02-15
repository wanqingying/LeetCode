// 电话号码的字母组合
//给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。 
//
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。 
//
// 
//
// 
//
// 示例 1： 
//
// 
//输入：digits = "23"
//输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
// 
//
// 示例 2： 
//
// 
//输入：digits = ""
//输出：[]
// 
//
// 示例 3： 
//
// 
//输入：digits = "2"
//输出：["a","b","c"]
// 
//
// 
//
// 提示： 
//
// 
// 0 <= digits.length <= 4 
// digits[i] 是范围 ['2', '9'] 的一个数字。 
// 
//
// Related Topics 哈希表 字符串 回溯 👍 2294 👎 0


//leetcode submit region begin(Prohibit modification and deletion)

const dn=[
    [],[],
    ['a','b','c'],
    ['d','e','f'],
    ['g','h','i'],
    ['j','k','l'],
    ['m','n','o'],
    ['p','q','r','s'],
    ['t','u','v'],
    ['w','x','y','z'],
]
function letterCombinations(digits: string): string[] {
    function matrix(a:string[],b:string[]) {
        const mx:string[]=[]
        if (a.length===0){
            return b
        }
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                mx.push(a[i]+b[j])
            }
        }
        return mx
    }
    const ds=digits.split('').map(Number)
    return ds.reduce((ret,di)=>matrix(ret,dn[di]),[])
};

//runtime:56 ms
//memory:39.5 MB

//leetcode submit region end(Prohibit modification and deletion)
