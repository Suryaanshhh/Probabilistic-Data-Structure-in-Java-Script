# probabilistic-js

A lightweight, high-performance JavaScript library for probabilistic data structures. Currently featuring a memory-efficient **Bloom Filter** implementation using the MurmurHash3 algorithm.

## Features

* **Memory Efficient:** Uses `Uint8Array` for minimal memory footprint.
* **Optimal Configuration:** Includes utility functions to calculate the best filter size and hash count based on your expected data volume and desired error rate.
* **Fast:** Powered by `murmurhash3js` for high-speed hashing.

## Installation

```bash
npm install probabilistic-js


```md
### Basic Example

```js
const filter = BloomFilter.fromExpectedItems(1000, 0.01);

filter.add("apple");
filter.add("banana");

console.log(filter.contains("apple"));  // true
console.log(filter.contains("grape"));  // false (probably)