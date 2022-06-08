// 题目 https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** 解法一，时间空间复杂度太高
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */
var pathSum = function (root, target) {
    if (!root) return [];
    const result = [];
    const dfs = (node, target, temp) => {
        temp.push(node.val);
        if (!node.left && !node.right) {
            console.log(temp);
            if (sum(temp) == target) result.push(temp);
        }

        if (node.left) dfs(node.left, target, clone(temp));

        if (node.right) dfs(node.right, target, clone(temp));
    };

    const clone = (array) => {
        return array.map((it) => it);
    };

    const sum = (array) => {
        let num = 0;
        array.forEach((it) => (num += it));
        return num;
    };

    dfs(root, target, []);

    return result;
};

/**解法二，先序遍历
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */
var pathSum = function (root, target) {
    const result = [],
        path = [];

    const clone = (array) => {
        return array.map((it) => it);
    };

    const dfs = (node, tar) => {
        if (!node) return;

        path.push(node.val);

        tar -= node.val;

        if (tar == 0 && !node.left && !node.right) {
            result.push(clone(path));
        }

        dfs(node.left, tar);
        dfs(node.right, tar);

        path.pop();
    };

    dfs(root, target);

    return result;
};
