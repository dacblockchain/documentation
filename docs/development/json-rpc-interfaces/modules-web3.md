# Web3 Module

The `web3` module provides common utility functions for developers, including client version queries and cryptographic hashes.

---

### web3_clientVersion {#web3-clientversion}

Returns the current client version.

**Parameters**

None

**Returns**

`String` - The current client version string.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "dacnode/v1.11.6-stable/darwin-arm64/go1.21.1"
}
```

---

### web3_sha3 {#web3-sha3}

Returns Keccak-256 (_not_ the standardized SHA3-256) of the given data.

**Parameters**

1. `DATA` - The data to convert into a Keccak-256 hash.

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Returns**

`DATA` - The Keccak-256 result of the given string.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```
