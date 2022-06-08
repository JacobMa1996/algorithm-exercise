const TEST_ARRAY = [
    {
        id: 1,
        name: "父-1",
        children: [
            {
                id: 11,
                name: "父1-1",
                children: [
                    {
                        id: 111,
                        name: "子111",
                    },
                    {
                        id: 112,
                        name: "子112",
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        name: "父-2",
        children: [
            {
                id: 21,
                name: "父2-1",
                children: [
                    {
                        id: 211,
                        name: "子211",
                    },
                ],
            },
        ],
    },
];

function testFunc(array, id) {
    let res = [];
    const dfs = (arr, temp) => {
        if (!arr) return;
        arr.some((it) => {
            if (it.id === id) {
                res = temp;
            } else {
                dfs(it.children, temp.concat([it.id]));
            }
        });
    };

    dfs(array, [])

    return res;
}

const res = testFunc(TEST_ARRAY, 11);
console.log(res);
