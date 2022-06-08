// 题目 https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/

class Node {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

function createTree(arr, index = 0) {
    if (index > arr.length) {
        return null;
    }
    if (arr[index] == null) {
        return null;
    }
    const node = new Node(arr[index]);
    node.left = createTree(arr, index * 2 + 1);
    node.right = createTree(arr, index * 2 + 2);
    return node;
}

const root = createTree([1, 2, 2, null, 3, null, 3]);

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isSymmetric = function (root) {
    if (!root) return true
    let queue = [root.left, root.right]

    while (queue.length) {
        let newQueue = []
        let l = 0, r = queue.length - 1
        while (l < r) {
            if (
                (queue[l] && !queue[r]) ||
                (!queue[l] && queue[r]) ||
                (queue[l] && queue[r] && queue[l].val != queue[r].val)
            ) {
                return false
            }

            l++
            r--
        }

        for (let node of queue) {
            if (node) {
                newQueue.push(node.left)
                newQueue.push(node.right)
            }
        }

        queue = newQueue
    }

    return true
};

console.log(isSymmetric(root));
