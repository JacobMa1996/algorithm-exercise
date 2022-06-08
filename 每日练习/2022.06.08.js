// promise.all
Promise.prototype.all = function (array) {
  const promise = new Promise((resolve, reject) => {
    let result = [],
      count = 0
    array.forEach((p, index) => {
      Promise.resolve(p).then(
        (data) => {
          result[index] = data
          count++

          if (count == array.length) {
            resolve(result)
          }
        },
        (reason) => {
          reject(reason)
        }
      )
    })
  })

  return promise
}

/**********************************/
// 二叉树的最近公共祖先
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root == null || root == p || root == q) return root

  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)

  if (!left) return right
  if (!right) return left

  return root
}

// 深拷贝
function deepClone(obj) {
  if (typeof obj != 'object' || !obj) return obj

  let result = obj instanceof Array ? [] : {}

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }

  return obj
}

/**********************************/
// 实现一个bind
Function.prototype.bind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }

  const args = [...arguments].slice(1),
    fn = this

  return function Fn() {
    return fn.apply(this instanceof Fn ? new fn(...args) : context, args)
  }
}

// 发布订阅
class EventBus {
  constructor() {
    this.eventsMap = {}
  }

  on(name, cb) {
    this.eventsMap[name] = this.eventsMap[name] || {}
    this.eventsMap[name].push(cb)
  }

  emit(name, ...args) {
    if (!this.eventsMap[name]) return
    this.eventsMap[name].forEach((fn) => fn(...args))
  }
}
