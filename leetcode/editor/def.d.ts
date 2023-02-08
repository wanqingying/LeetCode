declare class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null);
}

declare class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  dep?: number;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null);
}
declare class Node {
  val: number;
  left: Node | null;
  right: Node | null;
  dep?: number;
  next?: Node;
  constructor(val?: number, left?: Node | null, right?: Node | null);
}

interface Console {
  log(...data: any[]): void;
}

declare var console: Console;
