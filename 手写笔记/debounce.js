function debounce(fn, delay) {
  let timer,
    context = this

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

function debounce2(fn, delay, immediate) {
  let timer,
    context = this

  return (...args) => {
    if (timer) clearTimeout(timer)

    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)

      callNow && fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
}

function throttled(fn, delay) {
  let timer,
    context = this

  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, delay)
    }
  }
}
