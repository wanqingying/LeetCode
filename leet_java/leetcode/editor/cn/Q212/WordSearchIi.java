//给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words， 返回所有二维网格上的单词 。 
//
// 单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使
//用。 
//
// 
//
// 示例 1： 
// 
// 
//输入：board = [
// ["o","a","a","n"],
// ["e","t","a","e"],
// ["i","h","k","r"],
// ["i","f","l","v"]],
// words = ["oath","pea","eat","rain"]
//输出：["eat","oath"]
// 
//
// 示例 2： 
// 
// 
//输入：board = [["a","b"],["c","d"]], words = ["abcb"]
//输出：[]
// 
//
// 
//
// 提示： 
//
// 
// m == board.length 
// n == board[i].length 
// 1 <= m, n <= 12 
// board[i][j] 是一个小写英文字母 
// 1 <= words.length <= 3 * 10⁴ 
// 1 <= words[i].length <= 10 
// words[i] 由小写英文字母组成 
// words 中的所有字符串互不相同 
// 
//
// Related Topics 字典树 数组 字符串 回溯 矩阵 👍 809 👎 0


package leetcode.editor.cn.Q212;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//leetcode submit region begin(Prohibit modification and deletion)


class TireNode {
    public static final int SIZE = 26;
    public TireNode[] children = null;
    public int end = 0;
    public int cont = 0;

    public TireNode() {
        children = new TireNode[SIZE];
    }
}

class WordDictionary {
    TireNode root;

    public WordDictionary() {
        root = new TireNode();
    }

    public void addWord(String word) {
        TireNode cur = root;
        for (int i = 0; i < word.length(); i++) {
            int idx = word.charAt(i) - 'a';
            if (cur.children[idx] == null) {
                cur.children[idx] = new TireNode();
            }
            cur.cont++;
            cur = cur.children[idx];
        }
        cur.end++;
        cur.cont++;
    }

    public void remove(String word) {
        TireNode cur = root;
        for (int i = 0; i < word.length(); i++) {
            int idx = word.charAt(i) - 'a';
            cur.cont--;
            cur = cur.children[idx];
            if (cur == null) return;
        }
        cur.end--;
        cur.cont--;
    }

    private String word;

    // 1完全匹配 2前缀匹配 3不匹配
    public int search(String word) {
        this.word = word;
        return search(root, 0);
    }

    private int search(TireNode node, int i) {
        boolean isEnd = i == word.length() - 1;
        int idx = word.charAt(i) - 'a';
        TireNode child = node.children[idx];
        if (isEnd && child != null && child.end > 0) return 1;
        if (isEnd && child != null) return 2;
        if (child == null) return 3;
        return search(child, i + 1);
    }
}


class Solution {
    private char[][] board;
    public WordDictionary wdc;
    public List<String> res;
    public boolean[] boardChars = new boolean[12 * 12];


    public boolean exist(char ch) {
        int idx = ch - 'a';
        return boardChars[idx];
    }


    public void initBoard(char[][] board) {
        this.board = board;
        for (char[] chars : board) {
            for (int j = 0; j < board[0].length; j++) {
                char ch = chars[j];
                int idx = ch - 'a';
                boardChars[idx] = true;
            }
        }
    }

    public void initWdc(String[] words) {
        this.wdc = new WordDictionary();
        for (String word : words) {
            for (int i = 0; i < word.length(); i++) {
                if (!exist(word.charAt(i))) break;
            }
            wdc.addWord(word);
        }
    }


