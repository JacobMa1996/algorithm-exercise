// 不用 ES6 和 __proto__ 实现一下 Object.create

// 用__proto__
function create(o) {
  let obj = {}
  obj.__proto__ = o
  return obj
}

// 不用__proto__
function create(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// 柯里化
function curry(fn, len = fn.length) {
  function f(fn, len, ...args) {
    return function (...params) {
      let _args = [...args, ...params]
      if (_args.length >= len) {
        return fn.apply(this, _args)
      } else {
        return f.call(this, fn, len, ..._args)
      }
    }
  }

  return f.call(this, fn, len)
}

function add() {
  return [...arguments].reduce((a, b) => {
    return a + b
  })
}

const curryAdd = curry(add, 3)

curryAdd(1, 2)(3)
curryAdd(1)(2)(3)

// 再写一遍
function curry(fn, len = fn.length) {
  function f(...args) {
    return function () {
      let _args = [...args, ...arguments]
      if (_args.length >= len) {
        return fn(..._args)
      } else {
        return f(..._args)
      }
    }
  }

  return f()
}

function add() {
  return [...arguments].reduce((a, b) => {
    return a + b
  })
}

const curryAdd = curry(add, 3)

curryAdd(1, 2)(3)
curryAdd(1)(2)(3)

// 再再写一遍

function curry(fn, len = fn.length) {
  function f(...args) {
    return function () {
      let _args = [...args, ...arguments]
      if (_args.length >= len) {
        return fn(..._args)
      } else {
        return f(..._args)
      }
    }
  }

  return f()
}

function add() {
  return [...arguments].reduce((a, b) => {
    return a + b
  })
}

const curryAdd = curry(add, 3)

curryAdd(1, 2)(3)
curryAdd(1)(2)(3)

// 实现返回一个连续和为N的函数
// 输入一个正数N，输出所有和为N的连续正数序列例如：输入15结果：[[1,2,3,4,5],[4,5,6],[7,8]]
function findContinuousSequence(target) {
  let i = 1,
    j = 2,
    cur = 3,
    curArr = [1, 2],
    result = []
  while (i < j) {
    if (cur === target) {
      result.push(curArr.map((it) => it))
    }

    if (cur >= target) {
      i++
      cur -= curArr.shift()
    } else {
      j++
      cur += j
      curArr.push(j)
    }
  }

  return result
}

findContinuousSequence(15) // [[1,2,3,4,5],[4,5,6],[7,8]]

// 箭头函数指向问题
const obj = {
  fn1: () => console.log(this),
  fn2: function () {
    console.log(this)
  },
}
new obj.fn1()
new obj.fn2()

// 多叉树, 获取每一层的节点之和
function layerSum(root) {
  let queue = [root],
    result = []

  const bfs = (deep) => {
    const array = queue.map((it) => it)
    if (!array || !array.length) return
    result[deep] = result[deep] || 0
    queue = []
    array.forEach((node) => {
      result[deep] += node.value
      if (node.children && node.children.length) {
        node.children.forEach((child) => {
          queue.push(child)
        })
      }
    })
    bfs(deep + 1)
  }

  bfs(0)

  return result
}
const res = layerSum({
  value: 2,
  children: [
    { value: 6, children: [{ value: 1 }] },
    { value: 3, children: [{ value: 2 }, { value: 3 }, { value: 4 }] },
    { value: 5, children: [{ value: 7 }, { value: 8 }] },
  ],
})
console.log(res)

// 再写一个
function layerSum(root) {
  let result = []
  const order = (node, deep) => {
    if (node) {
      result[deep] = result[deep] || 0
      result[deep] += node.value
      if (node.children && node.children.length) {
        node.children.forEach((child) => {
          order(child, deep + 1)
        })
      }
    }
  }

  order(root, 0)

  return result
}

const res = layerSum({
  value: 2,
  children: [
    { value: 6, children: [{ value: 1 }] },
    { value: 3, children: [{ value: 2 }, { value: 3 }, { value: 4 }] },
    { value: 5, children: [{ value: 7 }, { value: 8 }] },
  ],
})
console.log(res)

// 二叉树层序遍历
/**
 * 给定一个二叉树，返回该二叉树层序遍历的结果，（从左到右，一层一层地遍历）
 * 例如：
 * 给定的二叉树是{3,9,20,#,#,15,7},
 * 该二叉树层序遍历的结果是
 * [
 * [3],
 * [9,20],
 * [15,7]
 * ]
 */
function bfs(root) {
  let result = []
  let order = (node, deep) => {
    if (node) {
      result[deep] = result[deep] || []
      result[deep].push(node.val)
      order(node.left, deep + 1)
      order(node.right, deep + 1)
    }
  }

  order(root, 0)

  return result
}
