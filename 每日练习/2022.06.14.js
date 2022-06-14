// 实现n*n数组的顺时针内旋遍历
const rect = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

function map(rect) {
  if (!rect.length || !rect[0].length) return []
  const result = []
  let top = 0,
    left = 0,
    right = rect[0].length - 1,
    bottom = rect.length - 1

  while (true) {
    for (let i = left; i <= right; i++) {
      result.push(rect[top][i])
    }

    if (++top > bottom) break

    for (let i = top; i <= bottom; i++) {
      result.push(rect[i][right])
    }

    if (--right < left) break

    for (let i = right; i >= left; i--) {
      result.push(rect[bottom][i])
    }

    if (--bottom < top) break

    for (let i = bottom; i >= top; i--) {
      result.push(rect[i][left])
    }

    if (++left > right) break
  }

  return result
}

map(rect)