    public List<String> findWords(char[][] board, String[] words) {
        //输入：board = [
        // ["o","a","a","n"],
        // ["e","t","a","e"],
        // ["i","h","k","r"],
        // ["i","f","l","v"]],
        // words = ["oath","pea","eat","rain"]
        //输出：["eat","oath"]
        this.res = new ArrayList<>();
        this.wdc = new WordDictionary();
        this.initBoard(board);
        this.initWdc(words);

        // for ij
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                search(i, j, "");
            }
        }
        return res;
    }

    public void search(int x, int y, String prefix) {
        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) return;
        // 重复路径
        if (board[x][y] == 0) return;
        char tmp = board[x][y];
        String str = prefix + board[x][y];
        int ws = wdc.search(str);
        if (ws == 3) return;
        if (ws == 1) {
            res.add(str);
            wdc.remove(str);
        }
        board[x][y] = 0;
        search(x + 1, y, str);
        search(x - 1, y, str);
        search(x, y + 1, str);
        search(x, y - 1, str);
        board[x][y] = tmp;

    }
}

//leetcode submit region end(Prohibit modification and deletion)


class TestSuit {
    private char[][] board;
    private String[] words;
    private List<String> ans;
    private List<String> res;

    public TestSuit(char[][] board, String[] words, List<String> ans) {
        this.board = board;
        this.words = words;
        this.ans = ans;
    }

    public void test() {
        res = new Solution().findWords(board, words);
        boolean isOk = true;
        if (ans.size() != res.size()) {
            isOk = false;
        } else {
            for (String s : ans) {
                if (!res.contains(s)) {
                    isOk = false;
                    break;
                }
            }
        }
        if (isOk) {
            System.out.println("测试通过");
        } else {
            System.out.println("测试失败");
            System.out.println("board:");
            for (char[] chars : board) {
                System.out.println(Arrays.toString(chars));
            }
            System.out.println("words:" + Arrays.toString(words));
            System.out.println("ans:" + ans);
            System.out.println("res:" + res);
        }
    }

}

