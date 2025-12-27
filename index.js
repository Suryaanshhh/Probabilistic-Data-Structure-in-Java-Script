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
        const { m, k } = optimalParams(n, p);
        return new BloomFilter(m, k);
    }

    hash(value, seed) {
        const hash = murmur.x86.hash32(value, seed);
        return (hash >>> 0) % this.size; // ✅ FIXED
    }

    add(value) {
        value = value.toString();
        for (let i = 0; i < this.hashCount; i++) {
            this.bits[this.hash(value, i)] = 1;
        }
    }

    contains(value) {
        value = value.toString();
        for (let i = 0; i < this.hashCount; i++) {
            if (this.bits[this.hash(value, i)] === 0) {
                return false;
            }
        }
        return true;
    }

    clear() {
        this.bits.fill(0);
    }
}


class HyperLogLog {
    constructor(p = 12) {
        if (p < 4 || p > 16) {
            throw new Error("Precision p must be between 4 and 16");
        }

        this.p = p;
        this.m = 1 << p;
        this.registers = new Uint8Array(this.m);
    }

    add(value) {
        value = value.toString();
        const hash = murmur.x86.hash32(value);

        const index = hash >>> (32 - this.p);
        const w = (hash << this.p) | (1 << (this.p - 1));
        const rank = Math.clz32(w) + 1;

        this.registers[index] = Math.max(this.registers[index], rank);
    }

    count() {
        let sum = 0;
        let zeros = 0;

        for (let i = 0; i < this.m; i++) {
            sum += Math.pow(2, -this.registers[i]);
            if (this.registers[i] === 0) zeros++;
        }

        const alpha = this._alpha();
        let estimate = alpha * this.m * this.m / sum;

      
        if (estimate <= 2.5 * this.m && zeros > 0) {
            estimate = this.m * Math.log(this.m / zeros);
        }

        return Math.round(estimate);
    }

    clear() {
        this.registers.fill(0);
    }

    _alpha() {
        switch (this.m) {
            case 16: return 0.673;
            case 32: return 0.697;
            case 64: return 0.709;
            default: return 0.7213 / (1 + 1.079 / this.m);
        }
    }
}

module.exports = { BloomFilter, HyperLogLog, optimalParams };
