import java.lang.reflect.Array;
import java.util.*;
import java.util.stream.Stream;

public class TestVo {
    public static void main(String[] args) {
        TestVo testVo = new TestVo();
        System.out.println("Hello World!");

        System.out.println(testVo.testTry());
    }
    private int bx;

    public int testTry() {
        int g1 = 40;
        Boolean b = null;
        Integer g2 = 40;
//      Integer g3= Integer.va
        System.out.println(bx);
//      System.out.println(g3==g2);
        return 0;
    }

    public <T> int findInArray(T[] array, ArrayFinder<T> finder) {
        int left = 0;
        for (int i = 0; i < array.length; i++) {
            int res = finder.find(array[i], i);
            if (res == 0) return i;
            if (res > 0) {
                left = i + 1;
            } else {
                break;
            }
        }
        return left;
    }

    public <T> int findInArray(List<T> array, ArrayFinder<T> finder) {
        int left = 0;
        for (int i = 0; i < array.size(); i++) {
            int res = finder.find(array.get(i), i);
            if (res == 0) return i;
            if (res > 0) {
                left = i + 1;
            } else {
                break;
            }
        }
        return left;
    }

    private List<int[]> skyList = new ArrayList<>();

    private void addSkyList(int i, int left, int right, int height) {
        if (right <= left) return;
        this.skyList.add(i, new int[]{left, right, height});
    }

    private void setSkyList(int i, int left, int right, int height) {
        if (right <= left) return;
        this.skyList.set(i, new int[]{left, right, height});
    }

    public List<List<Integer>> getSkyline(int[][] buildings) {
        List<int[]> bList = new ArrayList<>(Arrays.asList(buildings));
        Collections.sort(bList, (a, b) -> b[2] - a[2]);
        bList.add(new int[]{0, Integer.MAX_VALUE, 0});
        // print xx
        for (int i = 0; i < bList.size(); i++) {
            System.out.println(bList.get(i)[0] + " " + bList.get(i)[1] + " " + bList.get(i)[2]);
        }
        System.out.println("xx");
        //buildings = [[3,7,15],[5,12,12],[2,9,10],[15,20,10],[19,24,8],[0,*,0]]
        //buildings = [3,7,15]
        //buildings = [3,7,15] [7,12,12] ([)]
        //buildings = [3,7,15] [7,12,12]  ([)(])
        //buildings = [2,3,10] [3, 7,15] [7,12,12] [()(])
        //buildings = [2,3,10] [3, 7,15] [7,12,12] [15,20,10]
        //buildings = [0,2,0] [2,3,10] [3, 7,15] [7,12,12] [12,15,0] [15,20,10] [20,24,8] [24,*,0]
        //输出：       [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
        List<int[]> list = this.skyList;
        for (int i = 0; i < bList.size(); i++) {
            int[] bd = bList.get(i);
            int indexL = 0;
            int indexR = 0;
            for (int j = 1; j < list.size(); j++) {
                int[] sk = list.get(j);
                // bd=[] sk=()
                if (indexL == 0 && sk[0] <= bd[0] && bd[0] <= sk[1]) {
                    indexL = j;
                }
                if (indexR == 0 && sk[0] <= bd[1] && bd[1] <= sk[1]) {
                    indexR = j;
                }
            }
            List<int[]> list2 = new ArrayList<>(list);
            if (indexL == indexR) {
                continue;
            }
            for (int j = indexL; j <= indexR; j++) {
                int[] sk = list.get(j);
                if (sk[0] < bd[0] && bd[1] < sk[1]) {
                    list2.add(j, new int[]{sk[0], bd[0], sk[2]});
                    list2.add(j + 1, new int[]{bd[0], bd[1], bd[2]});
                    list2.add(j + 2, new int[]{bd[1], sk[1], sk[2]});
                    list2.remove(j + 3);
                    list2.remove(j + 3);
                    list2.remove(j + 3);
                } else if (sk[0] < bd[0] && bd[0] < sk[1] && sk[1] < bd[1]) {
                    list2.add(j, new int[]{sk[0], bd[0], sk[2]});
                    list2.add(j + 1, new int[]{bd[0], sk[1], bd[2]});
                    list2.remove(j + 2);
                    list2.remove(j + 2);
                } else if (bd[0] < sk[0] && sk[0] < bd[1] && bd[1] < sk[1]) {
                    list2.add(j, new int[]{bd[0], sk[0], bd[2]});
                    list2.add(j + 1, new int[]{sk[0], bd[1], sk[2]});
                    list2.remove(j + 2);
                    list2.remove(j + 2);
                } else if (bd[0] < sk[0] && sk[1] < bd[1]) {
                    list2.add(j, new int[]{bd[0], sk[0], bd[2]});
                    list2.add(j + 1, new int[]{sk[0], sk[1], sk[2]});
                    list2.add(j + 2, new int[]{sk[1], bd[1], bd[2]});
                    list2.remove(j + 3);
                    list2.remove(j + 3);
                    list2.remove(j + 3);
                } else if (sk[0] == bd[0] && sk[1] == bd[1]) {
                    list2.add(j, new int[]{bd[0], bd[1], Math.max(sk[2], bd[2])});
                }


            }
            return this.skyList.stream().map(ints -> Arrays.asList(ints[0], ints[1], ints[2])).toList();
        }
        return null;
    }

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


