class LazyManClass {
    constructor(name) {
        this.taskList = [];
        this.name = name;
        console.log(`Hi I am ${name}`);

        setTimeout(() => {
            this.next();
        }, 0);
    }

    eat(some) {
        const fn = () => {
            console.log(`I am eating ${some}`);
            this.next();
        };
        this.taskList.unshift(fn);
        return this;
    }

    sleep(timeout) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${timeout}秒...`);
                this.next();
            }, timeout * 1000);
        };
        this.taskList.unshift(fn);
        return this;
    }

    sleepFirst(timeout) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${timeout}秒...`);
                this.next();
            }, timeout * 1000);
        };
        this.taskList.push(fn);
        return this;
    }

    next() {
        // console.log(this.taskList.toString());
        const fn = this.taskList.pop();
        fn && fn();
    }
}

function LazyMan(name) {
    return new LazyManClass(name);
}

LazyMan("Tony")
    .eat("lunch")
    .eat("dinner")
    .sleepFirst(5)
    .sleep(10)
    .eat("junk food");

// const lazyMan = new LazyMan()
