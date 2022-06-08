// 题目 https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
    // let anyNums = 0

    // const constant = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    nums = nums.sort((a, b) => a - b).filter((it) => it != 0);
    console.log(nums);
    return (
        nums[nums.length - 1] - nums[0] == 4 &&
        [...new Set(nums)].length == nums.length
    );
};

console.log(isStraight([12, 10, 1, 5, 13]));
