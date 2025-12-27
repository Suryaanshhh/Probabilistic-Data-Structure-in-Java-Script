# probabilistic-js

A lightweight, high-performance JavaScript library for **probabilistic data structures**.  
Designed for memory efficiency and speed, ideal for large-scale data processing.

Currently supported:
- **Bloom Filter** – fast membership checks
- **HyperLogLog** – approximate unique count (cardinality estimation)

---

## Features

- 🚀 **High Performance** – Powered by `murmurhash3js`
- 💾 **Memory Efficient** – Uses `Uint8Array`
- 🎯 **Configurable Accuracy** – Control false positives and estimation error
- 🧠 **Production Ready** – Industry-standard algorithms
- 📦 **Lightweight** – Zero unnecessary dependencies

---

## Installation

```bash
npm install probabilistic-js




//importing 
const { BloomFilter, HyperLogLog, optimalParams } = require("probabilistic-js");


//BloomFilterUsage

const filter = BloomFilter.fromExpectedItems(1000, 0.01) (here 1000 is no of expected items and 0.1 false positive probability (1%) )


filter.add("apple");
filter.add("banana");

console.log(filter.contains("apple"));  // true
console.log(filter.contains("grape"));  // false (probably)

Manual_Config

const filter = new BloomFilter(5000, 4);


Clear_Filter

filter.clear();


//HyperLogLog

const hll = new HyperLogLog(12);

Usage

hll.add("user1");
hll.add("user2");
hll.add("user1");

console.log(hll.count()); // ≈ 2


hll.clear(); // clear hyper log













Expression binding 
formatter
change the controller behaviour based on model
event bus  