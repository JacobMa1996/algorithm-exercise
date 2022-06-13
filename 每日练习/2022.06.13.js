// 1.tcp和udp的区别

/**
 * udp无连接、tcp有连接
 * udp不可靠，tcp可靠，使用流量控制和拥塞控制
 * udp支持多对多，tcp只支持1对1
 * udp面向报文，tcp面向字节流
 * udp开销小，tcp开销大
 * udp适用一些实时场景（视频、直播）tcp适用需要可靠传输的场景（文件传输）
 */

// 2.实现一个函数, fetchWithRetry 会自动重试3次，任意一次成功直接返回
function fetchWithRetry(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((data) => {
        resolve(data)
      })
      .catch((e) => {
        return fetch(url)
      })
      .then((data) => {
        resolve(data)
      })
      .catch((e) => {
        return fetch(url)
      })
      .then((data) => {
        resolve(data)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

function fetchWithRetry(url) {
  return new Promise((resolve, reject) => {
    let p = Promise.resolve(),
      count = 0

    const run = () => {
      p = p
        .then(fetch)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          if (count == 2) {
            return reject(e)
          }

          count++
          run()
        })
    }

    run()
  })
}

function fetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error')
    }, 1000)
  })
}

fetchWithRetry()
  .then((data) => {
    console.log('success', data)
  })
  .catch((e) => {
    console.log('error', e)
  })

// 3.为什么for of不能遍历对象
/**
 * 对象和数字没有迭代器(Symbol.iterator)，可以在原型上添加一个迭代器
 */

// 利用闭包的特性，实现加一的函数
function addOne() {
  let a = 0
  return function () {
    return ++a
  }
}

let add = addOne()

add() // 1
add() // 2
add() // 3

// 4.防抖与节流
function debounce(fn, timeout) {
  let timer
  return function (...args) {
    let _this = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, timeout)
  }
}

function throttled(fn, timeout) {
  let timer
  return function (...args) {
    let _this = this
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(_this, args)
        timer = null
      }, timeout)
    }
  }
}

function debounce2(fn, timeout, immediate) {
  let timer
  return function (...args) {
    let _this = this
    if (timer) clearTimeout(timer)

    if (immediate) {
      let callNow = !timer

      // timer有值时说明延迟没到，就一直延长timer
      timer = setTimeout(() => {
        timer = null
      }, timeout)

      // callNow有值说明timer没值说明第一次执行或延迟到了
      callNow && fn.apply(_this, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(_this, args)
      }, timeout)
    }
  }
}

// 5.实现一个阶乘
function fn(n) {
  if (n == 1) {
    return n
  }

  let cur = n,
    result = 1
  while (cur > 1) {
    result = result * cur--
  }

  return result
}

// 6.斐波那契数列
function fn2(n) {
  if (n == 0 || n == 1) {
    return n
  }

  let a = 0,
    b = 0,
    c = 1
  for (let i = 2; i <= n; i++) {
    a = b
    b = c
    c = a + b
  }

  return c
}

fn2(5)

// 7.两数之和的数组下标
function sum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}

// 两数之和的数组下标 用hashmap优化
function sum2(nums, target) {
  const hash = {}

  for (let i = 0; i < nums.length; i++) {
    if (hash[target - nums[i]] || hash[target - nums[i]] == 0) {
      return [hash[target - nums[i]], i]
    }
    hash[nums[i]] = i
  }
}

// 8.看代码说输出
var b = 10
;(function b() {
  b = 20
  console.log(b)
})()

// 严格模式下会报错
// 非严格模式下会打印出function b 的函数体，因为具名函数的变量是不能被改变的

// 9.继承
// es5继承
// 寄生组合式继承
function A() {
  this.a = 'a'
}

A.prototype.funcA = function () {
  console.log('function a')
}

function B() {
  A.call(this)
  this.b = 'b'
}

function clone(A, B) {
  B.prototype = Object.create(A.prototype)
  B.prototype.constructor = B
}

clone(A, B)

// 扩展 Object.create主要干了什么
function create(o) {
  let obj = {}
  obj.__proto__ = o
  return obj
}

function create(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// es6的继承与es5的区别
// 写法不一样 es6是extends+super
// 子类没有自己的this，super相当于父类的构造函数，需要调用super继承this
// es6的class内部属性不能被枚举
// es6的class不存在变量提升
// 内部实现机制不同 记忆里用了匿名函数和Object.defineProperty去实现，具体细节记不清了

// 箭头函数和普通函数的区别
// 箭头函数的this指向外层函数，如果没有外层函数，指向window，如果是class，指向new出来的实例
// 箭头函数没有prototype，因此也不能new
// 箭头函数的this是在定义时确定的，普通函数是在执行时确定的
// 箭头函数的arguments也继承外层函数，如果在全局，会报错
// 不支持通过apply和call修改this

// 10.写一个阿拉伯数字转中文的方法 // todo
function toChineseNum(num) {
  let str = num.toString().split('').reverse()
  let chNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  let chUnit = [
    '',
    '十',
    '百',
    '千',
    '万',
    '十万',
    '百万',
    '千万',
    '亿',
    '十亿',
    '百亿',
    '千亿',
  ]
  let result = []
  for (let i = 0; i < str.length; i++) {
    // let unit = ''
    const it = str[i]
    if (i < 4 && !(it == 0 && str[i - 1] == 0)) {
      result.unshift(chNum[it])
    }
    if (i >= 4 && i < 8 && !(it == 0 && str[i - 1] == 0)) {
      result.unshift(chNum[it])
    }
    // if (!(it == 0 && str[i - 1] == 0)) {
    //   result.unshift(chNum[it] + chUnit[i])
    // }
  }

  return result
}

toChineseNum(2345) // 二千三百四十五
toChineseNum(341205) // 三十四万一千二百零五
toChineseNum(340001200567) // 三千四百亿零一百二十万零五百六十七
