/**
 *
 给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。假设只有一个重复的整数，找出这个重复的数。

 示例 1:
 输入: [1,3,4,2,2]
 输出: 2

 示例 2:
 输入: [3,1,3,4,2]
 输出: 3

 说明：
 不能更改原数组（假设数组是只读的）。
 只能使用额外的 O(1) 的空间。
 时间复杂度小于 O(n2) 。
 数组中只有一个重复的数字，但它可能不止重复出现一次。
 链接：https://leetcode-cn.com/problems/find-the-duplicate-number

 */

/**
 * 暴力破解法，时间O(n^2),空间O(1)
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    let n = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] === i) {
                n++
            }
            if (n > 1) {
                return nums[j]
            }
        }
        n = 0
    }
};

/**
 *
 * 二分查找，时间O(n * log n),空间O(1)
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate2 = function (nums) {
    let start = 1;
    let end = Math.ceil(nums.length / 2)
    let tail = nums.length - 1
    while (end - start > 3) {
        let k = 0;
        for (let j = 0; j < nums.length; j++) {
            if (start <= nums[j] && nums[j] <= end) {
                k++
            }
        }
        if (k > (end - start + 1)) {
            tail = end
            end = start + Math.floor((end - start) / 2)
        } else {
            start = end
            end = tail
        }
    }
    // 当二分查找到常数范围后，使用扫描法
    let ast = new Map()
    for (let i = start; i <= tail; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] === i) {
                let t = ast.get(i)
                if (t) {
                    return i
                } else {
                    ast.set(i, 1)
                }
            }
        }

    }
};

function runAll(fn, dataList, msg = '') {
    let start = Date.now();
    dataList.forEach(({param, res, index}) => {
        let r = fn(param)
        if (r === res) {
            // nothing
        } else {
            console.log(`${msg} err, res:${r},ex:${res}`);
        }
    })
    console.log(`${msg} done, spent:${Date.now() - start}`);
}

function testAll() {
    let list = new Array(50).fill(1).map(n => {
        let len = Math.ceil(Math.random() * 50000);
        let baseArr = new Array(len).fill(1).map((_, ind) => ind + 1).sort(() => {
            return Math.random() - 0.5
        })
        let seed = Math.floor(Math.random() * (len - 1)) + 1;
        let index = Math.floor(Math.random() * len);
        let a1 = baseArr.slice(0, index);
        let a2 = baseArr.slice(index);
        a1.push(seed)
        let brr = a1.concat(a2)
        return {param: brr, res: seed, index: index}
    })
    let baseArr = new Array(50000).fill(1).map((_, ind) => ind + 1)
    let arr5 = Array.from(baseArr)
    arr5.push(5)
    runAll(findDuplicate, list, 'a')
    runAll(findDuplicate2, list, 'b')
}

testAll()
// let arr = [1, 2, 3, 4, 1]
// console.log(findDuplicate(arr));
// console.log(findDuplicate2(arr));