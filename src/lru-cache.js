class LRUCache {
  constructor(capacity = 1000) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = undefined;
    this.tail = undefined;
  }

  clear() {
    this.cache.clear();
    this.head = undefined;
    this.tail = undefined;
  }

  addToFront(srcNode) {
    const node = srcNode;
    if (this.head) {
      node.next = this.head;
      this.head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
  }

  moveToFront(srcNode) {
    const node = srcNode;
    if (this.head === node) {
      return;
    }
    if (this.tail === node) {
      this.tail = node.prev;
    }
    node.prev.next = node.next;
    if (node.next) {
      node.next.prev = node.prev;
    }
    node.prev = undefined;
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  removeLast() {
    const node = this.tail;
    if (node) {
      if (this.head === node) {
        this.head = undefined;
        this.tail = undefined;
      } else {
        this.tail = node.prev;
        this.tail.next = undefined;
        node.prev = undefined;
        node.next = undefined;
      }
    }
    return node;
  }

  get(key) {
    const node = this.cache.get(key);
    if (node) {
      this.moveToFront(node);
      return node.value;
    }
    return undefined;
  }

  put(key, value) {
    const node = this.cache.get(key);
    if (node) {
      node.value = value;
      this.moveToFront(node);
    } else {
      const newNode = { key, value };
      this.cache.set(key, newNode);
      this.addToFront(newNode);
      if (this.cache.size > this.capacity) {
        const last = this.removeLast();
        this.cache.delete(last.key);
      }
    }
  }
}

module.exports = LRUCache;
