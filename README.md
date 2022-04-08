# lru-cache
LRU Cache using double linked list

## Usage

Create the LRUCache with the capacity as parameter. If no capacity is provided, default will be 10000.
Use put to add a (key, value) item.
Use get to get to get the value given the key.


```javascript
const cache = new LRUCache(500);

cache.put('a', { name: 'something' });
cache.put('b', { name: 'other' });
const result = cache.get('a');
console.log(result);
```