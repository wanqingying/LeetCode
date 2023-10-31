//给你两棵二叉树： root1 和 root2 。 
//
// 想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠
//，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。 
//
// 返回合并后的二叉树。 
//
// 注意: 合并过程必须从两个树的根节点开始。 
//
// 
//
// 示例 1： 
// 
// 
//输入：root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
//输出：[3,4,5,5,4,null,7]
// 
//
// 示例 2： 
//
// 
//输入：root1 = [1], root2 = [1,2]
//输出：[2,2]
// 
//
// 
//
// 提示： 
//
// 
// 两棵树中的节点数目在范围 [0, 2000] 内 
// -10⁴ <= Node.val <= 10⁴ 
// 
//
// Related Topics 树 深度优先搜索 广度优先搜索 二叉树 👍 1316 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null && root2 == null) {
            return null;
        }
        TreeNode root = new TreeNode();
        treeCopy(root, root1, root2);
        return root;

    }

    public void treeCopy(TreeNode root, TreeNode root1, TreeNode root2) {
        Integer val = 0;
        TreeNode left1 = null;
        TreeNode left2 = null;
        TreeNode right1 = null;
        TreeNode right2 = null;
        if (root1 != null) {
            val += root1.val;
            left1 = root1.left;
            right1 = root1.right;
        }
        if (root2 != null) {
            val += root2.val;
            left2 = root2.left;
            right2 = root2.right;
        }
        root.val = val;
        if (left1 != null || left2 != null) {
            root.left = new TreeNode();
            treeCopy(root.left, left1, left2);
        }
        if (right1 != null || right2 != null) {
            root.right = new TreeNode();
            treeCopy(root.right, right1, right2);
        }
    }
}
//leetcode submit region end(Prohibit modification and deletion)
