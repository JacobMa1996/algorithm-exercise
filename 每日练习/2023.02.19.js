// promise衍生
MyPromise.prototype.all = function (promiseList) {
    let promise2 = new MyPromise((resolve, reject) => {
        let result = [], count = 0
        if (!promiseList?.length) return resolve(result)

        promiseList.forEach((p, index) => {
            MyPromise.resolve(p).then(value => {
                count++
                result[index] = value
                if (count === promiseList.length) {
                    resolve(result)
                }
            }, reason => {
                reject(reason)
            })
        })
    })

    return promise2
}

MyPromise.prototype.race = function (promiseList) {
    let promise2 = new MyPromise((resolve, reject) => {
        if (!promiseList?.lenth) return resolve()

        promiseList.forEach(p => {
            MyPromise.resolve(p).then((value) => {
                resolve(value)
            }, reason => {
                reject(reason)
            })
        })
    })

    return promise2
}

MyPromise.prototype.resolve = function (parameter) {
    if (parameter instanceof MyPromise) {
        return parameter
    }

    return new MyPromise((resolve, reject) => {
        resolve(parameter)
    })
}

MyPromise.prototype.reject = function (parameter) {
    return new MyPromise((resolve, reject) => {
        reject(parameter)
    })
}

MyPromise.prototype.catch = function (onRejected) {
    this.then(null, onRejected)
}

MyPromise.prototype.finally = function (fn) {
    return this.then((value) => {
        return MyPromise.resolve(fn()).then(() => {
            return value
        })
    }, reason => {
        return MyPromise.resolve(fn()).then(() => {
            throw reason
        })
    })
}

// 防抖节流

function debounce(fn, delay) {
    let timeout, context = this

    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}

function debounce2(fn, delay, immediate) {
    let timeout, context = this
    return function (...args) {
        clearTimeout(timeout)
        if (immediate) {
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, delay)

            callNow && fn.apply(context, args)
        } else {
            timeout = setTimeout(() => {
                fn.apply(context, args)
            }, delay)
        }
    }
}

function throttled(fn, delay) {
    let timeout, context = this

    return function (...args) {
        if (!timeout) {

            fn.apply(context, args)
            timeout = setTimeout(() => {
                timeout = null
            }, delay)
        }
    }
}


//deepclone

function deepClone(obj, map = new Map()) {
    if (!obj || typeof obj != 'object') return obj


    // 处理循环引用
    if (map.has(obj)) {
        return map.get(obj)
    }


    let res = obj instanceof Array ? [] : {}


    // 处理一些特殊对象如Date、RegExp
    // todo

    map.set(obj, res)

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            res[key] = deepClone(obj[key])
        }
    }

    return res
}

// 继承

function create(prototype) {
    let obj = {}
    obj.__proto__ = prototype
    return obj
}

function A(arg) {
    this.a = arg
}

A.prototype.func = function () {
    console.log(this.a)
}

function B(arg) {
    A.call(this, arg)
}

function clonePrototype(Parent, Child) {
    Child.prototype = Object.create(Parent.prototype)
    Child.prototype.constructor = Child
    Child.__proto__ = Child
}

clonePrototype(A, B)


B.prototype.funcb = function (b) {
    this.b = b
    console.log(this.a, this.b)
}


let a = new A('111')

let b = new B('222')

a.func()

b.func()

b.funcb(333)

// 实现一个new

function myNew(Parent, ...args) {
    let obj = {}
    obj.__proto__ = Parent.prototype
    let result = Parent.call(obj, ...args)

    return result instanceof Object ? result : obj
}

// bind

Function.prototype.bind = function (context) {

    if (typeof this != 'function') {
        throw TypeError('must be function')
    }

    const args = [...arguments].slice(1)
    const self = this

    function F() {
        return self.apply(this instanceof self ? this : context, args.concat(...arguments))
    }

    F.prototype = self.prototype

    return F
}