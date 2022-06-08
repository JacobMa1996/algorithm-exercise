// 生成从l到r的数量为n的随机数组
function randomArr(n, l, r) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        let _random = Math.round(l + Math.random() * (r - l));
        arr.push(_random);
    }
    return arr;
}
// function buddleSort(arr) {
//     let len = arr.length;
//     for (let i = len; i >= 2; i--) {
//         for (let j = 0; j < i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             }
//         }
//     }
//     return arr;
// }

// 冒泡排序
function sort1(arr) {
    const array = [...arr];
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array
}

// 冒泡排序，减少第二次循环次数
function sort2(arr) {
    const array = [...arr];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array
}
const arr = randomArr(10, 5, 100)
console.log(arr)
console.log(sort1(arr))
console.log(sort2(arr))
