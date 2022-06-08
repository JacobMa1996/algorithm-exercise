// 深度优先遍历
function deepClone(obj) {
    if (!obj || typeof obj != "object") return obj;

    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);

    let res = obj instanceof Array ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            res[key] = deepClone(obj[key]);
        }
    }

    return res;
}

// 广度优先遍历
function deepClone(obj) {
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    let res = obj instanceof Array ? [] : {};
    let queue = [[obj, res]];

    while (queue.length) {
        let [origin, target] = queue.shift();
        for (let key in origin) {
            if (origin.hasOwnProperty(key)) {
                if (origin[key] instanceof Date) target[key] = new Date(origin);
                if (origin[key] instanceof RegExp)
                    target[key] = new RegExp(origin);
                if (typeof origin[key] != "object" || !origin[key]) {
                    target[key] = origin[key];
                } else {
                    target[key] = origin[key] instanceof Array ? [] : {};
                    queue.push([origin[key], target[key]]);
                }
            }
        }
    }

    return res;
}

console.log(deepClone([1, 2, { a: [3, 4] }]));