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

// 箭头函数与普通函数的区别

// 1.箭头函数内的this指向外层函数，如果外层没有函数，指向window，如果是class内的方法，指向new出来的实例
// 2.箭头函数没有prototype，不可new，也不可用apply或call修改this执行
// 3.箭头函数的this是在声明时定义的，而普通函数的this是在执行时定义的
// 4.箭头函数的arguments也继承自外层函数，如果是在全局，会报错

// 实现一个new
function myNew(C, ...args) {
    let obj = {}
    obj.__proto__ = C.prototype
    let result = C.apply(obj, ...args)
    return result instanceof Object ? result : obj
}