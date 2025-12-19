const murmur = require("murmurhash3js");



function optimalParams(n, p) {
    const m = Math.ceil(-(n * Math.log(p)) / (Math.log(2) ** 2));
    const k = Math.ceil((m / n) * Math.log(2));
    return { m, k };
}

class BloomFilter {
    constructor(size = 1000, hashCount = 3) {
        this.size = size;
        this.hashCount = hashCount;
        this.bits = new Uint8Array(size); 
    }

    static fromExpectedItems(n, p = 0.01) {
        const m = Math.ceil(-(n * Math.log(p)) / (Math.log(2) ** 2));
        const k = Math.ceil((m / n) * Math.log(2));
        return new BloomFilter(m, k);
    }
  



    hash(value, seed) {
        const hash = murmur.x86.hash32(value, seed);
        return hash % this.size;
    }


   

    add(value) {
        value = value.toString();

        for (let i = 0; i < this.hashCount; i++) {
            const index = this.hash(value, i);
            this.bits[index] = 1;
        }
    }

  

    contains(value) {
        value = value.toString();

        for (let i = 0; i < this.hashCount; i++) {
            const index = this.hash(value, i);
            if (this.bits[index] === 0) {
                return false;
            }
        }

        return true;
    }

    clear() {
        this.bits.fill(0);
    }

}

module.exports = { BloomFilter, optimalParams };