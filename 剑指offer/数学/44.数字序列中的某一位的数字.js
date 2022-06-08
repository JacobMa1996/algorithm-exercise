// 题目 https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/submissions/

/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function (n) {
    if (n < 10) return n;

    let x = 1,
        pre = 0,
        next = 10;

    while (next < n + 1) {
        x++;
        pre = next;
        next += x * 9 * Math.pow(10, x - 1);
    }

    console.log(pre, next)

    for (let i = pre; i < next; i = i + x) {
        if (i <= n && i + x > n) {
            console.log(i, n)
            let cur = Math.pow(10, x - 1) + (i - pre) / x;
            console.log(cur)
            // for (let j = 0; j < n - i; j++) {
            //     cur
            // }

            return cur.toString()[n - i];
        }
    }
};

const res = findNthDigit(11)

console.log(res)