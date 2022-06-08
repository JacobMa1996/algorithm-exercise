// 题目 https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/
/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function (nums) {
    return nums
        .sort((a, b) => {
            return `${a}${b}` - `${b}${a}`;
        })
        .join("");
};

console.log(minNumber([3, 30, 34, 5, 9]));
