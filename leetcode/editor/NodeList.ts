

function array2List(array: any[]) {
  let h: any = null;
  let hi: any = null;
  for (let i = 0; i < array.length; i++) {
    const node = { val: array[i], next: null } as any;
    if (!h) {
      h = node;
      hi = node;
    } else {
      hi.next = node;
      hi = node;
    }
  }
  return h;
}

function list2Array(list: any) {
  const res: any[] = [];
  let h = list;
  while (h) {
    res.push(h.val);
    h = h.next;
  }
  return res;
}
const l1=array2List([3, 3, 2])
console.log("ar", JSON.stringify(l1));
console.log("a2r", list2Array(l1));
