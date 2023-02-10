function sort_1(arr: number[]) {
  // 冒泡排序
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        let c = arr[j];
        arr[j] = arr[i];
        arr[i] = c;
      }
    }
  }
  return arr;
}

function sort_2(arr: number[]) {
  // 归并排序
  // 递归拆分-二路归并
  function merge(ra: number[], rb: number[]) {
    // 二路归并
    let res: number[] = [];
    while (ra.length && rb.length) {
      if (ra[0] < rb[0]) {
        res.push(ra.shift());
      } else {
        res.push(rb.shift());
      }
    }
    if (ra.length) res = res.concat(ra);
    if (rb.length) res = res.concat(rb);

    return res;
  }

  if (arr.length <= 1) return arr;

  if (arr.length <= 1) return arr;
  const x = Math.floor(arr.length / 2);
  return merge(sort_2(arr.slice(0, x)), sort_2(arr.slice(x)));
}
function sort_3(arr: number[]) {
  // 快速排序
  // 递归选择锚点-以锚点排序
  function swap(a: number, b: number) {
    if (a === b) return;
    const c = arr[a];
    arr[a] = arr[b];
    arr[b] = c;
  }

  function organize(left, right) {
    //[left,right]

    if (left >= right) return;

    let mid = left;
    for (let i = left; i < right; i++) {
      if (arr[i] <= arr[right]) {
        swap(mid, i);
        mid++;
      }
    }
    swap(mid, right);
    organize(left, mid - 1);
    organize(mid, right);
  }
  organize(0, arr.length - 1);
  return arr;
}

function test(sort: any) {
  console.log("sort");
  console.log(sort([3, 2, 3, 33, 3, 3, 1]));
  // console.log(sort([3, 2, 5, 2, 1, 7]));
}
test(sort_3);
//
// console.log([1, 3].slice(1));
