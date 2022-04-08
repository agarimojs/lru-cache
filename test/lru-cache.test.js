const LRUCache = require('../src/lru-cache');

describe('LRUCache', () => {
  describe('constructor', () => {
    it('Should create a new instance', () => {
      const cache = new LRUCache();
      expect(cache).toBeDefined();
      expect(cache.capacity).toEqual(10);
    });
    it('Should create a new instance with a capacity', () => {
      const cache = new LRUCache(100);
      expect(cache).toBeDefined();
      expect(cache.capacity).toEqual(100);
    });
  });

  describe('addToFront', () => {
    it('Should add a node to the front of the list', () => {
      const cache = new LRUCache();
      const node = { key: 1 };
      cache.addToFront(node);
      expect(cache.head).toEqual(node);
      expect(cache.tail).toEqual(node);
    });
    it('Should add several nodes and be double linked', () => {
      const cache = new LRUCache();
      cache.addToFront({ key: 1 });
      cache.addToFront({ key: 2 });
      cache.addToFront({ key: 3 });
      cache.addToFront({ key: 4 });
      let node = cache.head;
      expect(node.prev).toBeUndefined();
      expect(node.key).toEqual(4);
      node = node.next;
      expect(node.key).toEqual(3);
      node = node.next;
      expect(node.key).toEqual(2);
      node = node.next;
      expect(node.key).toEqual(1);
      expect(node.next).toBeUndefined();
      expect(node).toBe(cache.tail);
      node = node.prev;
      expect(node.key).toEqual(2);
      node = node.prev;
      expect(node.key).toEqual(3);
      node = node.prev;
      expect(node.key).toEqual(4);
      expect(node.prev).toBeUndefined();
      expect(node).toBe(cache.head);
    });
    it('If capacity is excedeed delete last node', () => {
      const cache = new LRUCache();
      for (let i = 0; i < 20; i += 1) {
        cache.addToFront({ key: i });
      }
      expect(cache.head.key).toEqual(19);
      expect(cache.tail.key).toEqual(0);
    });
  });

  describe('clear', () => {
    it('should clear map, tail and head', () => {
      const cache = new LRUCache();
      for (let i = 0; i < 20; i += 1) {
        cache.addToFront({ key: i });
      }
      cache.clear();
      expect(cache.head).toBeUndefined();
      expect(cache.tail).toBeUndefined();
    });
  });

  describe('moveToFront', () => {
    it('Should move a node to the front', () => {
      const cache = new LRUCache();
      cache.addToFront({ key: 1 });
      cache.addToFront({ key: 2 });
      const targetNode = { key: 3 };
      cache.addToFront(targetNode);
      cache.addToFront({ key: 4 });
      cache.moveToFront(targetNode);
      let node = cache.head;
      expect(node.key).toEqual(3);
      expect(node.prev).toBeUndefined();
      node = node.next;
      expect(node.key).toEqual(4);
      node = node.next;
      expect(node.key).toEqual(2);
      node = node.next;
      expect(node.key).toEqual(1);
      expect(node.next).toBeUndefined();
      node = node.prev;
      expect(node.key).toEqual(2);
      node = node.prev;
      expect(node.key).toEqual(4);
      node = node.prev;
      expect(node.key).toEqual(3);
    });
    it('Should move tail to the front', () => {
      const cache = new LRUCache();
      const targetNode = { key: 1 };
      cache.addToFront(targetNode);
      cache.addToFront({ key: 2 });
      cache.addToFront({ key: 3 });
      cache.addToFront({ key: 4 });
      cache.moveToFront(targetNode);
      let node = cache.head;
      expect(node.key).toEqual(1);
      expect(node.prev).toBeUndefined();
      node = node.next;
      expect(node.key).toEqual(4);
      node = node.next;
      expect(node.key).toEqual(3);
      node = node.next;
      expect(node.key).toEqual(2);
      expect(node.next).toBeUndefined();
      node = node.prev;
      expect(node.key).toEqual(3);
      node = node.prev;
      expect(node.key).toEqual(4);
      node = node.prev;
      expect(node.key).toEqual(1);
    });
    it('Should move head to the front', () => {
      const cache = new LRUCache();
      cache.addToFront({ key: 1 });
      cache.addToFront({ key: 2 });
      cache.addToFront({ key: 3 });
      const targetNode = { key: 4 };
      cache.addToFront(targetNode);
      cache.moveToFront(targetNode);
      let node = cache.head;
      expect(node.key).toEqual(4);
      expect(node.prev).toBeUndefined();
      node = node.next;
      expect(node.key).toEqual(3);
      node = node.next;
      expect(node.key).toEqual(2);
      node = node.next;
      expect(node.key).toEqual(1);
      expect(node.next).toBeUndefined();
      node = node.prev;
      expect(node.key).toEqual(2);
      node = node.prev;
      expect(node.key).toEqual(3);
      node = node.prev;
      expect(node.key).toEqual(4);
    });
  });

  describe('removeLast', () => {
    it('Should remove the last node', () => {
      const cache = new LRUCache();
      cache.addToFront({ key: 1 });
      cache.addToFront({ key: 2 });
      cache.addToFront({ key: 3 });
      cache.addToFront({ key: 4 });
      cache.removeLast();
      expect(cache.tail.key).toEqual(2);
      expect(cache.tail.next).toBeUndefined();
      expect(cache.tail.prev.key).toEqual(3);
    });
    it('Should not crash if cache is empty', () => {
      const cache = new LRUCache();
      cache.removeLast();
      expect(cache.head).toBeUndefined();
      expect(cache.tail).toBeUndefined();
    });
    it('Should remove node if is the only node in the list', () => {
      const cache = new LRUCache();
      cache.addToFront({ key: 1 });
      cache.removeLast();
      expect(cache.head).toBeUndefined();
      expect(cache.tail).toBeUndefined();
    });
  });

  describe('get and put', () => {
    it('Should limit elements to capacity', () => {
      const cache = new LRUCache(5);
      for (let i = 1; i <= 10; i += 1) {
        cache.put(i, i * 100);
      }
      expect(cache.cache.size).toEqual(5);
    });
    it('If an existing element is put again, move it to the begin of the cache', () => {
      const cache = new LRUCache();
      for (let i = 1; i <= 10; i += 1) {
        cache.put(i, i * 100);
      }
      cache.put(1, 100);
      expect(cache.head.key).toEqual(1);
      expect(cache.head.next.key).toEqual(10);
    });
    it('Should return value form existing item', () => {
      const cache = new LRUCache();
      for (let i = 1; i <= 10; i += 1) {
        cache.put(i, i * 100);
      }
      expect(cache.get(1)).toEqual(100);
      expect(cache.get(10)).toEqual(1000);
    });
    it('Should return undefined if get non existing item', () => {
      const cache = new LRUCache();
      for (let i = 1; i <= 10; i += 1) {
        cache.put(i, i * 100);
      }
      expect(cache.get(11)).toBeUndefined();
    });
  });
});
