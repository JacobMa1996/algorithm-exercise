function add() {
    let args = [...arguments];

    function fn() {
        args = [...args, ...arguments];
        return fn;
    }

    fn.toString = function () {
        return args.reduce((a, b) => {
            return a + b;
        }, 0);
    };

    return fn;
}

console.log("" + add(1)(2)(3)); // 6
console.log("" + add(1, 2, 3)(4)); // 10
console.log("" + add(1)(2)(3)(4)(5)); // 15
console.log("" + add(2, 6)(1)); // 9
console.log("" + add(1)); // 1
