console.log("hl");

// 1、实现一个函数，判断一组数字是否连续。当出现连续数字的时候以‘-’输出。
// 如： const arr = [ 2, 3, 4, 7, 8, 9, 10,13,15]
// 期望结果：["2-4", "7-10", 13, 15]

function transArr(arr: any[]) {
  if (arr.length < 2) return arr;
  let si = [arr[0]];
  let j = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] === 1) {
      si.push(arr[i]);
    } else {
      arr[j] = si.length > 1 ? `${si[0]}-${si[si.length - 1]}` : si[0];
      j++;
      si = [arr[i]];
    }
  }
  arr[j] = si.length > 1 ? `${si[0]}-${si[si.length - 1]}` : si[0];

  return arr.slice(0, j + 1);
}
console.log(transArr([2, 3, 4, 7, 8, 9, 10, 13, 15]));
console.log(transArr([1, 2, 3, 4, 7, 8, 9, 10, 13, 15]));
console.log(transArr([]));

function transArr2(arr: any[]) {
  if (arr.length < 2) return arr;
  let left = arr[0];
  let right = arr[0];
  let j = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] === 1) {
      right = arr[i];
    } else {
      arr[j] = left === right ? left : `${left}-${right}`;
      j++;
      left = arr[i];
      right = arr[i];
    }
  }
  arr[j] = left === right ? left : `${left}-${right}`;
  return arr.slice(0, j + 1);
}

function test(solution: Function, name: string) {
  let d = Date.now();

  for (let i = 0; i < 200000; i++) {
    let arr = [];
    for (let j = 0; j < 300; j++) {
      arr.push(Math.floor(Math.random() * 200));
    }
    const res1 = solution(arr);
  }
  console.log("const " + name, Date.now() - d);
}

test(transArr, "transArr");
test(transArr2, "transArr2");

console.log(transArr2([2, 3, 4, 7, 8, 9, 10, 13, 15]));
console.log(transArr2([1, 2, 3, 4, 7, 8, 9, 10, 13, 15]));
console.log(transArr2([]));
