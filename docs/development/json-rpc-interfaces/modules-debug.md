# Debug Module

The `debug` module provides advanced EVM execution tracing APIs and runtime logging utilities for troubleshooting node operations and diagnosing transaction/block execution logic.

---

### debug_traceTransaction {#debug-tracetransaction}

Executes the transaction with the given hash in the exact environment it occurred, returning detailed EVM execution tracing logs.

**Parameters**

1. `DATA`, 32 Bytes - The transaction hash to trace.
2. `Object` - (optional) Configuration options:
   - `disableStorage`: `Boolean` - (optional, default: `false`) Setting to `true` disables storage capturing.
   - `disableMemory`: `Boolean` - (optional, default: `false`) Setting to `true` disables memory capturing.
   - `disableStack`: `Boolean` - (optional, default: `false`) Setting to `true` disables stack capturing.
   - `tracer`: `String` - (optional) JavaScript or built-in tracer (e.g. `callTracer`, `prestateTracer`).
   - `timeout`: `String` - (optional) Tracer timeout execution limit (e.g., `"5s"`).

**Returns**

`Object` - An object containing execution traces:
- `gas`: `Number` - Gas consumed by the transaction.
- `returnValue`: `String` - Execution return value in hex format.
- `structLogs`: `Array` - Step-by-step VM execution steps detailing program counter, opcode, gas, stack, memory, and storage changes.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"debug_traceTransaction","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b", {"disableStorage": true}],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "gas": 21000,
    "returnValue": "0x",
    "structLogs": [
      {
        "pc": 0,
        "op": "PUSH1",
        "gas": 80000,
        "gasCost": 3,
        "depth": 1,
        "stack": []
      },
      {
        "pc": 2,
        "op": "MSTORE",
        "gas": 79997,
        "gasCost": 6,
        "depth": 1,
        "stack": [
          "0x60",
          "0x40"
        ]
      }
    ]
  }
}
```

---

### debug_traceBlockByNumber {#debug-traceblockbynumber}

Replays and traces all transactions in the block matching the specified number.

**Parameters**

1. `QUANTITY|TAG` - The block number or tag (e.g., `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`).
2. `Object` - (optional) Configuration options (see [debug_traceTransaction](#debug-tracetransaction)).

**Returns**

`Array` - Array of trace results, one for each transaction in the block, in order of execution.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"debug_traceBlockByNumber","params":["0x1b4", {"tracer": "callTracer"}],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    {
      "result": {
        "type": "CALL",
        "from": "0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
        "to": "0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
        "value": "0xf3dbb76162000",
        "gas": "0xc350",
        "gasUsed": "0x5208",
        "input": "0x68656c6c6f21"
      }
    }
  ]
}
```

---

### debug_traceBlockByHash {#debug-traceblockbyhash}

Replays and traces all transactions in the block matching the specified block hash.

**Parameters**

1. `DATA`, 32 Bytes - The block hash to trace.
2. `Object` - (optional) Configuration options (see [debug_traceTransaction](#debug-tracetransaction)).

**Returns**

`Array` - Array of trace results, one for each transaction in the block, in order of execution (see [debug_traceBlockByNumber](#debug-traceblockbynumber)).

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"debug_traceBlockByHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", {"tracer": "callTracer"}],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    {
      "result": {
        "type": "CALL",
        "from": "0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
        "to": "0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
        "value": "0xf3dbb76162000",
        "gas": "0xc350",
        "gasUsed": "0x5208",
        "input": "0x68656c6c6f21"
      }
    }
  ]
}
```

---

### debug_verbosity {#debug-verbosity}

Sets the logging verbosity level of the node's standard output logger.

**Parameters**

1. `Number` - Integer log level: `0` (Critical), `1` (Error), `2` (Warn), `3` (Info), `4` (Debug), `5` (Detail).

**Returns**

`Boolean` - `true` if the verbosity level was successfully updated, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"debug_verbosity","params":[4],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```
