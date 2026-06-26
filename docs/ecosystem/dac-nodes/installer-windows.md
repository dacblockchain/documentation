# Windows Installation (Automated)

This guide describes how to install, configure, manage, and troubleshoot a DAC Blockchain Node on Windows using the official automated installer script.

::: info
This guide focuses on the automated installation batch script. If you prefer to manually download and run the node binary, please see the [Manual Installation](./manual-installation.md) guide.
:::

---

## Features

The automated installer handles the entire setup process, including:
- **Folder Isolation**: Installs all binaries and data into `%USERPROFILE%\DACNode\`.
- **Node Configurations**:
  - **Standard Node**: Configured for Mainnet (stable channel) with standard resources.
  - **Developer Node**: Allows choosing between Mainnet (stable) and Testnet (dev), enabling HTTP JSON-RPC APIs, and selecting node storage types (Standard/Light, Full, or Archive).
- **Wallet & Mining Setup**: Walks through creating a password file, generating an address, and configuring the node launcher.
- **Local Status Monitor**: Generates a custom helper batch file (`status.bat`) that polls the node IPC Named Pipe (`\\.\pipe\geth.ipc`) every 5 seconds, displaying synced block numbers, hashes, peer counts, and synchronization status.

---

## Prerequisites

- **Operating System**: Windows 10 or Windows 11 (64-bit).
- **Architecture**: `x86_64` / `amd64`.
- **Permissions**: Administrator privileges are recommended (to write to program paths and manage background tasks).
- **Dependencies**: Native command line tools (`curl` for downloading).

---

## Installation Steps

1. **Download and Run the Installer**
   - Download the `install.bat` file from the repository and save it locally as `dac-install.bat` (to avoid naming conflicts).
   
   ::: warning Run as Administrator
   Right-click `dac-install.bat` and select **Run as Administrator**.
   :::

2. **Select Installation Mode**
   - **1) Standard Install** (Mainnet): Installs a node connected to the stable DAC network.
   - **2) Developer / Advanced Install**: Enables advanced API and network customization.

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
   - It writes the password securely to `%USERPROFILE%\DACNode\password.txt`.
   - It generates a wallet address, displays it, and configures the node to start mining automatically.
   
   ::: important Backup Keystore
   Back up the generated keystore file located in `%USERPROFILE%\DACNode\keystore\` immediately.
   :::

6. **Status Monitor Script**
   - The installer prompts to create a helper script `status.bat` (highly recommended).
   - This script runs a console loop connecting to the node attach pipe and monitoring syncing progress in real-time.

---

## Managing an Existing Installation

When you run the installer script on a machine where a DAC Node is already installed, it detects the installation and prompts you with a management menu:

### 1) Update Binary
- Stops any running `dacnode.exe` processes.
- Backs up the current binary to `dacnode.bak`.
- Detects your current network/channel (Mainnet <-> Testnet) and downloads the latest matching executable.
- Updates the status script.

### 2) Reconfigure
- Reruns the interactive configuration wizard.
- Allows you to rename your node, switch network mode, change node storage types, toggle RPC settings, or adjust mining parameters.
- Rewrites the `start.bat` launcher script.

### 3) Uninstall
- Stops any running node processes.
- Moves the entire `%USERPROFILE%\DACNode\` folder to a timestamped backup directory (e.g., `%USERPROFILE%\DACNode_Backup_12345/`) to ensure no keys or configurations are lost.

### 4) Check Node Status
- Automatically runs `status.bat` to monitor your node.

---

## Post-Installation File Structure

All files are stored in `%USERPROFILE%\DACNode\`:
- `dacnode.exe`: Node executable.
- `start.bat`: Node launcher script (contains startup flags like `--miner.etherbase`, `--unlock`, `--password`).
- `status.bat`: Live status monitor script.
- `password.txt`: Keystore decryption password.
- `keystore\`: Folder containing your encrypted wallet private key.
- `gdacnode\chaindata\`: Mainnet blockchain database.
- `testnet\gdacnode\chaindata\`: Testnet blockchain database (if using testnet).

---

## Running the Node in the Background (Auto-start on Boot)

The Windows script does not natively register a system service. To configure the node to run automatically in the background, choose one of these methods:

### Method A: Windows Task Scheduler (Recommended)
1. Open **Task Scheduler**.
2. Click **Create Basic Task**.
3. Set the trigger to **When I log on**.
4. Set the action to **Start a program** and select `%USERPROFILE%\DACNode\start.bat`.
5. Under properties, check **Run whether user is logged on or not** (requires entering admin password) to run it invisibly in the background.

### Method B: NSSM (Non-Sucking Service Manager)
1. Download `nssm.exe` from [nssm.cc](https://nssm.cc/).
2. Run command prompt as Administrator and type:
   ```cmd
   nssm install dac-node "%USERPROFILE%\DACNode\start.bat"
   ```
3. Set the startup type to **Automatic**.
4. Start the service:
   ```cmd
   nssm start dac-node
   ```

---

## Verification & Troubleshooting

1. Open Command Prompt.
2. Navigate to your node directory:
   ```cmd
   cd %USERPROFILE%\DACNode
   ```
3. Run the monitor:
   ```cmd
   status.bat
   ```
   *If the status shows "Error: Unable to connect", check if `dacnode.exe` is running in Task Manager.*
   
   For more details on the status monitor, see the [Status Monitor](./status-monitor.md) guide.
