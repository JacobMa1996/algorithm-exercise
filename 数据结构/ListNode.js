/*
 * @Author: mayao02@meituan.com
 * @Description: 链表节点、数组转链表、链表转数组
 * @Date: 2022-03-31 22:24:26
 * @LastEditors: mayao02
 * @LastEditTime: 2022-04-04 17:28:29
 */

class ListNode {
    constructor(val) {
        this.val = val;
    }

    next = null;
}

/**
 * 构造数据结构，入参是个数组
 * @param {Array} array
 */
function getHead(array) {
    let head = new ListNode();
    let current = head;
    for (let i = 0; i < array.length; i++) {
        current.val = array[i];
        current.next = i + 1 < array.length ? new ListNode() : null;
        current = current.next;
    }

    current = head;
    return head;
}

function getArray(head) {
    const arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    return arr;
}

module.exports = {
    getHead,
    ListNode,
    getArray,
};