    public int[] reversePrint(ListNode head) {
        List<Integer> list = new ArrayList<>();
        while (head != null) {
            list.add((Integer) head.val);
            head = head.next;
        }
        int[] res = new int[list.size()];
        while (list.size() > 0) {
            res[list.size() - 1] = list.remove(0);
        }
        return res;
    }

    public String replaceSpace(String s) {
        StringBuilder sbu = new StringBuilder(s);
        for (int i = 0; i < sbu.length(); i++) {
            int code = sbu.codePointAt(i);
            if (code == 32) {
                sbu.replace(i, i + 1, "%20");
                i += 2;
            }
        }
        return sbu.toString();
    }

    public boolean findNumberIn2DArray(int[][] matrix, int target) {
        Integer r1 = null;
        Integer r2 = null;
        int m = matrix.length;
        if (m == 0) return false;
        int n = matrix[0].length;
        if (n == 0) return false;
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] <= target && target <= matrix[i][n - 1]) {
                if (r1 == null) {
                    r1 = i;
                }
                r2 = i;
            }
        }
        Integer x1 = null;
        Integer x2 = null;

        if (r1 == null || r2 == null) return false;
        for (int i = 0; i < n; i++) {
            if (matrix[r1][i] >= target && x1 == null) {
                x1 = i;
            }
            if (matrix[r2][i] >= target && x2 == null) {
                x2 = i;
            }
        }

        for (int i = x2; i <= x1; i++) {
            for (int j = r1; j <= r2; j++) {
                if (matrix[j][i] == target) return true;
            }
        }

        // print r x
        System.out.println(r1 + " " + r2 + " " + x1 + " " + x2);


        return false;
    }

    public <T extends Object> int findIndex(T[] array, ArrayFinder<T> visitor) {
        int left = 0;
        int right = array.length - 1;
        while (right - left > 0) {
            int mid = (left + right) / 2;
            int res = visitor.find(array[mid], mid);
            if (res == 0) return mid;
//            int g = testVo.findIndex(new Integer[]{1, 4, 7, 11, 15}, k ->  {
            if (res > 0) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }


    public int findRepeatNumber(int[] nums) {
        int k = 0;
        for (int i = 0; i < nums.length; i++) {
            k = nums[i];
            if (k == i) continue;
            if (k == nums[k]) return k;
            nums[i] = nums[k];
            nums[k] = k;
            i--;
        }
        return -1;
    }

    public int goodNodes(TreeNode root) {
        return isGoodNode(root, (Integer) root.val);
    }

    public int isGoodNode(TreeNode root, int max) {
        if (root == null) return 0;
        int val = (Integer) root.val;
        int cont = val >= max ? 1 : 0;
        int nexMax = Math.max(max, val);
        if (val < max) return cont;
        return cont + isGoodNode(root.left, nexMax) + isGoodNode(root.right, nexMax);
    }

    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> res = new ArrayList<>();
        if (s.length() < p.length()) return res;
        int[] pArr = new int[26];
        int[] sArr = new int[26];
        for (int i = 0; i < p.length(); i++) {
            pArr[p.charAt(i) - 'a']++;
            sArr[s.charAt(i) - 'a']++;
        }
        if (Arrays.equals(pArr, sArr)) res.add(0);
        for (int i = 1, j = p.length(); j < s.length(); i++, j++) {
            sArr[s.charAt(i - 1) - 'a']--;
            sArr[s.charAt(j) - 'a']++;
            if (Arrays.equals(pArr, sArr)) res.add(i);
        }
        return res;
    }

    public int[] dailyTemperatures(int[] temperatures) {
        //输入: temperatures = [73,74,75,71,69,72,76,73]
        //输出 [1,1,4,2,1,1,0,0]
        int res[] = new int[temperatures.length];
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < temperatures.length; i++) {
            int ti = temperatures[i];
            while (list.size() > 0) {
                int index = list.get(list.size() - 1);
                if (temperatures[index] < ti) {
                    res[index] = i - index;
                    list.remove(list.size() - 1);
                } else {
                    break;
                }
            }
            list.add(i);
        }

        return res;
    }

    public int countSubstrings(String s) {
        int len = s.length();
        // dp[j][i] 表示 s[j] 到 s[i] 是否是回文串
        int[][] dp = new int[len][len];
        dp[0][0] = 1;
        for (int i = 1; i < len; i++) {
            dp[i][i] = 1;
            for (int j = 0; j < i; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    if (i - j == 1) {
                        dp[j][i] = 1;
                    } else {
                        dp[j][i] = dp[j + 1][i - 1];
                    }
                }
            }
        }
        int res = 0;
        for (int[] ints : dp) {
            for (int anInt : ints) {
                res += anInt;
            }
        }
        return res;
    }


    public int leastInterval(char[] tasks, int n) {
        Map<Character, Integer> map = new HashMap<>();
        for (char c : tasks) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }
        List<Integer> contList = new ArrayList<>(map.values());
        Collections.sort(contList);

        int max = contList.get(contList.size() - 1);
        int maxCont = 0;
        for (int i = contList.size() - 1; i >= 0; i--) {
            if (contList.get(i) == max) {
                maxCont++;
            } else {
                break;
            }
        }
        int mxc = (max - 1) * (n + 1) + maxCont;
        return Math.max(mxc, tasks.length);
    }

    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        TreeNode root = new TreeNode();
        if (root1 == null && root2 == null) {
            return null;
        }
        treeCopy(root, root1, root2);
        return root;

    }

    public void treeCopy(TreeNode root, TreeNode<Integer> root1, TreeNode<Integer> root2) {
        Integer val = null;
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

    //输入：nums = [2,6,5,4,8,10,9,15]
    //输入：nums = [2,4,6,3,5,10,9,15]
    //输出：5
    //解释：你只需要对 [4,6,3,5,10,9] 进行升序排序，那么整个表都会变为升序排序。
    public int findUnsortedSubarray(int[] nums) {
        List<Integer> left = new ArrayList<>();
        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;
        int xl = 0;
        int xr = 0;
        left.add(nums[0]);
        List<Integer> right = new ArrayList<>();
        right.add(nums[nums.length - 1]);

        for (int i = 1; i < nums.length; i++) {
            int ni = nums[i];
            if (left.get(left.size() - 1) > ni && ni < min) {
                while (left.size() > 0 && left.get(left.size() - 1) > ni) {
                    left.remove(left.size() - 1);
                }
                min = Math.min(min, ni);
                xl = left.size();
            }
            left.add(nums[i]);
        }

        for (int i = nums.length - 2; i >= 0; i--) {
            int ni = nums[i];
            if (right.get(right.size() - 1) < ni && ni > max) {
                while (right.size() > 0 && right.get(right.size() - 1) < ni) {
                    right.remove(right.size() - 1);
                }
                max = Math.max(max, ni);
                xr = nums.length - right.size();
            }
            right.add(nums[i]);
        }
        // print
        System.out.println(Arrays.toString(left.toArray()));
        System.out.println(Arrays.toString(right.toArray()));
        System.out.println(xl + " " + xr);

        return xr - xl;
    }


    public int subarraySum(int[] nums, int k) {
        int[] sums = new int[nums.length + 1];
        sums[0] = 0;
        for (int i = 0; i < nums.length; i++) {
            sums[i + 1] = nums[i] + sums[i];
        }
        int count = 0;
        for (int i = 0; i < sums.length; i++) {
            for (int j = i + 1; j < sums.length; j++) {
                if (sums[j] - sums[i] == k) count++;
            }
        }
        return count;
    }

    public int diameterOfBinaryTree(TreeNode root) {
        calcNodeHeight(root);
        int max = 0;
        // convert TreeNode to list
        List<TreeNode> list = new ArrayList<>();
        List<TreeNode> stack = new ArrayList<>();
        stack.add(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.remove(0);
            list.add(node);
            if (node.right != null) stack.add(node.right);
            if (node.left != null) stack.add(node.left);
        }

        // calc max
        for (TreeNode node : list) {
            int left = node.left == null ? 0 : node.left.height;
            int right = node.right == null ? 0 : node.right.height;
            max = Math.max(max, left + right);
        }
        return max;
    }

    public void calcNodeHeight(TreeNode node) {
        if (node == null) return;
        calcNodeHeight(node.left);
        calcNodeHeight(node.right);
        node.height = Math.max(node.left == null ? 0 : node.left.height, node.right == null ? 0 : node.right.height) + 1;
    }


    // visit by callback
    private void visit(TreeNode root, Visitor<TreeNode> callback) {
        // create a list
        List<TreeNode> list = new ArrayList<>();
        // add root to list
        this.av(root, list);
        // while list is not empty
        while (!list.isEmpty()) {
            // pop last node
            TreeNode node = list.remove(list.size() - 1);
            // visit node
            callback.visit(node);
            // add left tree stack to list
            this.av(node.left, list);
        }
    }

    private void av(TreeNode node, List<TreeNode> list) {
        // add right tree stack to list
        while (node != null) {
            list.add(node);
            node = node.right;
        }

    }

    public TreeNode convertBST(TreeNode root) {
        // create a list
        List<TreeNode> list = new ArrayList<>();
        // add root to list
        this.av(root, list);
        int sum = 0;
        // while list is not empty
        while (!list.isEmpty()) {
            // pop last node
            TreeNode<Integer> node = list.remove(list.size() - 1);
            sum += node.val;
            node.val = sum;
            // add left tree stack to list
            this.av(node.left, list);
        }
        return root;
    }

    public int findTargetSumWays(int[] nums, int target) {
        int sum = Arrays.stream(nums).sum();
        int neg = (sum - target) / 2;
        if (neg < 0 || (sum - target) % 2 != 0) return 0;
        // dp[s][i] 表示前i个数中和为s的方案数
        int[][] dp = new int[neg + 1][nums.length + 1];
        dp[0][0] = 1;
        for (int s = 0; s <= neg; s++) {
            for (int i = 1; i <= nums.length; i++) {
                int ni = nums[i - 1];
                if (ni <= s) {
                    //         选i                  不选i
                    dp[s][i] = dp[s - ni][i - 1] + dp[s][i - 1];
                } else {
                    // 不选
                    dp[s][i] = dp[s][i - 1];
                }
            }
        }
        // print dp
        for (int i = 0; i < dp.length; i++) {
            System.out.println(Arrays.toString(dp[i]));
        }
        return dp[neg][nums.length];
    }

    public List<Integer> findDisappearedNumbers(int[] nums) {
        List<Integer> list = new ArrayList<>(nums.length);
        for (int i = 0; i < nums.length; i++) {
            int temp = nums[i];
            while (temp != i + 1) {
                if (nums[temp - 1] == temp) {
                    break;
                }
                System.out.println("i: " + i + " temp: " + temp + " nums: " + Arrays.toString(nums));

                nums[i] = nums[temp - 1];
                nums[temp - 1] = temp;
                temp = nums[i];
                System.out.println(Arrays.toString(nums));

            }
        }
        System.out.println(Arrays.toString(nums));

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != i + 1) {
                list.add(i + 1);
            }
        }
        return list;
    }
}

