# Network Module

The `net` module provides information about the network connectivity, listening status, and peer connections of the node.

---

### net_version {#net-version}

Returns the current network ID.

**Parameters**

None

**Returns**

`String` - The current network ID:
*   `21892`: DAC Interstellar Mainnet
*   `21894`: DAC Inception Testnet

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "21892"
}
```

---

### net_listening {#net-listening}

Returns `true` if client is actively listening for network connections.

**Parameters**

None

**Returns**

`Boolean` - `true` when listening, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": true
}
```

---

### net_peerCount {#net-peer-count}

Returns number of peers currently connected to the client.

**Parameters**

None

**Returns**

`QUANTITY` - Integer of the number of connected peers in hex format.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2 connected peers
}
```
