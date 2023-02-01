// 手写promise

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('same promise'))
    }

    let called

    // 如果x存在且是复杂类型
    if (x && (typeof x === 'object' || typeof x === 'function')) {
        try {
            const then = x.then
            // 这里要注意then需要以x为this执行
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
            reject(e)
        }
    }
    // 如果x是null或不是具有thenable属性，就不再继续递归
    else {
        resolve(x)
    }
}

class MyPromise {
    constructor(fn) {
        this.value
        this.status = this.PENDING
        this.reason = null
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value) => {
            if (this.status === this.PENDING) {
                this.status = this.FULFILLED
                this.value = value

                this.onFulfilledCallbacks.forEach((cb) => {
                    cb(this.value)
                })
            }
        }

        let reject = (reason) => {
            if (this.status === this.REJECTED) {
                this.status = this.REJECTED
                this.reason = reason

                this.onRejectedCallbacks.forEach((vb) => {
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