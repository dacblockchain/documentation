# Public Mainnet Tools & Resources

The **DAC Mainnet Blockchain** is the production environment where real-world assets are tokenized, transactions are permanently settled, and decentralized applications (dApps) run live.

Below are the essential tools and services available for the DAC Mainnet.

### 1. Public RPC Endpoint <a href="#id-1-rpc-endpoint" id="id-1-rpc-endpoint"></a>

**URL**: `https://rpc.dachain.tech`

The RPC endpoint (Remote Procedure Call) is the gateway that allows external applications, wallets (like MetaMask), and development tools to communicate with the DAC Blockchain Mainnet.

*   **Usage**: Configure your wallet or dApp to connect to this URL to interact with the Mainnet.
*   **Chain ID**: `21892`

::: warning Public RPC Limits & High-Volume Operations
The public RPC endpoint enforces strict rate limits to prevent abuse and guarantee fair service availability for all network participants. 

For high-volume operations, production dApp deployments, or latency-sensitive applications, it is **highly recommended** to run and query your own **private node** (see [Linux Installation](../ecosystem/dac-nodes/installer-linux.md) or [Manual Installation](../ecosystem/dac-nodes/manual-installation.md)).
:::

### 2. Blockchain Explorer <a href="#id-2-block-explorer" id="id-2-block-explorer"></a>

**URL**: [https://dacscan.io](https://dacscan.io/)

The Blockchain Explorer is a search engine for the blockchain. It allows you to visualize and verify activity on the Mainnet in real-time.

*   **Features**:
    *   View block history and transaction details.
    *   View network stats and transaction gas prices.
    *   Check wallet balances and token transfers.
    *   Verify smart contract source code and read/write contract methods.
    *   Monitor network health (block time, difficulty, hashrate).
