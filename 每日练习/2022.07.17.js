// 实现一个EventEmitter

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
    if (this.events[type]) {
      this.events[type].forEach((fn) => {
        fn.apply(this, args)
      })
    }
  }

  once(type, listener) {
    const _this = this
    function one(...args) {
      listener.apply(_this, args)
      _this.off(type, one)
    }
    this.on(type, one)
  }

  off(type, listener) {
    if (this.events[type]) {
      const index = this.events[type].indexOf(listener)
      if (index > -1) {
        this.events[type].splice(index, 1)
      }
    }
  }
}

let event = new EventEmitter()

event.on('say', function (str) {
  console.log(str)
})

event.once('say', function (str) {
  console.log('这是once:' + str)
})

event.emit('say', 'visa')
event.emit('say', 'visa222')
event.emit('say', 'visa333')
