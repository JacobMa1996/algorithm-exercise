/*
 * @Author: mayao02@meituan.com
 * @Description: 优先队列
 * @Date: 2022-04-04 17:27:50
 * @LastEditors: mayao02
 * @LastEditTime: 2022-04-04 18:16:59
 */

class PriorityQueue {
    constructor(compare) {
        if (typeof compare != "function") {
            throw new Error("compare is not a function!");
        }

        this.compare = compare;
        this.data = [];
    }

    // 二分查找
    search(target) {
        let l = 0,
            h = this.data.length - 1;
        while (l <= h) {
            // const mid = Math.floor((l + h) / 2);
            // const mid = l + Math.floor((h - l) / 2);
            const mid = l + ((h - l) >> 1);

            if (this.compare(this.data[mid], target) > 0) {
                h = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return l;
    }

    push(target) {
        let index = this.search(target);
        this.data.splice(index, 0, target);
        return this.data.length;
    }

    pop() {
        return this.data.pop();
    }

    peek() {
        return this.data[this.data.length - 1];
    }

    size() {
        return this.data.length;
    }
}

module.exports = PriorityQueue;
