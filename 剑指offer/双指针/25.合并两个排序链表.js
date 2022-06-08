// 题目： https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/

const { getHead, getArray, ListNode } = require("../../数据结构/ListNode");

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    const newHead = new ListNode(0);
    let node = newHead;
    let [node1, node2] = [l1, l2];

    while (node1 && node2) {
        if (node1.val < node2.val) {
            node.next = node1;
            node1 = node1.next;
        } else {
            node.next = node2;
            node2 = node2.next;
        }

        node = node.next;
    }

    node.next = node1 || node2;

    return newHead.next;
};

const l1 = getHead([1, 2, 4]);
const l2 = getHead([1, 3, 4]);

// console.log(l1, l2)

console.log(getArray(mergeTwoLists(l1, l2)));
