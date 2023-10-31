//请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。 
//
// 实现词典类 WordDictionary ： 
//
// 
// WordDictionary() 初始化词典对象 
// void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配 
// bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回 false 。word 中可能包含一些 
//'.' ，每个 . 都可以表示任何一个字母。 
// 
//
// 
//
// 示例： 
//
// 
//输入：
//["WordDictionary","addWord","addWord","addWord","search","search","search",
//"search"]
//[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
//输出：
//[null,null,null,null,false,true,true,true]
//
//解释：
//WordDictionary wordDictionary = new WordDictionary();
//wordDictionary.addWord("bad");
//wordDictionary.addWord("dad");
//wordDictionary.addWord("mad");
//wordDictionary.search("pad"); // 返回 False
//wordDictionary.search("bad"); // 返回 True
//wordDictionary.search(".ad"); // 返回 True
//wordDictionary.search("b.."); // 返回 True
// 
//
// 
//
// 提示： 
//
// 
// 1 <= word.length <= 25 
// addWord 中的 word 由小写英文字母组成 
// search 中的 word 由 '.' 或小写英文字母组成 
// 最多调用 10⁴ 次 addWord 和 search 
// 
//
// Related Topics 深度优先搜索 设计 字典树 字符串 👍 528 👎 0


package leetcode.editor.cn.Q211;

import java.util.ArrayList;
import java.util.List;

//leetcode submit region begin(Prohibit modification and deletion)
class TireNode {
    public static final int SIZE = 26;
    public TireNode[] children = null;
    public int endCont = 0;
    public int cont = 0;
    public char val;

    public TireNode(char v) {
        children = new TireNode[SIZE];
        val = v;
    }
}

class WordDictionary {
    TireNode root;

    public WordDictionary() {
        root = new TireNode('.');
    }

    public void addWord(String word) {
        TireNode cur = root;
        for (int i = 0; i < word.length(); i++) {
            int idx = word.charAt(i) - 'a';
            if (cur.children[idx] == null) {
                cur.children[idx] = new TireNode(word.charAt(i));
            }
            cur.cont++;
            cur = cur.children[idx];
        }
        cur.endCont++;
        cur.cont++;
    }

    private String word;

    public boolean search(String word) {
        this.word = word;
        return search(root, 0);
    }

    private boolean search(TireNode node, int i) {
        boolean isEnd = i == word.length() - 1;

        if (word.charAt(i) == '.') {
            boolean hit = false;
            for (TireNode child : node.children) {
                if (child != null && child.cont > 0) {
                    if (isEnd) {
                        if (child.endCont > 0) return true;
                    } else {
                        hit = hit || search(child, i + 1);
                    }

                }
            }
            return hit;
        } else {
            int idx = word.charAt(i) - 'a';
            TireNode child = node.children[idx];
            if (child != null && child.cont > 0) {
                if (isEnd){
                    if (child.endCont > 0) return true;
                } else {
                    return search(child, i + 1);
                }
            }
        }
        return false;
    }
}

// adbck
// acbck
// adcck

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary obj = new WordDictionary();
 * obj.addWord(word);
 * boolean param_2 = obj.search(word);
 */
//leetcode submit region end(Prohibit modification and deletion)


class QTest {
    public static void main(String[] args) {
//        Solution solution = new Solution();
        System.out.println(".".codePointAt(0));
        System.out.println((int) 'a');
//        ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
//			[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
//        String[] methodList = new String[]{"WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search"};
//        String[] valList = new String[]{"", "bad", "dad", "mad", "pad", "bad", ".ad", "b.."};
//        ["WordDictionary","addWord","addWord","addWord","addWord","search","search","addWord","search","search","search","search","search","search"]
//			[[],["at"],["and"],["an"],["add"],["a"],[".at"],["bat"],[".at"],["an."],["a.d."],["b."],["a.d"],["."]]
        String[] methodList = new String[]{"WordDictionary", "addWord", "addWord", "addWord", "addWord", "search", "search", "addWord", "search", "search", "search", "search", "search", "search"};
        String[] valList = new String[]{"", "at", "and", "an", "add", "a", ".at", "bat", ".at", "an.", "a.d.", "b.", "a.d", "."};

        new QTest().test(methodList, valList);
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

