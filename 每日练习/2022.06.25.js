// 快速排序
function sort(nums) {
  const quickSort = (arr, left, right) => {
    if (left >= right) return
    let i = left,
      j = right,
      base = arr[left]
    while (i < j) {
      while (i < j && arr[i] <= base) i++
      while (i < j && arr[j] >= base) j--
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }

    ;[arr[i], arr[left]] = [arr[left], arr[i]]

    quickSort(arr, left, j - 1)
    quickSort(arr, j + 1, right)
  }

  quickSort(nums, 0, nums.length - 1)
  return nums
}
