# macOS Installation (Automated)

This guide describes how to install, configure, manage, and troubleshoot a DAC Blockchain Node on macOS using the official automated installer script.

::: info
This guide focuses on the automated installer script. If you prefer to manually download and run the node binary, please see the [Manual Installation](./manual-installation.md) guide.
:::

---

## Features

The automated installer handles the entire setup process, including:
- **Architecture Auto-detection**: Native support for Apple Silicon (`arm64` - M1/M2/M3) and Intel (`amd64`).
- **Service Configuration**: Installs the node as a system-wide `LaunchDaemon` that starts on boot and runs in the background.
- **Gatekeeper Bypass**: Automatically removes the macOS `com.apple.quarantine` attribute from the downloaded executable, preventing Gatekeeper from blocking node execution.
- **Node Configurations**:
  - **Standard Node**: Configured for Mainnet (stable channel) with standard resources.
  - **Developer Node**: Allows choosing between Mainnet (stable) and Testnet (dev), enabling HTTP JSON-RPC APIs (`eth`, `net`, `web3`), and selecting node storage types (Standard/Light, Full, or Archive).
- **Wallet & Mining Setup**: Walks through creating a new mining wallet, password protection, keystore backups, and configuring the miner (`--mine`, `--unlock`, `--miner.etherbase`).
- **Global Status Utility**: Installs `dacnode-status` in `/usr/local/bin` for real-time node monitoring.

---

## Prerequisites

- **Operating System**: macOS 10.15+ (Catalina, Big Sur, Monterey, Ventura, Sonoma, Sequoia, etc.).
- **Permissions**: Administrator access (`sudo`).
- **Dependencies**: Native terminal tools (`curl`).

---

## Shared Data Directory Concept

Unlike Linux/Windows which place configuration files in user home folders, the macOS installer places all configuration in a shared system folder:
`/Users/Shared/DAC/`

The LaunchDaemon runs as **root**, but the data directory is located in the shared path and configured with open permissions. This design prevents file permission issues:
- You can run the node-attach console (`dacnode attach`) without using `sudo`.
- You can read log files, check node status, or access keystores directly from your user account.

---

## Installation Steps

1. **Download and Run the Installer**
   Execute the wrapper script using `curl` in Terminal:
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
   - It writes the password securely to `/Users/Shared/DAC/password.txt`.
   - It creates a new account and outputs the public address (e.g., `0x...`).
   
   ::: important Backup Keystore
   Back up the generated keystore file located in `/Users/Shared/DAC/.dac/keystore/` immediately.
   :::

6. **System Service & Status Monitor**
   - Installs the system-wide background launch daemon.
   - Installs the global `dacnode-status` command.
   - During the binary installation, you will see the following output informing you that Gatekeeper has been bypassed:
     `Bypassing macOS Gatekeeper quarantine warning for unsigned binary...`

---

## Managing an Existing Installation

When you run the installer script on a machine where a DAC Node is already installed, it detects the LaunchDaemon plist and prompts you with a management menu:

### 1) Update Binary
- Stops the `io.dacnetwork.dacnode` service.
- Backs up the current binary to `/usr/local/bin/dacnode.bak`.
- Detects your current network/channel and downloads the latest matching executable.
- Bypasses Gatekeeper on the new binary.
- Updates the status script and restarts the service.

### 2) Reconfigure
- Reruns the interactive configuration wizard.
- Allows you to rename your node, switch network mode (Mainnet <-> Testnet), change node storage types, toggle RPC settings, or adjust mining parameters.
- Restarts the service with the new settings.

### 3) Uninstall
- Safely stops and unloads the LaunchDaemon service.
- Deletes the plist service file, the `dacnode` executable, and the status command.
- Renames the data directory `/Users/Shared/DAC` to a timestamped backup folder (e.g., `/Users/Shared/DAC_backup_20260626120000/`) to prevent data loss.

### 4) Check Node Status
- Invokes the status monitor tool to inspect sync state and peer connections.

---

## Post-Installation File Structure

- **Service Executable**: `/usr/local/bin/dacnode`
- **Data Folder**: `/Users/Shared/DAC/`
- **Environment Settings**: `/Users/Shared/DAC/environment` (defines starting flags like `MINER_FLAGS` and `RPC_FLAGS`)
- **Startup Launcher**: `/Users/Shared/DAC/start.sh`
- **Keystore Directory**: `/Users/Shared/DAC/.dac/keystore/`
- **LaunchDaemon plist**: `/Library/LaunchDaemons/io.dacnetwork.dacnode.plist`
- **Console Log**: `/var/log/dacnode.log`
- **Error Log**: `/var/log/dacnode.err`

---

## Verification & Troubleshooting

::: tip Service Commands
You can start and stop the background service using launchctl:
*   **Start**: `sudo launchctl start io.dacnetwork.dacnode`
*   **Stop**: `sudo launchctl stop io.dacnetwork.dacnode`
:::

- **Monitor Node Logs**:
  ```bash
  tail -f /var/log/dacnode.log
  ```
- **Monitor Error Logs**:
  ```bash
  tail -f /var/log/dacnode.err
  ```
- **Verify Daemon Status**:
  ```bash
  sudo launchctl list | grep dacnode
  ```
- **Check Sync Status**:
  ```bash
  dacnode-status
  ```
  For more details on the status monitor, see the [Status Monitor](./status-monitor.md) guide.
