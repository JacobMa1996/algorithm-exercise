// 生成从l到r的数量为n的随机数组
function randomArr(n, l, r) {
  let arr = []
  for (let i = 0; i < n; i++) {
    let _random = Math.round(l + Math.random() * (r - l))
    arr.push(_random)
  }
  return arr
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
  const array = [...arr]
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}

// 冒泡排序，减少第二次循环次数
function sort2(arr) {
  const array = [...arr]
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}

// 快速排序
function sort3(array) {
  // const array = [...arr]
  if (array.length < 2) return array
  let left = [],
    right = [],
    midIndex = Math.floor(array.length / 2)
  let mid = array.splice(midIndex, 1)[0]
  // console.log(midIndex)
  for (let i = 0; i < array.length; i++) {
    if (array[i] < mid) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }

  return sort3(left).concat(mid, sort3(right))
}

// 快速排序
function sort4(array) {
  if (array.length < 2) return array
  const quickSort = (nums, left, right) => {
    if (left >= right) return
    let i = left,
      j = right - 1
    while (i <= j) {
      if (nums[i] > nums[right]) {
        ;[nums[i], nums[j]] = [nums[j], nums[i]]
        j--
      } else {
        i++
      }
    }
    j++
    ;[nums[j], nums[right]] = [nums[right], nums[j]]

    quickSort(nums, left, j - 1)
    quickSort(nums, j + 1, right)
  }

  quickSort(array, 0, array.length - 1)
  return array
}

const arr = randomArr(10, 5, 100)
console.log(arr)
console.log(sort1(arr))
console.log(sort2(arr))
console.log(sort3(arr))
console.log(sort4(arr))
