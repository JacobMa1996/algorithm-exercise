// 实现一个instanceof

function myInstanceof(left, right) {

    let __proto__ = Object.getPrototypeOf(left)
    while (true) {
        if (!__proto__) return false
        if (__proto__ === right.prototype) return true
        __proto__ = Object.getPrototypeOf(__proto__)
    }
}

// 继承

function Parent() {
    this.a = 'a'
}

Parent.prototype.funcA = function () {
    console.log(this.a)
}

function Child() {
    Parent.call(this)
    this.b = 'b'
}

function clone(parent, child) {
    child.prototype = create(parent.prototype)
    child.prototype.constructor = child
}

clone(Parent, Child)

function create(prototype) {
    let obj = {}
    obj.__proto__ = prototype
    return obj
}

let b = new Child()

b.funcA()