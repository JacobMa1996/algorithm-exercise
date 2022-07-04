class Scheduler {
  add() {}
}

const scheduler = new Scheduler(2)

const sleep = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout)
  })
}

const addTask = (time, val) => {
  scheduler.add(() => {
    return sleep(time).then(() => console.log(val))
  })
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
