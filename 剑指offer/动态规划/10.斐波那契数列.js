// 题目 https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/

/** 直接递归会超时
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    if (n == 0) {
        return 0;
    }

    if (n == 1) {
        return 1;
    }

    return fib(n - 1) + (fib(n - 2) % 1000000007);
};

/** 方法二 滚动数组
 * @param {number} n
 * @return {number}
 */
var fib2 = function (n) {
    if (n == 0) {
        return 0;
    }

    if (n == 1) {
        return 1;
    }

    let p = 0,
        q = 0,
        r = 1;

    for (let i = 2; i <= n; i++) {
        p = q;
        q = r;
        r = (p + q) % 1000000007;
    }

    return r;
};

/** 方法二 矩阵快速幂运算
 * @param {number} n
 * @return {number}
 */
var fib3 = function (n) {
    if (n < 2) return n;

    // 幂运算
    const pow = (M, n) => {
        if (n == 0) {
            return [
                [1, 0],
                [0, 1],
            ];
        }
        let y = pow(M, Math.floor(n / 2));

        if (n % 2 == 0) {
            return multiply(y, y);
        } else {
            return multiply(multiply(y, y), M);
        }

        // let ret = [
        //     [1, 0],
        //     [0, 1],
        // ];
        // while (n > 0) {
        //     if ((n & 1) === 1) {
        //         ret = multiply(ret, M);
        //     }
        //     n >>= 1;
        //     M = multiply(M, M);
        // }
        // return ret;
    };

    // 矩阵乘法
    const multiply = (a, b) => {
        const c = new Array(2).fill(0).map(() => {
            return new Array(2).fill(0);
        });

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                c[i][j] =
                    (BigInt(a[i][0]) * BigInt(b[0][j]) +
                        BigInt(a[i][1]) * BigInt(b[1][j])) %
                    BigInt(1000000007);
            }
        }
        return c;
    };

    const M = [
        [1, 1],
        [1, 0],
    ];
    const res = pow(M, n - 1);

    return res[0][0];
};

console.log(fib3(2));
