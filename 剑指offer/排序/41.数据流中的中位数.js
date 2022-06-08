// 题目 https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/

const PriorityQueue = require("../../数据结构/PriorityQueue");

/**
 * initialize your data structure here.
 */
var MedianFinder = function () {
    // 大数队列，小数优先
    this.A = new PriorityQueue((a, b) => b - a);

    // 小数队列，大数优先
    this.B = new PriorityQueue((a, b) => a - b);
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    // 如果两数组长度已相等，大数队列长度+1，否则，小数队列长度+1
    // 向哪个加，最后奇数取中位数时，就在哪个里取
    // 不能直接加，需要向对面的队列加进去，再把对面的最大/小值移到本队列中
    if (this.A.size() == this.B.size()) {
        this.B.push(num);
        this.A.push(this.B.pop());
    } else {
        this.A.push(num);
        this.B.push(this.A.pop());
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    return this.A.size() != this.B.size()
        ? this.A.peek()
        : (this.A.peek() + this.B.peek()) / 2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// test
const A = new PriorityQueue((a, b) => b - a);

A.push(-1);
A.push(-2);
A.push(-3);

const B = new PriorityQueue((a, b) => a - b);

B.push(-1);
B.push(-2);
B.push(-3);
// B.push(-4);

const m = new MedianFinder();
m.addNum(-1);
m.addNum(-2);
m.addNum(-3);
m.addNum(-4);
m.addNum(-5);

// console.log(A, B);

console.log(m.findMedian())
