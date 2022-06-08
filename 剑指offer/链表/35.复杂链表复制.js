// 题目：https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * 构造数据结构，入参是个数组
 * @param {Array} nodeList
 */
function getHead(nodeList) {
    let head = {};
    let current = head;
    const cache = {};
    for (let i = 0; i < nodeList.length; i++) {
        current.val = nodeList[i][0];
        current.next = i + 1 < nodeList.length ? {} : null;
        cache[i] = current;
        current = current.next;
    }

    current = head;

    for (let i = 0; i < nodeList.length; i++) {
        current.random = cache[nodeList[i][1]] || null;
        current = current.next;
    }

    return head;
}

/** 解法一
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
    if (!head) return null;
    let current = head;
    let newHead = {};
    let newCurrent = newHead;
    const cache = new Map();

    while (current) {
        newCurrent.val = current.val;
        newCurrent.next = current.next ? {} : null;
        cache.set(current, newCurrent);
        current = current.next;
        newCurrent = newCurrent.next;
    }

    current = head;
    newCurrent = newHead;

    while (current) {
        newCurrent.random = current.random ? cache.get(current.random) : null;
        current = current.next;
        newCurrent = newCurrent.next;
    }

    return newHead;
};

/**
 * 解法二
 * @param {Node} head
 * @param {Map} cachedNode
 * @returns
 */
var copyRandomList2 = function (head, cachedNode = new Map()) {
    if (!head) {
        return null;
    }
    if (!cachedNode.has(head)) {
        cachedNode.set(head, { val: head.val }),
            Object.assign(cachedNode.get(head), {
                next: copyRandomList2(head.next, cachedNode),
                random: copyRandomList2(head.random, cachedNode),
            });
    }
    return cachedNode.get(head);
};

/**
 * 解法三
 * @param {Node} head
 * @returns
 */
var copyRandomList3 = function (head) {
    if (!head) {
        return null;
    }

    for (let node = head; node !== null; node = node.next.next) {
        const newNode = { val: node.val, next: node.next, random: null };
        node.next = newNode;
    }

    for (let node = head; node !== null; node = node.next.next) {
        const newNode = node.next;
        newNode.random = node.random !== null ? node.random.next : null;
    }

    const headNew = head.next;
    for (let node = head; node !== null; node = node.next) {
        const newNode = node.next;
        node.next = node.next.next;
        newNode.next = newNode.next !== null ? newNode.next.next : null;
    }
    return headNew;
};

// 执行
const head = getHead([
    // [3, null],
    // [3, 0],
    // [3, null],

    [7, null],
    [13, 0],
    [11, 4],
    [10, 2],
    [1, 0],
]);
console.log(head);
// console.log(copyRandomList1(head));
// console.log(copyRandomList2(head));
console.log(copyRandomList3(head));
