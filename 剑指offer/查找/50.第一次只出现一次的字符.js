// 题目 https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/

// hash有一个 entris方法，可以返回按照set顺序的迭代器

/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
    if (s.length == 0) return " ";
    const hash = new Map();
    for (let i = 0; i < s.length; i++) {
        hash.set(s[i], (hash.get(s[i]) || 0) + 1);
    }

    for (let [key, value] of hash.entries()) {
        if (value === 1) {
            return key;
        }
    }
    return " ";
};
