// 题目 https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/

/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function (pushed, popped) {
    if (!popped.length) return true;

    if (!pushed.length) return false;
    const stack = [];

    while (popped.length) {
        // curPush = stack[stack.length - 1]
        if (popped[0] == stack[stack.length - 1]) {
            stack.pop();
            popped.shift();
        } else {
            if (!pushed.length) return false;
            stack.push(pushed.shift());
        }
    }

    return true;
};

const result = validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]);
console.log(result)