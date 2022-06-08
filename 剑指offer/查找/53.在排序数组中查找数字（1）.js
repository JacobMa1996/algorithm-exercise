// 题目 https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/

/** 解法一 遍历 时间复杂度 O(logn)
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let num = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > target) return num;

        if (nums[i] === target) num++;
    }
    return num;
};

/**
 * 二分法查找数组中元素的位置
 * @param {Array} nums 数组
 * @param {Number} target 目标数字
 * @param {Boolean} lower 是否查找小的，如果 lower为true，则查找第一个大于等于 target 的下标，否则查找第一个大于 target 的下标。
 */
const binarySearch = (nums, target, lower) => {
    let left = 0,
        right = nums.length - 1,
        ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};

/**
 * 解法二：二分法查找，时间复杂度 O(logn)
 * @param {*} nums
 * @param {*} target
 * @returns
 */
const search = (nums, target) => {
    let ans = 0;
    const leftIndex = binarySearch(nums, target, true);
    const rightIndex = binarySearch(nums, target, false) - 1;
    if (leftIndex <= rightIndex) {
        ans = rightIndex - leftIndex + 1;
    }
    return ans;
};
