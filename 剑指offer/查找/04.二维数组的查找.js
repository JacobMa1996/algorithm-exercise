// 题目 https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/

/** 解法一 逐行二分查找
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
    if (!matrix.length || !matrix[0].length) return false;
    const binarySearch = (nums, target) => {
        let left = 0,
            right = nums.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] == target) return true;
            if (nums[mid] > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return false;
    };
    for (let i = 0; i < matrix.length; i++) {
        if (binarySearch(matrix[i], target)) {
            return true;
        }
    }
    return false;
};

/** 解法二 二叉搜索树
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray2 = function (matrix, target) {
    if (!matrix.length || !matrix[0].length) return false
    let x = matrix.length - 1, y = 0
    
    while (x >= 0 && y < matrix[0].length) {
        if (matrix[x][y] === target) return true

        if (matrix[x][y] > target) {
            x -= 1
        } else {
            y += 1
        }
    }
    return false
};

const testData = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
];

// console.log(findNumberIn2DArray(testData, 99));
console.log(findNumberIn2DArray2(testData, 20));