class TreeNode<T> {
    T val;
    int height;
    TreeNode<T> left;
    TreeNode<T> right;

    TreeNode() {
    }

    public String toListString() {
        List<T> list = new ArrayList<>();
        List<TreeNode<T>> stack = new ArrayList<>();
        stack.add(this);
        while (!stack.isEmpty()) {
            TreeNode<T> node = stack.remove(0);
            list.add(node.val);
            if (node.right != null) stack.add(node.right);
            if (node.left != null) stack.add(node.left);
        }
        return list.toString();
    }

    public String toLevelString() {
        List<T> list = new ArrayList<>();
        List<TreeNode<T>> stack = new ArrayList<>();
        stack.add(this);
        while (!stack.isEmpty()) {
            TreeNode<T> node = stack.remove(0);
            if (node == null) {
                list.add(null);
            } else {
                list.add(node.val);
                stack.add(node.left);
                stack.add(node.right);
            }
        }
        return list.toString();
    }

    TreeNode(T val) {
        this.val = val;
    }

    TreeNode(T val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    // build a tree with list
    public static <T> TreeNode build(List<T> list) {
        if (list == null || list.size() == 0) return null;
        TreeNode root = new TreeNode(list.get(0));
        HashMap<Integer, TreeNode> map = new HashMap<>();
        map.put(0, root);
        for (int i = 1; i < list.size(); i++) {
            if (list.get(i) == null) continue;
            TreeNode node = new TreeNode(list.get(i));
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

}

@FunctionalInterface
interface Visitor<T> {
    void visit(T t);
}

@FunctionalInterface
interface ArrayFinder<T> {
    abstract int find(T t, int index);
}

class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }
}

// 1 2 3
class CQueue {

    private Stack<Integer> full = new Stack<>();
    private Stack<Integer> empty = new Stack<>();

    public CQueue() {

    }

    public void appendTail(int value) {
        while (!full.isEmpty()) {
            empty.push(full.pop());
        }
        full.push(value);
        while (!empty.isEmpty()) {
            full.push(empty.pop());
        }
    }

    public int deleteHead() {
        if (full.isEmpty()) return -1;
        return full.pop();
    }
}