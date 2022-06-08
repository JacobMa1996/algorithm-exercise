// 题目：https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    const len = nums.length;
    const dp = new Array(len).fill({
        max: nums[0],
        back: nums[0],
    });

    for (let i = 1; i < len; i++) {
        const { max, back } = dp[i - 1];
        const x = nums[i];

        dp[i].back = Math.max(back + x, x);
        dp[i].max = Math.max(max, dp[i].back);
    }

    return dp[len - 1].max;
};

console.log(maxSubArray([8, -19, 5, -4, 20]));

// 方法二 还少一种 todo