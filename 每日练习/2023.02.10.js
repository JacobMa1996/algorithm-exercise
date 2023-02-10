
// 发布订阅

class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(type, listener) {
        if (this.events[type]) {
            this.events[type].push(listener)
        } else {
            this.events[type] = [listener]
        }
    }

    emit(type, ...args) {
        if (this.events[type]?.length) {
            this.events[type].forEach(fn => {
                fn.apply(this, args)
            })
        }
    }

    once(type, listener) {
        let that = this
        function one(...args) {
            listener.apply(that, args)
            that.off(type, one)
        }

        this.on(type, one)
    }

    off(type, listener) {
        if (this.events[type]?.length) {
            const index = this.events[type].indexOf(listener)

            if (index > -1) {
                this.events[type].splice(index, 1)
            }
        }
    }
}