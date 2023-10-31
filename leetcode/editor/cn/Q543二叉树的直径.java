//给你一棵二叉树的根节点，返回该树的 直径 。 
//
// 二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root 。 
//
// 两节点之间路径的 长度 由它们之间边数表示。 
//
// 
//
// 示例 1： 
// 
// 
//输入：root = [1,2,3,4,5]
//输出：3
//解释：3 ，取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。
// 
//
// 示例 2： 
//
// 
//输入：root = [1,2]
//输出：1
// 
//
// 
//
// 提示： 
//
// 
// 树中节点数目在范围 [1, 10⁴] 内 
// -100 <= Node.val <= 100 
// 
//
// Related Topics 树 深度优先搜索 二叉树 👍 1391 👎 0


//leetcode submit region begin(Prohibit modification and deletion)

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode() {}
 * TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) {
 * this.val = val;
 * this.left = left;
 * this.right = right;
 * }
 * }
 */
class Solution {
    public int diameterOfBinaryTree(TreeNode _root) {
        TreeNod root=TreeNod.copy(_root);
        calcNodeHeight(root);
        int max = 0;
        // convert TreeNode to list
        List<TreeNod> list = new ArrayList<>();
        List<TreeNod> stack = new ArrayList<>();
        stack.add(root);
        while (!stack.isEmpty()) {
            TreeNod node = stack.remove(0);
            list.add(node);
            if (node.right != null) stack.add(node.right);
            if (node.left != null) stack.add(node.left);
        }

        // calc max
        for (TreeNod node : list) {
            int left = node.left == null ? 0 : node.left.height;
            int right = node.right == null ? 0 : node.right.height;
            max = Math.max(max, left + right);
        }
        return max;
    }

    public void calcNodeHeight(TreeNod node) {
        if (node == null) return;
        calcNodeHeight(node.left);
        calcNodeHeight(node.right);
        node.height = Math.max(node.left == null ? 0 : node.left.height, node.right == null ? 0 : node.right.height) + 1;
    }
}

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class TreeNod<T> {
    T val;
    int height;
    TreeNod<T> left;
    TreeNod<T> right;

    TreeNod() {
    }

    TreeNod(T val) {
        this.val = val;
    }

    TreeNod(T val, TreeNod left, TreeNod right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    // build a tree with list
    public static <T> TreeNod build(List<T> list) {
        if (list == null || list.size() == 0) return null;
        TreeNod root = new TreeNod(list.get(0));
        HashMap<Integer, TreeNod> map = new HashMap<>();
        map.put(0, root);
        for (int i = 1; i < list.size(); i++) {
            if (list.get(i) == null) continue;
            TreeNod node = new TreeNod(list.get(i));
            map.put(i, node);
            int parent = (i - 1) / 2;
            if (i % 2 == 0) {
                map.get(parent).right = node;
            } else {
                map.get(parent).left = node;
            }
        }
        return root;
    }

    public static TreeNod copy(TreeNode root) {
        if (root == null) return null;
        TreeNod node = new TreeNod(root.val);
        node.left = copy(root.left);
        node.right = copy(root.right);
        return node;
    }

}
//leetcode submit region end(Prohibit modification and deletion)
