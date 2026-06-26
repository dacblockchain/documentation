# JSON RPC Interfaces

In order to accept incoming connections from the network you need to configure the `dacnode` accordingly.

As a developer, you'll want to start interacting with `dacnode` and the DAC Blockchain network via your own programs and not manually through the console. To aid this, `dacnode` has built-in support for a JSON-RPC based APIs ([standard APIs](https://eth.wiki/json-rpc/API)). These can be exposed via HTTP, WebSockets and IPC (UNIX sockets on UNIX based platforms, and named pipes on Windows).

The IPC interface is enabled by default and exposes all the APIs supported by `dacnode`, whereas the HTTP and WS interfaces need to manually be enabled and only expose a subset of APIs due to security reasons. These can be turned on/off and configured as you'd expect.

[JSON-RPC](https://www.jsonrpc.org/specification) is a stateless, light-weight remote procedure call (RPC) protocol. It defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON (RFC 4627) as data format.

---

## Available Modules

The JSON-RPC API is divided into the following modules based on their functional area:

*   **[web3](./modules-web3.md)**: Common helper utilities and cryptographic functions.
*   **[net](./modules-net.md)**: Network state, listening status, and peer counts.
*   **[eth](./modules-eth.md)**: Core Ethereum ledger queries, transaction creation, block info, filters, logs, and EVM executions.
*   **[admin](./modules-admin.md)**: Local node info, peer manipulation, and HTTP/WS RPC server controls.
*   **[debug](./modules-debug.md)**: Advanced block and transaction EVM execution tracing.
*   **[ethash](./modules-ethash.md)**: Mining work templates and hashrate submissions.
*   **[miner](./modules-miner.md)**: Miner start/stop threads, etherbase, and block gas limit targets.
*   **[personal](./modules-personal.md)**: Key generation, local keystore unlocks, and transaction signing.
*   **[trace](./modules-trace.md)**: Historical transaction tracing and call replays.
*   **[txpool](./modules-txpool.md)**: Inspection of the local transaction memory pool (pending/queued queue).

---

## Node Configuration

`dacnode` can be configured to accept RPC calls over HTTP, WebSocket and IPC. 

#### HTTP

*   `--http` Enable the HTTP-RPC server
*   `--http.addr` HTTP-RPC server listening interface (default: `localhost`)
*   `--http.port` HTTP-RPC server listening port (default: `8545`)
*   `--http.api` API's offered over the HTTP-RPC interface (default: `eth,net,web3`)
*   `--http.corsdomain` Comma separated list of domains from which to accept cross origin requests (browser enforced)

#### WebSocket

*   `--ws` Enable the WS-RPC server
*   `--ws.addr` WS-RPC server listening interface (default: `localhost`)
*   `--ws.port` WS-RPC server listening port (default: `8546`)
*   `--ws.api` API's offered over the WS-RPC interface (default: `eth,net,web3`)
*   `--ws.origins` Origins from which to accept websockets requests

#### GraphQL

*   `--graphql` Enable GraphQL on the HTTP-RPC server. Note that GraphQL can only be started if an HTTP server is started as well.
*   `--graphql.corsdomain` Comma separated list of domains from which to accept cross origin requests (browser enforced)
*   `--graphql.vhosts` Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '\*' wildcard. (default: "localhost")

#### IPC

*   `--ipcdisable` Disable the IPC-RPC server
*   `--ipcapi` API's offered over the IPC-RPC interface (default: `admin,debug,eth,miner,net,personal,shh,txpool,web3`)
*   `--ipcpath` Filename for IPC socket/pipe within the datadir (explicit paths escape it)

---

## Hex Value Encoding

Two key data types get passed over JSON: unformatted byte arrays and quantities. Both are passed with a hex encoding but with different requirements for formatting.

### Quantities

When encoding quantities (integers, numbers): encode as hex, prefix with "0x", the most compact representation (slight exception: zero should be represented as "0x0").

Here are some examples:
*   `0x41` (65 in decimal)
*   `0x400` (1024 in decimal)
*   `WRONG: 0x` (should always have at least one digit - zero is "0x0")
*   `WRONG: 0x0400` (no leading zeroes allowed)
*   `WRONG: ff` (must be prefixed 0x)

### Unformatted Data

When encoding unformatted data (byte arrays, account addresses, hashes, bytecode arrays): encode as hex, prefix with "0x", two hex digits per byte.

Here are some examples:
*   `0x41` (size 1, "A")
*   `0x004200` (size 3, "0B0")
*   `0x` (size 0, "")
*   `WRONG: 0xf0f0f` (must be even number of digits)
*   `WRONG: 004200` (must be prefixed 0x)

---

## The Block Parameter

The block parameters are used when querying state at a particular block height or tag.

The following options are possible for the block parameter:
*   `HEX String` - an integer block number
*   `String "earliest"` for the earliest/genesis block
*   `String "latest"` - for the latest proposed block
*   `String "safe"` - for the latest safe head block
*   `String "finalized"` - for the latest finalized block
*   `String "pending"` - for the pending state/transactions

---

## Usage & Execution

Examples of using the JSON-RPC API by making `curl` requests to a DAC Blockchain node are provided throughout each module.

To execute a request properly, you must include the `-H "Content-Type: application/json"` header and target your node's URL (e.g. `127.0.0.1:8545`):

```bash
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```
