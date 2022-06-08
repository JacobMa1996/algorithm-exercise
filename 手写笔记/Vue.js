class Vue {
    constructor(options) {
        // 1. 保存 options的数据
        let vm = this;
        vm._data = options.data;
        vm.$el = document.querySelector(options.el);
        // 2. 为方便调用（vm.msg），把 data中的成员转换成 getter和 setter，并注入到 Vue实例中
        this.proxyData(vm._data);
        // this.$methods = methods;
        // 3. 调用 Observer类，监听数据的变化
        new Observer(vm._data);
        // 4. 调用 compiler类，解析指令和插值表达式
        new Compile(vm);
    }
    // 将options的data挂载到vm实例上
    proxyData(data) {
        Object.keys(data).forEach((key) => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key];
                },
                set(newVal) {
                    if (newVal === data[key]) {
                        return;
                    }
                    data[key] = newVal;
                },
            });
        });
    }
}

class Observer {
    constructor(data) {
        this.walk(data);
    }

    // 遍历 data($data)中的属性，把属性转换成响应式数据
    walk(data) {
        if (!data || typeof data !== "object") {
            return;
        }
        Object.keys(data).forEach((key) => {
            this.defineReactive(data, key, data[key]);
        });
    }

    // 定义响应式数据
    defineReactive(data, key, value) {
        // 负责收集依赖并发送通知
        let dep = new Dep();
        let that = this;
        // 利用递归使深层（内部）属性转换成响应式数据
        this.walk(value);
        Object.defineProperty(data, key, {
            get() {
                // 收集依赖
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return value;
            },
            set(newValue) {
                if (newValue === value) {
                    return;
                }
                value = newValue;
                // 如果新设置的值为对象，也转换成响应式数据
                that.walk(newValue);
                // 发送通知，派发更新
                dep.notify();
            },
        });
    }
}

class Dep {
    constructor() {
        // 每一个sub就是一个watcher实例
        this.subs = [];
    }

    // 添加订阅者
    addSub(sub) {
        this.subs.push(sub);
    }

    // 派发更新
    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        });
    }
}

class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        // 把watcher记录到Dep类的静态属性 target中
        Dep.target = this;
        // 触发data中的get方法，从而触发addSub进行依赖收集
        this.oldValue = vm[key];
        Dep.target = null;
    }

    update() {
        const newValue = this.vm[this.key];
        if (this.oldValue === newValue) {
            return;
        }
        this.cb(newValue);
    }
}

class Compile {
    constructor(vm) {
        this.vm = vm;
        this.el = vm.$el;
        this.compile(this.el);
    }

    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach((node) => {
            if (this.isTextNode(node)) {
                this.compileText(node);
            } else if (this.isElementNode(node)) {
                this.compileElement(node);
            }

            if (node.childNodes.length) {
                this.compile(node);
            }
        });
    }

    // 指令暂不实现
    compileElement(node) {
        Array.from(node.attributes).forEach((attr) => {
            let attrName = attr.attrName;
            // if (this.isDirective(attrName)) {
            //     attrName = attrName.substr(2);
            //     const key = attr.value;
            //     // this.update(node, key, attrName);
            // }
        });
    }

    compileText(node) {
        const reg = /\{\{(.+)?\}\}/;
        let value = node.textContent;
        if (reg.test(value)) {
            const key = RegExp.$1.trim();
            node.textContent = value.replace(reg, this.vm[key]);

            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue;
            });
        }
    }

    isDirective(attrName) {
        return attrName.startsWidth("v-");
    }

    isTextNode(node) {
        return node.nodeType === 3;
    }

    isElementNode(node) {
        return node.nodeType === 1;
    }
}
