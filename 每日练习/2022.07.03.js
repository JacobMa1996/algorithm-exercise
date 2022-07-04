class P {
  taskList = []
  push(task) {
    this.taskList.push(task)
  }

  sleep(timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, timeout)
    })
  }

  async run() {
    const func = this.taskList.pop()
    if (func) {
      await func(1, () => this.sleep(1000))
      this.run()
    }
  }
}

var p = new P()

p.push(async (data, next) => {
  console.log('before', data)
  await next()
  console.log('after')
})

p.run()

//
var name = 'window'
person1 = {
  name: 'person1',
  sayName1: function () {
    console.log(this.name)
  },
  sayName2: () => {
    console.log(this.name)
  },
}
person2 = { name: 'person2' }

// 下面4个输出什么
person1.sayName1() // person1 ****
person1.sayName1.call(person2) // person2
person1.sayName2() // window
person2.sayName2.call(person2) // 报错

function Person() {}
Person.prototype = {
  name: 'jack',
}
var person1 = new Person()
Person.prototype = {
  name: 'otherJack',
}
console.log(person1.name) // jack

// 此处改成以下输出什么
Person.prototype.name = 'otherJack'
var person2 = new Person()
console.log(person1.name, person2.name)

function throttled(fn, timeout) {
  let timer,
    that = this

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(that, args)
      }, timeout)
    }
  }
}

// 15、红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？
function red() {
  // 每次
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}

function light(colorFunc, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      colorFunc()
      resolve()
    }, timeout)
  })
}
function setup() {
  light(red, 3000)
    .then(() => {
      return light(yellow, 2000)
    })
    .then(() => {
      return light(green, 1000)
    })
    .then(() => {
      return setup()
    })
}

setup()
