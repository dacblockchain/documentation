# Admin Module

The `admin` module provides access to node configuration and runtime administrative commands, such as peer control and RPC server management.

---

### admin_addPeer {#admin-addpeer}

Attempts to manually add a new remote node to the peer list. The node will maintain this connection.

**Parameters**

1. `String` - The enode URL of the remote peer to connect to (e.g., `"enode://pubkey@ip:port"`).

**Returns**

`Boolean` - `true` if the peer was successfully requested to be added, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"admin_addPeer","params":["enode://a979fb5754ecb373c1b2445336d3f8f8becffff70ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331dec662d74a180eb731f2441f3d441f7d@127.0.0.1:30303"],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

---

### admin_removePeer {#admin-removepeer}

Attempts to manually disconnect from a remote node.

**Parameters**

1. `String` - The enode URL of the remote peer to disconnect.

**Returns**

`Boolean` - `true` if the peer was disconnected, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"admin_removePeer","params":["enode://a979fb5754ecb373c1b2445336d3f8f8becffff70ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331dec662d74a180eb731f2441f3d441f7d@127.0.0.1:30303"],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

---

### admin_nodeInfo {#admin-nodeinfo}

Returns administrative information and configuration metadata about the local node.

**Parameters**

None

**Returns**

`Object` - An object containing details about the node:
- `enode`: `String` - The enode URL of the node.
- `id`: `String` - Unique node identifier hash.
- `ip`: `String` - Local IP address.
- `listenAddr`: `String` - Address and port the node listens on.
- `name`: `String` - Client identifier (e.g. `dacnode/v1.11.6-stable...`).
- `ports`: `Object` - Ports used for discovery and listener.
- `protocols`: `Object` - Protocols configured on the node (e.g. `eth`).

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"admin_nodeInfo","params":[],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "enode": "enode://a979fb5754ecb373c1b2445336d3f8f8becffff70ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331dec662d74a180eb731f2441f3d441f7d@127.0.0.1:30303",
    "id": "5b8d23cae81a3d90ab42080352ef1cd4756bf02a0a2dfcb0869dbfca09bc5a1a",
    "ip": "127.0.0.1",
    "listenAddr": "[::]:30303",
    "name": "dacnode/v1.11.6-stable/darwin-arm64/go1.21.1",
    "ports": {
      "discovery": 30303,
      "listener": 30303
    },
    "protocols": {
      "eth": {
        "network": 21892,
        "difficulty": 1,
        "genesis": "0xbc5b8a07c0cf5b2efbce8c9dbe7ef2dcf7268a0a2dfcb0869dbfca09bc5a1a2",
        "config": {
          "chainId": 21892,
          "homesteadBlock": 0,
          "eip150Block": 0,
          "eip155Block": 0,
          "eip158Block": 0,
          "byzantiumBlock": 0,
          "constantinopleBlock": 0,
          "petersburgBlock": 0,
          "istanbulBlock": 0,
          "muirGlacierBlock": 0
        },
        "head": "0xbc5b8a07c0cf5b2efbce8c9dbe7ef2dcf7268a0a2dfcb0869dbfca09bc5a1a2"
      }
    }
  }
}
```

---

### admin_peers {#admin-peers}

Returns detailed information about all connected peers.

**Parameters**

None

**Returns**

`Array` - Array of peer objects, each describing a connected peer:
- `enode`: `String` - Peer's enode URL.
- `id`: `String` - Peer identifier hash.
- `name`: `String` - Client identification string.
- `network`: `Object` - Local and remote IP address and ports.
- `protocols`: `Object` - Protcols negotiated with the peer.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"admin_peers","params":[],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    {
      "enode": "enode://f4642b5754ecb373c1b2445336d3f8f8becffff70ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331dec662d74a180eb731f2441f3d441f7d@192.168.1.100:30303",
      "id": "2d8f99e3cae81a3d90ab42080352ef1cd4756bf02a0a2dfcb0869dbfca09bc5a1a",
      "name": "dacnode/v1.11.6-stable/linux-amd64/go1.21.1",
      "network": {
        "localAddress": "192.168.1.50:48920",
        "remoteAddress": "192.168.1.100:30303"
      },
      "protocols": {
        "eth": {
          "version": 66,
          "difficulty": 42000,
          "head": "0x3cf522f12c96c40a790bcbc5a1a6b75ee3d5145a99d05921026d1527331dec66"
        }
      }
    }
  ]
}
```

---

### admin_startHTTP {#admin-starthttp}

Starts the HTTP RPC server.

**Parameters**

1. `String` - (optional) Server listening interface (default: `localhost`).
2. `Number` - (optional) Port number (default: `8545`).
3. `String` - (optional) CORS header domain list (default: `""`).
4. `String` - (optional) API modules to expose (default: `"eth,net,web3"`).

**Returns**

`Boolean` - `true` if HTTP RPC server successfully started, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"admin_startHTTP","params":["127.0.0.1", 8545, "*", "eth,net,web3"], "id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

---

### admin_stopHTTP {#admin-stophttp}

Stops the HTTP RPC server.

**Parameters**

None

**Returns**

`Boolean` - `true` if HTTP RPC server successfully stopped, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"admin_stopHTTP","params":[],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

---

### admin_startWS {#admin-startws}

Starts the WebSocket RPC server.

**Parameters**

1. `String` - (optional) Server listening interface (default: `localhost`).
2. `Number` - (optional) Port number (default: `8546`).
3. `String` - (optional) Origin domains to allow (default: `""`).
4. `String` - (optional) API modules to expose (default: `"eth,net,web3"`).

**Returns**

`Boolean` - `true` if WS RPC server successfully started, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"admin_startWS","params":["127.0.0.1", 8546, "*", "eth,net,web3"], "id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

---

### admin_stopWS {#admin-stopws}

Stops the WebSocket RPC server.

**Parameters**

None

**Returns**

`Boolean` - `true` if WS RPC server successfully stopped, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"admin_stopWS","params":[],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```
