//输入某二叉树的前序遍历和中序遍历的结果，请构建该二叉树并返回其根节点。 
//
// 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。 
//
// 
//
// 示例 1: 
// 
// 
//Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
//Output: [3,9,20,null,null,15,7]
// 
//
// 示例 2: 
//
// 
//Input: preorder = [-1], inorder = [-1]
//Output: [-1]
// 
//
// 
//
// 限制： 
//
// 0 <= 节点个数 <= 5000 
//
// 
//
// 注意：本题与主站 105 题重复：https://leetcode-cn.com/problems/construct-binary-tree-from-
//preorder-and-inorder-traversal/ 
//
// Related Topics 树 数组 哈希表 分治 二叉树 👍 1117 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        //Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
        //Output: [3,9,20,null,null,15,7]
        if (preorder.length == 0) return null;
        for (int i = 0; i < preorder.length; i++) {
            map1.put(preorder[i], i);
            map2.put(inorder[i], i);
        }
        return this.myBuildTree(preorder, inorder, 0, inorder.length - 1, 0);

    }

    private TreeNode myBuildTree(int[] preorder, int[] inorder, int left, int right, int index) {
        if (left > right) return null;
        TreeNode root = new TreeNode(preorder[index]);
        if (left == right) return root;
        int rootIndex = this.map2.get(preorder[index]);

        if (rootIndex != left) {
            root.left = this.myBuildTree(preorder, inorder, left, rootIndex - 1, index + 1);
        }
        if (rootIndex != right) {
            int len = rootIndex - left;
            root.right = this.myBuildTree(preorder, inorder, rootIndex + 1, right, index + len + 1);
        }

        return root;
    }

    private HashMap<Integer, Integer> map1 = new HashMap<>();
    private HashMap<Integer, Integer> map2 = new HashMap<>();
}
//leetcode submit region end(Prohibit modification and deletion)
