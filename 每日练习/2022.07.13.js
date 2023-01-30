// new
function myNew(F) {
  let obj = {}
  obj.__proto__ = F.prototype
  let result = F.call(obj)
  return result instanceof Object ? obj : result
}

// 继承
function A() {
  this.a = 'a'
}

A.prototype.funcA = function () {
  console.log('funcA')
}

function B() {
  A.call(this)
  this.b = 'b'
}

function clone() {
  B.prototype = Object.create(A.prototype)
  B.prototype.constructor = B
}

// Object.create
function create(target) {
  let o = {}
  o.__proto__ = target
  return o
}
