// Vue响应式原理

class Vue {
    constructor() {
        let vm = this
        // ...

        this.proxyData(vm._data)

        new Observer(vm._data)

        new Compile(vm)
    }

    proxyData() {

    }
}

class Observer {
    constructor(data) {
        this.walk(data)
    }

    walk(data) {
        if (!data || typeof data !== 'object') return
        Object.keys(data).forEach((key) => {
            this.defineReactive(data, key, data[key])
        })
    }

    defineReactive(data, key, value) {
        let dep = new Dep()
        let that = this
        this.walk(value)
        Object.defineProperty(data, key, {
            get() {
                // 这里依赖收集的判断是根据watcher挂载时的约定，区分是Vue挂载的get还是用户的操作
                if (Dep.target) {
                    dep.addSub(Dep.target) // 即watcher实例
                }
                return this.value
            },

            set(newValue) {
                if (newValue === value) {
                    return;
                }
                // value是data[key]，所以本质上是个指针
                value = newValue
                // 递归把子元素也都处理成响应式
                this.walk(newValue)
                // 派发更新
                dep.notify()
            }
        })
    }
}

class Dep {
    constructor() {
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        Dep.target = this

        this.oldValue = vm[key]

        Dep.target = null
    }

    update() {
        const newValue = this.vm[this.key]
        if (this.oldValue === newValue) {
            return
        }
        this.cb(newValue)
    }
}

class Compile {
    constructor(vm) {
        this.vm = vm
        this.el = vm.$el
        this.compile(this.el)
    }

    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach((node) => {
            if (this.isTextNode(node)) {
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                this.compileElement(node)
            }

            if (node.childNodes.length) {
                this.compile(node)
            }
        })
    }

    compileText(node) {
        const reg = /\{\{(.+)?\}\}/

        let value = node.textContent
        if (reg.test(value)) {
            const key = value.match(reg)?.[1]?.trim()

            node.textContent = value.replace(reg, this.vm[key])

            // 这里做个简单的，实际是需要先编译成AST，再调用render函数，render函数里会new Watcher
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
}