# Linux Installation (Automated)

This guide describes how to install, configure, manage, and troubleshoot a DAC Blockchain Node on Linux using the official automated installer script.

::: info
This guide focuses on the automated installation script. If you prefer to manually download and run the node binary, please see the [Manual Installation](./manual-installation.md) guide.
:::

---

## Features

The automated installer handles the entire setup process, including:
- **Architecture Auto-detection**: Supports `amd64` (x86_64), `arm64` (aarch64), and `arm7` (Raspberry Pi/SCMs).
- **Service Configuration**: Installs the node as a `systemd` background service that auto-starts on boot.
- **Node Configurations**:
  - **Standard Node**: Configured for Mainnet (stable channel) with standard resources.
  - **Developer Node**: Allows choosing between Mainnet (stable) and Testnet (dev), enabling HTTP JSON-RPC APIs (`eth`, `net`, `web3`), and selecting node storage types (Standard/Light, Full, or Archive).
- **Wallet & Mining Setup**: Walks through creating a new mining wallet, password protection, keystore backups, and configuring the miner (`--mine`, `--unlock`, `--miner.etherbase`).
- **Global Status Utility**: Installs `dacnode-status` in `/usr/local/bin` for real-time node monitoring.

---

## Prerequisites

- **Operating System**: Any systemd-based Linux distribution (Ubuntu, Debian, CentOS, AlmaLinux, etc.).
- **Permissions**: Root privileges (`sudo` or root terminal).
- **Dependencies**: `wget` or `curl`.

---

## Installation Steps

1. **Download and Run the Installer**
   Execute the wrapper script using `curl` or `wget`:
   ```bash
   curl -o dac-install.sh https://repo.dachain.tech/installer/install.sh && sudo bash dac-install.sh
   ```

2. **Select Installation Mode**
   - **1) Standard Install** (Recommended): Installs a Mainnet node.
   - **2) Developer / Advanced Install**: Enables advanced network and API choices.

3. **Select Node Storage Type** (Developer Mode + Mainnet only)
   - **Standard / Light Node**: Low storage footprint, fast synchronization.
   - **Full Node**: Full verification of all transactions (requires more storage).
   - **Archive Node**: Stores all historical state (huge storage requirements).

4. **Enable JSON-RPC API** (Developer Mode only)
   - Offers to enable the HTTP RPC endpoint (`http://0.0.0.0:8545`).
   
   ::: warning RPC Port Exposure
   Enabling RPC allows external apps to interact with your node. Secure your port 8545 using a firewall and do not expose it to the public internet.
   :::

5. **Configure Wallet & Mining** (Mainnet only, and only if RPC is disabled)
   - If you choose to enable mining, the installer prompts you to set a password.
   - It writes the password securely to `/home/dac/password.txt` (owner `dac:dac`, permissions `600`).
   - It creates a new account and outputs the public address (e.g., `0x...`).
   
   ::: important Backup Keystore
   Back up the generated keystore file located in `/home/dac/.dac/keystore/` immediately.
   :::

6. **System Service & Status Monitor**
   - Confirm to install as a systemd background service (highly recommended).
   - Confirm to install the global `dacnode-status` command.

---

## Managing an Existing Installation

When you run the installer script on a machine where a DAC Node is already installed, it detects the service and prompts you with a management menu:

### 1) Update Binary
- Stops the `dac-node` service.
- Backs up the current binary to `dacnode.bak`.
- Detects your current network/channel and downloads the latest matching executable.
- Updates the status script and restarts the service.

### 2) Reconfigure
- Reruns the interactive configuration wizard.
- Allows you to rename your node, switch network mode (Mainnet <-> Testnet), change node storage types, toggle RPC settings, or adjust mining parameters.
- Restarts the service with the new settings.

### 3) Uninstall
- Safely stops and disables the `dac-node` systemd service.
- Deletes the `dacnode` executable, the systemd unit file, and the status command.
- Renames the data directory `/home/dac` to a timestamped backup folder (e.g., `/home/dac_backup_20260626120000/`) to prevent data loss.

### 4) Check Node Status
- Invokes the status monitor tool to inspect sync state and peer connections.

---

## Post-Installation File Structure

- **Service Executable**: `/usr/local/bin/dacnode`
- **User Home**: `/home/dac/` (the node service runs as the system user `dac`)
- **Environment Settings**: `/home/dac/environment` (defines starting flags like `MINER_FLAGS` and `RPC_FLAGS`)
- **Startup Launcher**: `/home/dac/start-dacnode.sh`
- **Keystore Directory**: `/home/dac/.dac/keystore/`
- **Systemd Unit File**: `/etc/systemd/system/dac-node.service`

---

## Verification & Troubleshooting

- **Monitor Node Logs**:
  ```bash
  journalctl -u dac-node -f
  ```
- **Verify Service Status**:
  ```bash
  systemctl status dac-node
  ```
- **Check Sync Status**:
  ```bash
  dacnode-status
  ```
  For more details on the status monitor, see the [Status Monitor](./status-monitor.md) guide.
