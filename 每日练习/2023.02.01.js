// 手写promise

class MyPromise {
    constructor(fn) {
        this.value = null
        this.reason = null
        this.status = this.PENDING
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value) => {
            if (this.status === this.PENDING) {
                this.status = this.PENDING
                this.value = value
                this.onFulfilledCallbacks.forEach((cb) => {
                    cb(this.value)
                })
            }
        }

        let reject = (reason) => {
            if (this.status === this.PENDING) {
                this.status = this.REJECTED
                this.value = reason
                this.onRejectedCallbacks.forEach((cb) => {
                    cb(this.reason)
                })
            }
        }

        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    PENDING = 'PENDING'

    FULFILLED = 'FULFILLED'

    REJECTED = 'REJECTED'
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('cycle error'))
    }

    let called

    if (x && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then
            then.call(x, (y) => {
                if (called) return
                called = true
                resolvePromise(promise2, y, resolve, reject)
            }, (r) => {
                if (called) return
                called = true
                reject(r)
            })
        } catch (e) {
            if (called) return
            called = true
            reject(x)
        }
    } else {
        resolve(x)
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : (e) => {
        throw e
    }

    let promise2 = new MyPromise((resolve, reject) => {
        if (this.status === this.FULFILLED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value)
                    resolvePromise(x)
                } catch (e) {
                    reject(e)
                }
            }, 0)
        }

        if (this.status === this.REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason)
                    resolvePromise(x)
                } catch (e) {
                    reject(e)
                }
            }, 0)
        }

        if (this.status === this.PENDING) {
            this.onFulfilledCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            })

            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            })
        }
    })

    return promise2
}

MyPromise.prototype.resolve = function (parameter) {
    if (parameter instanceof Promise) {
        return parameter
    }

    return new Promise((resolve, reject) => {
        resolve(parameter)
    })
}

MyPromise.prototype.reject = function (parameter) {
    if (parameter instanceof Promise) {
        return parameter
    }

    return new Promise((resolve, reject) => {
        reject(parameter)
    })
}

MyPromise.prototype.all = function (promiseList) {
    let promise = new MyPromise((resolve, reject) => {
        let count = 0, len = promiseList?.length, result = []

        if (!len) {
            resolve(result)
        }

        promiseList.forEach((p, index) => {
            MyPromise.resolve(p).then(v => {
                count++
                result[index] = v
                if (count === len) {
                    resolve(result)
                }
            }, r => {
                reject(r)
            })
        })
    })

    return promise
}

MyPromise.prototype.race = function (promiseList) {
    return new Promise((resolve, reject) => {
        let len = promiseList.length
        if (!len) {
            return resolve()
        }

        promiseList.forEach(p => {
            MyPromise.resolve(p).then(v => {
                resolve(v)
            }, r => {
                reject(r)
            })
        })
    })
}

MyPromise.prototype.finally = function (fn) {
    return this.then(
        (data) => {
            // 正常的话是 fn()，考虑到fn可能返回一个promise，所以处理一下后可以继续then
            return MyPromise.resolve(fn()).then(() => {
                return data
            })
        },
        (reason) => {
            return MyPromise.resolve(fn()).then(() => {
                throw reason
            })
        }
    )
}

// 闭包
for (var i = 1; i <= 5; i++) {
    ; (function (j) {
        setTimeout(function () {
            console.log(j)
        }, j * 1000)
    })(i)
}

for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i)
    }, i * 1000)
}

// deepclone
function deepClone(obj, map = new Map()) {
    let res

    // 解决非object类型
    if (obj == null || typeof obj != 'object') return obj

    if (obj instanceof Array) {
        res = []
    } else {
        res = {}
    }

    // 解决循环引用
    if (map.get(obj)) {
        return map.get(obj)
    }

    map.set(obj, res)

    // 解决特殊情况
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)

    for (let key in obj) {
        // 判断key是obj的自身枚举属性而不是原型链上的属性
        if (obj.hasOwnProperty(key)) {
            res[key] = deepClone(obj[key], map)
        }
    }

    return res
}

var A = { a: 1 };
A.A = A;

var B = deepCopy(A);
console.log(B);//{a: 1, A: {a: 1, A: {…}}

// 防抖与节流

// 基础防抖
function debounce(fn, delay) {
    let timeout

    return function (...args) {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            fn.apply(null, args)
        }, delay)
    }
}

// 立即执行版防抖
function debounce(fn, delay, immediate) {
    let timeout

    return function (...args) {
        clearTimeout(timeout)

        if (immediate) {
            let callNow = !timeout

            timeout = setTimeout(() => {
                timeout = null
            })
            !!callNow && fn.apply(null, args)
        } else {
            timeout = setTimeout(() => {
                fn.apply(null, args)
            }, delay)
        }
    }
}

// 节流
function throttled(fn, delay) {
    let timeout

    return function (...args) {
        if (!timeout) {
            timeout = setTimeout(() => {
                fn.apply(null, args)
                timeout = null
            }, delay)
        }
    }
}

// 手写一个bind
Function.prototype.bind = function (context) {
    if (typeof this != 'function') {
        throw new TypeError('must be function')
    }

    const args = [...arguments].slice(1)
    const self = this

    const F = function () {
        // 如果是new调用，就不改变执行时的this
        let isNewCall = this instanceof self
        return self.apply(isNewCall ? this : context, args.concat(...arguments))
    }

    // 如果通过new调用，那么F的this应该要变成self的实例，而不是F的实例，所以改变原型，让isNewCall能够生效
    F.prototype = self.prototype

    return F
}

