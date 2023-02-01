let resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 == x) {
        return reject(new TypeError("same promise"));
    }

    let called;
    if (x && (typeof x == "object" || typeof x == "function")) {
        try {
            let then = x.then;
            if (typeof then == "function") {
                then.call(
                    x,
                    (y) => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    (r) => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                );
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
};

class MyPromise {
    constructor(fn) {
        this.value = null;
        this.status = this.PENDING;
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (value) => {
            if (this.status === this.PENDING) {
                this.status = this.FULFILLED;
                this.value = value;

                this.onFulfilledCallbacks.forEach((cb) => {
                    cb(this.value);
                });
            }
        };

        let reject = (reason) => {
            if (this.status === this.PENDING) {
                this.status = this.REJECTED;
                this.reason = reason;

                this.onRejectedCallbacks.forEach((cb) => {
                    cb(this.reason);
                });
            }
        };

        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    FULFILLED = "fulfilled";

    REJECTED = "rejected";

    PENDING = "pending";
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled == "function" ? onFulfilled : (v) => v;
    onRejected =
        typeof onRejected == "function"
            ? onRejected
            : (e) => {
                throw e;
            };

    let promise2 = new MyPromise((resolve, reject) => {
        if (this.status === this.FULFILLED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0);
        }

        if (this.status === this.REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0);
        }

        if (this.status === this.PENDING) {
            this.onFulfilledCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            });

            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            });
        }
    });

    return promise2;
};

MyPromise.prototype.resolve = function (parameter) {
    if (parameter instanceof MyPromise) {
        return parameter;
    }

    return new MyPromise((resolve, reject) => {
        resolve(parameter);
    });
};

MyPromise.prototype.reject = function (reason) {
    return new MyPromise((resolve, reject) => {
        reject(reason);
    });
};

MyPromise.prototype.catch = function (onRejected) {
    this.then(null, onRejected);
};

MyPromise.prototype.finally = function (fn) {
    return this.then(
        (data) => {
            return MyPromise.resolve(fn()).then(() => {
                return data;
            });
        },
        (reason) => {
            return MyPromise.resolve(fn()).then(() => {
                throw reason;
            });
        }
    );
};

MyPromise.prototype.all = function (array) {
    let promise = new MyPromise((resolve, reject) => {
        let count = 0;
        let result = [];
        let len = array.length;

        if (len === 0) {
            return resolve(result);
        }

        array.forEach((item) => {
            MyPromise.resolve(item).then(
                (data) => {
                    count++;
                    result[index] = data;
                    if (count === len) {
                        resolve(result);
                    }
                },
                (reason) => {
                    reject(reason);
                }
            );
        });
    });

    return promise;
};

MyPromise.prototype.race = function (array) {
    let promise = new MyPromise((resolve, reject) => {
        let len = array.length;

        array.forEach((item) => {
            MyPromise.resolve(item).then(
                (data) => {
                    resolve(data);
                },
                (reason) => {
                    reject(reason);
                }
            );
        });
    });

    return promise;
};

let p = new Promise((resolve, reject) => {
    resolve(1);
})
    .finally(() => {
        return new Promise((resolve, reject) => {
            reject(222)
        });
    })
    .then(
        (data) => {
            console.log(data)
        },
        (reason) => {
            console.log(reason);
        }
    );
