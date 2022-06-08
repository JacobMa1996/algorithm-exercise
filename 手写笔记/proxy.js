// 写一个用proxy实现的简单双向绑定

const data = { count: 0 };

const proxy = new Proxy(data, {
    get(target, property) {
        return target(property);
    },
    set(target, property, value) {
        target[property] = value;
        render(value);
    },
});

function render(value) {
    document.querySelector("dom").innerHTML = value;
}

render(proxy.count);

proxy.count++;