class QTest {
    public static void main(String[] args) {
//        测试用例:[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
//			["oath","pea","eat","rain","oathi","oathk","oathf","oate","oathii","oathfi","oathfii"]
//        期望结果:["oath","oathk","oathf","oathfi","oathfii","oathi","oathii","oate","eat"]
        TestSuit testSuit7 = new TestSuit(new char[][]{
                {'o', 'a', 'a', 'n'},
                {'e', 't', 'a', 'e'},
                {'i', 'h', 'k', 'r'},
                {'i', 'f', 'l', 'v'}}, new String[]{"oath", "oathk", "pea", "eat", "rain", "oathi", "oathf", "oate", "oathii", "oathfi", "oathfii"}, Arrays.asList("oath", "oathk", "oathf", "oathfi", "oathfii", "oathi", "oathii", "oate", "eat"));
        testSuit7.test();
//        测试用例:[["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"],["a","a","a","a","a","a","a","a","a","a","a","a"]]
//			["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]
//        期望结果:["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]
        TestSuit testSuit = new TestSuit(new char[][]{
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'}}, new String[]{"a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"}, Arrays.asList("a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"));
        testSuit.test();
        TestSuit testSuit6 = new TestSuit(new char[][]{
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'},
                {'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'}}, new String[]{"aaaaaaaag", "aaaaaaaar", "aaaaaaaac", "aaaaaaaaah", "aaaaao", "aaaaaac", "aaaaaaan", "aaaaaaaax", "aaaaaaaaa", "aaaaaaaaaa"}, Arrays.asList("aaaaaaaaa", "aaaaaaaaaa"));
        testSuit6.test();
//        测试用例:[["a","b","c"],["a","e","d"],["a","f","g"]]
//			["eaafgdcba","eaabcdgfa"]
//        期望结果:["eaabcdgfa","eaafgdcba"]
        TestSuit testSuit5 = new TestSuit(new char[][]{
                {'a', 'b', 'c'},
                {'a', 'e', 'd'},
                {'a', 'f', 'g'}}, new String[]{"eaafgdcba", "eaabcdgfa"}, Arrays.asList("eaabcdgfa", "eaafgdcba"));
        testSuit5.test();
        TestSuit testSuit52 = new TestSuit(new char[][]{
                {'a', 'b', 'c'},
                {'a', 'e', 'd'},
                {'a', 'f', 'g'}}, new String[]{"eaafgdcba", "eaabcdgfa"}, Arrays.asList("eaabcdgfa", "eaafgdcba"));
        testSuit52.test();

        char[][] board = new char[][]{
                {'o', 'a', 'b', 'n'},
                {'o', 'a', 'a', 'e'},
                {'a', 'a', 'k', 'r'},
                {'a', 'f', 'l', 'v'}};
        String[] words = new String[]{"oa", "oaa", "akrv", "aklfhk", "aklfh", "aaaa", "aa", "a", "aaa"};
        TestSuit testSuit1 = new TestSuit(board, words, Arrays.asList("oa", "oaa", "akrv", "aaaa", "aa", "a", "aaa"));
        testSuit1.test();
//        测试用例:[["o","a","b","n"],["o","t","a","e"],["a","h","k","r"],["a","f","l","v"]]
//			["oa","oaa"]
//        测试结果:["oa","oa","oaa"]
//        期望结果:["oa","oaa"]
        TestSuit testSuit2 = new TestSuit(new char[][]{
                {'o', 'a', 'b', 'n'},
                {'o', 't', 'a', 'e'},
                {'a', 'h', 'k', 'r'},
                {'a', 'f', 'l', 'v'}}, new String[]{"oa", "oaa"}, Arrays.asList("oa", "oaa"));
        testSuit2.test();
//        测试用例:[["a","b","c"],["a","e","d"],["a","f","g"]]
//			["abcdefg","gfedcbaaa","eaabcdgfa","befa","dgc","ade"]
//        期望结果:["abcdefg","befa","eaabcdgfa","gfedcbaaa"]
        TestSuit testSuit3 = new TestSuit(new char[][]{
                {'a', 'b', 'c'},
                {'a', 'e', 'd'},
                {'a', 'f', 'g'}}, new String[]{"abcdefg", "gfedcbaaa", "eaabcdgfa", "befa", "dgc", "ade"}, Arrays.asList("abcdefg", "befa", "eaabcdgfa", "gfedcbaaa"));
        testSuit3.test();
//        测试用例:[["a","b"],["a","a"]]
//			["aba","baa","bab","aaab","aaa","aaaa","aaba"]
//        期望结果:["aba","aaa","aaab","baa","aaba"]
        TestSuit testSuit41 = new TestSuit(new char[][]{
                {'a', 'b'},
                {'a', 'a'}}, new String[]{"aba", "baa", "bab", "aaab", "aaa", "aaaa", "aaba"}, Arrays.asList("aba", "aaa", "aaab", "baa", "aaba"));
        testSuit41.test();
        TestSuit testSuit43 = new TestSuit(new char[][]{
                {'a', 'b'},
                {'a', 'a'}}, new String[]{"aaa", "bab"}, Arrays.asList("aaa"));
        testSuit43.test();
        TestSuit testSuit4 = new TestSuit(new char[][]{
                {'a', 'b'},
                {'a', 'a'}}, new String[]{"aaa", "aaab"}, Arrays.asList("aaab", "aaa"));
        testSuit4.test();


    }
}

class QTest2 {
    public static void main(String[] args) {
        System.out.println("abc".substring(0, 1));
        WordDictionary wdc = new WordDictionary();
        String[] strs = new String[]{"oath", "oathk", "pea", "eat", "rain", "oathi", "oathf", "oate", "oathii", "oathfi", "oathfii"};
        for (String str : strs) {
            wdc.addWord(str);
        }
        System.out.println(wdc.search("oath"));
        System.out.println(wdc.search("oat"));
        System.out.println(wdc.search("oathk"));

    }

    public void test(String[] methodList, String[] valList) {
        List<String> res = new ArrayList<>();
        WordDictionary wordDictionary = new WordDictionary();
        for (int i = 0; i < methodList.length; i++) {
            String method = methodList[i];
            String val = valList[i];
            switch (method) {
                case "addWord":
                    wordDictionary.addWord(val);
                    res.add(null);
                    break;
                case "search":
                    res.add(String.valueOf(wordDictionary.search(val)));
                    break;
            }
        }
        System.out.println(res);
    }
}

