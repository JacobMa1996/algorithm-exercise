// 题目：https://leetcode.cn/problems/number-of-islands/

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let count = 0;
    const dfs = (x, y) => {
        if (
            x < 0 ||
            y < 0 ||
            x > grid.length - 1 ||
            y > grid[0].length - 1 ||
            grid[x][y] == "0"
        ) {
            return;
        }

        grid[x][y] = "0";
        dfs(x + 1, y);
        dfs(x, y + 1);
        dfs(x - 1, y);
        dfs(x, y - 1);
    };

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            // console.log(i, j);
            if (grid[i][j] == "1") {
                console.log(grid);
                dfs(i, j);
                console.log(grid);
                count++;
            }
        }
    }

    return count;
};

const grid = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["0", "0", "1", "1", "0"],
    ["0", "0", "0", "1", "1"],
];

const result = numIslands(grid);
console.log(result);
