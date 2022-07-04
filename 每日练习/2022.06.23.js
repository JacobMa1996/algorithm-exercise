// 快排
function sort(nums) {
  if (nums.length < 2) return nums
  let left = [],
    right = []
  let index = Math.floor(nums.length / 2)
  let mid = nums.splice(1, index)[0]

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < mid) {
      left.push(nums[i])
    } else {
      right.push(nums[i])
    }
  }

  return sort(left).concat(mid, right)
}

// 快排
function sort2(nums) {
  if (nums.length < 2) return nums
  const quickSort = (arr, left, right) => {
    if (left >= right) return
    let i = left,
      j = right - 1
    while (i >= j) {
      if (nums[i] > nums[right]) {
        ;[nums[i], nums[j]] = [nums[j], nums[i]]
        j--
      } else {
        i++
      }
    }
    j++
    ;[nums[j], nums[right]] = [nums[right], nums[j]]
    quickSort(arr, left, j - 1)
    quickSort(arr, j + 1, right)
  }

  quickSort(nums, 0, nums.length - 1)
  return nums
}
