export class Queue {
    constructor() {
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    enqueue(item) {
        this.items[this.backIndex] = item
        this.backIndex++
    }
    dequeue() {
        if (this.isEmpty()) return undefined;

        const item = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return item
    }
    peek() {
        return this.items[this.frontIndex]
    }
    get printQueue() {
        return this.items;
    }
    size() {
        return this.backIndex - this.frontIndex;
    }
    isEmpty() {
        return this.size() === 0;
    }
}