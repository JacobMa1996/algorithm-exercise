// 题目 https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/

/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function (m, n, k) {
    let matrix = new Array(m).fill(0).map((it) => new Array(n).fill(false));
    // console.log(matrix);
    let sum = 0,
        times = 0;

    const get = (x) => {
        let num = 0;
        while (x) {
            num += x % 10;
            x = Math.floor(x / 10);
        }
        return num;
    };

    const dfs = (i, j, k) => {
        // console.log(i, j, matrix);
        if (i < 0 || i > m - 1 || j < 0 || j > n - 1 || matrix[i][j]) return;
        times++;
        // console.log(i, j, Number(get(Number(i)) + get(Number(j))));
        matrix[i][j] = true;
        // let num = 0;
        // i.toString()
        //     .split("")
        //     .forEach((it) => (num += Number(it)));
        // j.toString()
        //     .split("")
        //     .forEach((it) => (num += Number(it)));
        if (get(i) + get(j) <= k) {
            sum += 1;
            // console.log(i, j, get(i) + get(j));
            dfs(i + 1, j, k);
            dfs(i, j + 1, k);
        }

        // dfs(i + 1, j, k);
        // dfs(i - 1, j, k);
        // dfs(i, j + 1, k);
        // dfs(i, j - 1, k);
    };

    dfs(0, 0, k);

    console.log(times);

    return sum;
};

const res = movingCount(16, 8, 4);

console.log(res);
