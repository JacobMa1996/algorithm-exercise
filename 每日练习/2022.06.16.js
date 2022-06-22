setTimeout(() => {
    Promise.resolve().then(() => {
        console.log(88)
    })
    console.log(1)
}, 1)

setTimeout(() => {
    console.log(2)
}, 0)

Promise.resolve(() => {
    console.log(3)
}).then((val) => {
    console.log(4)
    return 5
}).catch((val) => {
    // console.log(6)
    // return 6
}).finally((val) => {
    console.log(6, val)
})

console.log(7)