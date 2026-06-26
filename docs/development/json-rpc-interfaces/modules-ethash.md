# Ethash Module

The `ethash` module provides consensus interaction methods for retrieving mining work, submitting completed nonce verification solutions, and reporting hashrate statistics to the mining coordinator.

---

### ethash_getWork {#ethash-getwork}

Returns the hash of the current block, the seed hash, and the boundary condition (target).

**Parameters**

None

**Returns**

`Array` - An array containing three strings:
1. `DATA`, 32 Bytes - Current block header pow-hash.
2. `DATA`, 32 Bytes - Seed hash used for the DAG.
3. `DATA`, 32 Bytes - Boundary condition target (difficulty filter).

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ethash_getWork","params":[],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    "0x1e3d441f7d8a979fb5754ecb373c1b2445336d3f8f8becffff70ec6434177160",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000010000000000000000000000000000000000000000000000000000000"
  ]
}
```

---

### ethash_submitWork {#ethash-submitwork}

Submits a PoW (Proof of Work) solution to the node.

**Parameters**

1. `DATA`, 8 Bytes - The 64-bit nonce found.
2. `DATA`, 32 Bytes - Header PoW-hash.
3. `DATA`, 32 Bytes - Mix digest.

**Returns**

`Boolean` - `true` if the submitted solution is valid, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ethash_submitWork","params":["0x0000000000000001", "0x1e3d441f7d8a979fb5754ecb373c1b2445336d3f8f8becffff70ec6434177160", "0xD1FE570000000000000000000000000000000000000000000000000000000000"],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

---

### ethash_submitHashrate {#ethash-submithashrate}

Reports miner hashrate to the local node to help measure local mining pool statistics.

**Parameters**

1. `DATA` - Hashrate represented as hex-encoded string.
2. `DATA`, 32 Bytes - A unique ID identifying the client/miner.

**Returns**

`Boolean` - `true` if the hashrate was successfully submitted, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"ethash_submitHashrate","params":["0x500000", "0x5b8d23cae81a3d90ab42080352ef1cd4756bf02a0a2dfcb0869dbfca09bc5a1a"],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```
