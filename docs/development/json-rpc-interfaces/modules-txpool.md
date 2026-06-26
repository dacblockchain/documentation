# Txpool Module

The `txpool` module provides access to the node's local transaction memory pool (mempool), allowing inspection of the transaction queues (pending and queued transactions).

---

### txpool_status {#txpool-status}

Returns the number of transactions currently pending (ready to be processed/mined) and queued (waiting for nonces or other requirements).

**Parameters**

None

**Returns**

`Object` - An object containing transaction count status:
- `pending`: `QUANTITY` - Integer count of pending transactions.
- `queued`: `QUANTITY` - Integer count of queued transactions.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"txpool_status","params":[],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "pending": "0x2", // 2 transactions
    "queued": "0x0"   // 0 transactions
  }
}
```

---

### txpool_inspect {#txpool-inspect}

Returns a summary list of all transactions in the transaction pool grouped by address, showing details like gas price, gas, and value.

**Parameters**

None

**Returns**

`Object` - A map of sender addresses containing `pending` and `queued` maps. Each maps transaction nonces to summaries:
- `summary`: `String` - A text summary showing value, gas, and gas price (e.g. `0.5 Ether equivalent Wei, 21000 gas x 100 Gwei`).

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"txpool_inspect","params":[],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "pending": {
      "0x407d73d8a49eeb85d32cf465507dd71d507100c1": {
        "1": "0.1 Ether equivalent Wei, 21000 gas x 20 Gwei"
      }
    },
    "queued": {}
  }
}
```

---

### txpool_content {#txpool-content}

Returns full transaction details of all transactions in the transaction pool grouped by address.

**Parameters**

None

**Returns**

`Object` - A map of sender addresses containing `pending` and `queued` maps. Each maps nonces to full transaction objects (see [eth_getTransactionByHash](./modules-eth.md#eth-gettransactionbyhash) for transaction object fields).

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"txpool_content","params":[],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "pending": {
      "0x407d73d8a49eeb85d32cf465507dd71d507100c1": {
        "1": {
          "blockHash": null,
          "blockNumber": null,
          "from": "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
          "gas": "0x5208",
          "gasPrice": "0x4a817c800",
          "hash": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
          "input": "0x",
          "nonce": "0x1",
          "to": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a",
          "transactionIndex": null,
          "value": "0x1639e49bba16280000",
          "v": "0x25",
          "r": "0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
          "s": "0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
        }
      }
    },
    "queued": {}
  }
}
```
