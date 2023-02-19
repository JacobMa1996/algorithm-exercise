// 实现一个instanceof 

function myInstanceof(left, right) {
    let __proto__ = Object.getPrototypeOf(left)

    while (true) {
        if (!__proto__) return false
        if (__proto__ === right.prototype) return true

        __proto__ = Object.getPrototypeOf(__proto__)
    }
}

// 实现一个new

function myNew(Parent, ...args) {
    let obj = {}
    obj.__proto__ = Parent.prototype
    let result = Parent.apply(obj, args)
    return result instanceof Object ? result : obj
}

// promise

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        throw reject(new TypeError('same promise'))
    }

    let called
    if (x && (typeof x == 'function' || typeof x == 'object')) {
        try {
            let then = x.then

            if (typeof then == 'function') {
                then.call(x, (y) => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(r)
        }
    } else {
        resolve(x)
    }
}

class Promise {
    constructor(fn) {
        this.value = null
        this.reason = null
        this.status = this.PENDING
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

        let reject = (e) => {
            if (this.status === this.PENDING) {
                this.status = this.REJECTED
                this.reason = e
                this.onRejectedCallbacks.forEach(cb => {
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

    FULFILLED = 'fulfilled'

    REJECTED = 'rejected'

    PENDING = 'pending'

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'funciton' ? onFulfilled : () => { }
        onRejected = typeof onRejected === 'function' ? onRejected : (e) => {
            throw e
        }
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === this.FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }

            if (this.status === this.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        this.resolvePromise(promise2, x, resolve, reject)
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
                            this.resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            this.resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })

        return promise2
    }
}