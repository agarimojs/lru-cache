const LRUCache = require('./lru-cache');

const createCache = (capacity) => new LRUCache(capacity);
const getFromCache = (cache, key) => cache.get(key);
const putIntoCache = (cache, key, value) => cache.put(key, value);

module.exports = {
  LRUCache,
  createCache,
  getFromCache,
  putIntoCache,
};
