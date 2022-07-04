async function async1() {
  console.log('1') //2
  await async2()
  console.log('2') // 9
}

async function async2() {
  console.log('3') // 3
  return new Promise((resolve) => {
    resolve()
    console.log(4) //4
  })
}

console.log(5) // 1

async1()

setTimeout(() => {
  console.log(6) // 10
})

new Promise((resolve) => {
  resolve()
  console.log(7) //5
})
  .then(() => {
    console.log(8) // 7
  })
  .then(() => {
    console.log(9) // 8
  })

console.log(10) //6

// 第二题
const async2 = async () => {
  console.log(3)
  return new Promise((resolve, reject) => {
    resolve()
    console.log(4)
  })
}

const async1 = async () => {
  console.log(1)
  Promise.resolve(
    new Promise((resolve, reject) => {
      resolve()
      console.log(4)
    }),
  ).then(() => {
    console.log(2)
  })
}

async1()

new Promise((resolve) => {
  resolve()
  console.log(7)
})
  .then(() => {
    console.log(8)
  })
  .then(() => {
    console.log(9)
  })

//
