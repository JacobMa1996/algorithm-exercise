var obj = {
  a: {
    b: { c: { f: 'aa' } },
    d: { e: { g: 'bb' }, h: { i: 'cc' } },
    j: { k: 'dd' },
  },
}
// 输出 [f,g,i,c,e,h,k,b,d,j,a]

function con(obj) {
  let result = [],
    queue = []
  const dfs = (o) => {
    if (o) {
      result.unshift(o.key)
      if (o.value instanceof Object) {
        let cur = []
        Object.keys(o.value).forEach((key) => {
          cur.push({
            key,
            value: o.value[key],
          })
        })
        queue = [].concat(cur, queue)
      }
      dfs(queue.pop())
    }
  }

  dfs({
    key: null,
    value: obj,
  })

  result.pop()

  return result
}
con(obj)

// promise.all
Promise.prototype.all = function (promiseList) {
  let result = [],
    count = 0

  if (!promiseList.length) {
    resolve([])
  }

  let promise = new Promise((resolve, reject) => {
    promiseList.forEach((p, index) => {
      Promise.resolve(p).then(
        (data) => {
          count++
          result[index] = data
          if (count == promiseList.length) {
            resolve(result)
          }
        },
        (e) => {
          reject(e)
        },
      )
    })
  })

  return promise
}

// 二叉树的最近公共节点
function findParent(root, p, q) {
  if (!root) return null

  const dfs = (node, p, q) => {
    if (node == null || node == p || node == q) return node

    const left = dfs(node.left, p, q),
      right = dfs(node.right, p, q)

    if (!left) return right
    if (!right) return left

    return node
  }

  return dfs(root, p, q)
}
