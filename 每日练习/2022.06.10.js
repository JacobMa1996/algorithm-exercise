// 实现一个bind
Function.prototype.bind = function (context) {
  if (typeof this != 'function') {
    throw new TypeError('error')
  }

  let self = this
  const args = [...arguments].slice(1)
  const F = function () {
    return self.apply(
      this instanceof self ? this : context,
      args.concat(...arguments),
    )
  }
  F.prototype = self.prototype

  return F
}

// 使用
function foo(name) {
  this.name = name
}
var obj = {}
var bar = foo.bind(obj)
bar('Jack')
console.log(obj.name) // Jack
var alice = new bar('Alice')
console.log(obj.name) // Jack
console.log(alice.name) // Alice
