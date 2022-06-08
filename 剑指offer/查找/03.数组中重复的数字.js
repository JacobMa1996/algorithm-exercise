// 题目：https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/

/** 解法一：hash map
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
    let hash = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (hash.get(nums[i])) {
            return nums[i];
        } else {
            hash.set(nums[i], true);
        }
    }
};

/** 解法二 原地置换
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber2 = function (nums) {
    let temp;
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] !== i) {
            temp = nums[i];
            if (nums[i] === nums[temp]) return nums[i];

            nums[i] = nums[temp];
            nums[temp] = temp;
        }
    }
    return -1;
};

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]));
console.log(findRepeatNumber2([2, 3, 1, 0, 2, 5, 3]));
