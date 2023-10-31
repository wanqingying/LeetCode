//给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。 
//
// 
//
// 示例 1: 
//
// 
//
// 
//输入: [1,2,3,null,5,null,4]
//输出: [1,3,4]
// 
//
// 示例 2: 
//
// 
//输入: [1,null,3]
//输出: [1,3]
// 
//
// 示例 3: 
//
// 
//输入: []
//输出: []
// 
//
// 
//
// 提示: 
//
// 
// 二叉树的节点个数的范围是 [0,100] 
// 
// -100 <= Node.val <= 100 
// 
//
// Related Topics 树 深度优先搜索 广度优先搜索 二叉树 👍 976 👎 0


package leetcode.editor.cn.Q199;


import java.util.ArrayList;
import java.util.List;

class TreeNode {
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

//leetcode submit region begin(Prohibit modification and deletion)

class Solution {
//    private List<List<Integer>> res = new ArrayList<>();
    private List<Integer> res = new ArrayList<>();
    public List<Integer> rightSideView(TreeNode root) {
        this.res= new ArrayList<>();
        this.visit(root, 0);

        return res;
    }

    void visit(TreeNode node, int level){
        if(node == null) return;
        if(res.size() <= level){
            res.add(node.val);
        }
        visit(node.right, level + 1);
        visit(node.left, level + 1);
    }
}



//leetcode submit region end(Prohibit modification and deletion)


class QTest {
    public static void main(String[] args) {
        Solution solution = new Solution();

    }
}

