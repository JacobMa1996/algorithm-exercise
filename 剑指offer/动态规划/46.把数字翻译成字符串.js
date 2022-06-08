// 题目 https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/

/** 动态规划
 * @param {number} num
 * @return {number}
 */
var translateNum = function (num) {
    const nums = num.toString();
    const len = nums.length;

    let dp = new Array(len).fill(0);

    for (let i = 0; i < len; i++) {
        let comp = Number(nums[i - 1] + nums[i]);
        let valid = comp >= 10 && comp <= 25;

        if (i == 0) {
            dp[i] = 1;
            continue;
        }

        if (i == 1) {
            dp[i] = valid ? 2 : 1;
            continue;
        }

        if (valid) {
            dp[i] = dp[i - 1] + dp[i - 2];
        } else {
            dp[i] = dp[i - 1];
        }
    }

    return dp[len - 1];
};

/** 滑动数组优化
 * @param {number} num
 * @return {number}
 */
var translateNum2 = function (num) {
    const nums = num.toString();
    const len = nums.length;

    // p存储 n-2的最大值
    // q存储 n-1的最大值
    // r存储 n的最大值
    let p = 0,
        q = 0,
        r = 1;

    for (let i = 0; i < len; i++) {
        p = q;
        q = r;
        if (i == 0) {
            continue;
        }

        let comb = Number(nums[i - 1] + nums[i]);
        if (comb >= 10 && comb <= 25) {
            r = q + p;
        } else {
            r = q;
        }
    }
    return r;
};

console.log(translateNum(12258));
console.log(translateNum2(12258));
