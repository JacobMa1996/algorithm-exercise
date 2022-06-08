// 题目 https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/

/** 解法1，时间复杂度O(n)，空间复杂度O(n)
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function (nums) {
    const arr1 = [],
        arr2 = [];

    nums.forEach((n) => {
        console.log(n, n % 2);
        if (n % 2 == 0) {
            arr2.push(n);
        } else {
            arr1.push(n);
        }
    });

    console.log(arr1, arr2);

    return arr1.concat(arr2);
};

/** 解法2，时间复杂度O(n)，空间复杂度O(1)
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange2 = function (nums) {
    let i = 0,
        j = nums.length - 1,
        temp = null;

    while (i < j) {
        if (nums[i] % 2 != 0) {
            i++;
            continue;
        }
        if (nums[j] % 2 == 0) {
            j--;
            continue;
        }
        temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    return nums;
};
